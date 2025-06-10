import { doc, collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Get a list associated with an event
export const fetchEventList = async (eventId) => {
  try {
    // First check if event has an associated list
    const eventListQuery = query(
      collection(db, "eventLists"), 
      where("eventId", "==", eventId)
    );
    const snapshot = await getDocs(eventListQuery);
    
    if (snapshot.empty) {
      // Create a new list for this event
      const newList = await createEventList(eventId);
      return { listId: newList.id, items: [] };
    }
    
    // Get the list ID
    const listData = snapshot.docs[0].data();
    const listId = listData.listId;
    
    // Get items from this list
    const items = await fetchItems(listId);
    return { listId, items };
  } catch (error) {
    console.error("Error getting event list:", error);
    return { listId: null, items: [] };
  }
};

// Create a new list for an event
export const createEventList = async (eventId) => {
  try {
    // Create the relationship between event and list
    const listRef = await addDoc(collection(db, "eventLists"), {
      eventId,
      listId: `event_${eventId}_list`,
      createdAt: serverTimestamp()
    });
    
    return { id: `event_${eventId}_list` };
  } catch (error) {
    console.error("Error creating event list:", error);
    throw error;
  }
};

// adiciona um item a lista de um evento
export const addItemToEventList = async (listId, itemName, itemQuantity = "unidade") => {
  try {
    const itemsCollection = collection(db, `Lists/${listId}/Items`);
    const newItem = {
      ITEM_NAME: itemName,
      ITEM_QUANTITY: itemQuantity,
      ITEM_CHECKED: false,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(itemsCollection, newItem);
    return {
      id: docRef.id,
      ...newItem
    };
  } catch (error) {
    console.error("Error adding item to list:", error);
    throw error;
  }
};

import { fetchItems } from "./fetchItems";