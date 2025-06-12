import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchItems = async (listId) => {
  try {
    const itemsCollection = collection(db, `Lists/${listId}/Items`);
    const querySnapshot = await getDocs(itemsCollection);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};