import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const getLists = async () => {
  try {
    const listsCollection = collection(db, "Lists");
    const querySnapshot = await getDocs(listsCollection);
    const lists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return lists;
  } catch (error) {
    console.error("Erro ao buscar listas:", error);
    return [];
  }
};
