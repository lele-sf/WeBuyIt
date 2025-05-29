import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createEvent = async ({ title, date, imageUrl, host, location }) => {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      title,
      date,
      imageUrl,
      host,
      location,
      attendeesCount: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const hostAttendee = {
      id: host.id,
      name: host.name,
      imageUrl: host.imageUrl,
      isHost: true,
      joinedAt: serverTimestamp()
    };
    
    await setDoc(
      doc(db, "events", docRef.id, "attendees", host.id),
      hostAttendee
    );

    return docRef.id;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};