import {
  collection,
  getDocs,
  query,
  limit,
  orderBy
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchEvents = async () => {
  try {
    const eventsSnap = await getDocs(collection(db, "events"));

    const events = await Promise.all(
      eventsSnap.docs.map(async (doc) => {
        const data = doc.data();

        const attendeesQuery = query(
          collection(db, "events", doc.id, "attendees"),
          orderBy("joinedAt", "asc"),
          limit(2)
        );
        const attendeesSnap = await getDocs(attendeesQuery);

        const attendees = attendeesSnap.docs.map((a) => ({
          imageUrl: a.data().imageUrl,
        }));

        return {
          id: doc.id,
          ...data,
          attendees,
        };
      })
    );

    return events;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
};
