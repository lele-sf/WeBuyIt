import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const updateItem = async (listId, itemId, updatedData) => {
  try {
    const itemDocRef = doc(db, `Lists/${listId}/Items`, itemId);
    await updateDoc(itemDocRef, updatedData);
    console.log(`Item ${itemId} atualizado com sucesso no Firestore.`);
} catch (error) {
    console.error(`Erro atualizando item ${itemId}:`, error);
  }
};