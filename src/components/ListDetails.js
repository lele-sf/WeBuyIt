import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

import { updateItem } from "../database/updateItem";
import Gradient from "./Gradient";

function ListDetails({ data, listId, flatListMode = true }) {
  const { colors } = useTheme();
  
  const [checkedItems, setCheckedItems] = useState(
    data.reduce((acc, item) => {
      acc[item.id] = item.ITEM_CHECKED || false;
      return acc;
    }, {})
  );
  
  const [quantities, setQuantities] = useState(
    data.reduce((acc, item) => {
      acc[item.id] = item.ITEM_QUANTITY || 1;
      return acc;
    }, {})
  );

  const toggleCheckbox = async (id) => {
    const newValue = !checkedItems[id];

    setCheckedItems((prev) => ({
      ...prev,
      [id]: newValue,
    }));

    await updateItem(listId, id, { ITEM_CHECKED: newValue });
  };
  
  const updateQuantity = async (id, change) => {
    const newQuantity = Math.max(1, (quantities[id] || 1) + change);
    
    setQuantities(prev => ({
      ...prev,
      [id]: newQuantity
    }));
    
    await updateItem(listId, id, { ITEM_QUANTITY: newQuantity });
  };

  const renderItem = ({ item }) => {
    const isChecked = checkedItems[item.id];
    const quantity = quantities[item.id] || 1;
    
    return (
      <View 
        style={[
          styles.item, 
          isChecked && styles.checkedItem
        ]} 
        key={item.id}
      >
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={() => toggleCheckbox(item.id)}
          color={isChecked ? colors.primary : undefined}
        />
        
        <View style={styles.itemContent}>
          <Text 
            style={[
              styles.itemText, 
              { color: colors.text },
              isChecked && styles.checkedText
            ]}
          >
            {item.ITEM_NAME}
          </Text>
        </View>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => updateQuantity(item.id, -1)}
            disabled={quantity <= 1}
            style={styles.quantityButton}
          >
            <Gradient>
              <Ionicons 
                name="remove-circle" 
                size={24} 
                style={{opacity: quantity <= 1 ? 0.5 : 1}} 
              />
            </Gradient>
          </TouchableOpacity>
          
          <Text style={[styles.quantityText, { color: colors.text }]}>
            {quantity}
          </Text>
          
          <TouchableOpacity 
            onPress={() => updateQuantity(item.id, 1)}
            style={styles.quantityButton}
          >
            <Gradient>
              <Ionicons name="add-circle" size={24} />
            </Gradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!flatListMode) {
    return (
      <View style={styles.listContainer}>
        {data.map((item) => renderItem({ item }))}
        {data.length === 0 && (
          <Text style={[styles.emptyText, { color: colors.text + "99" }]}>
            Nenhum item na lista ainda
          </Text>
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <Text style={[styles.emptyText, { color: colors.text + "99" }]}>
          Nenhum item na lista ainda
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33333320",
  },
  checkedItem: {
    backgroundColor: "#33333310",
  },
  checkbox: {
    marginHorizontal: 8,
    borderRadius: 20,
    width: 24,
    height: 24,
  },
  itemContent: {
    flex: 1,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
    fontFamily: "maven_medium",
  },
  checkedText: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    width: 30,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "maven_semibold",
  },
  emptyText: {
    textAlign: "center",
    fontFamily: "maven_regular",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ListDetails;