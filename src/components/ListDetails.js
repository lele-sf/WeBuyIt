import { useState } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

import { updateItem } from "../database/updateItem";

function ListDetails({ data, listId }) {
  const { colors } = useTheme();
  const [checkedItems, setCheckedItems] = useState(
    data.reduce((acc, item) => {
      acc[item.id] = item.ITEM_CHECKED || false;
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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Checkbox
        style={styles.checkbox}
        value={checkedItems[item.id]}
        onValueChange={() => toggleCheckbox(item.id)}
        color={checkedItems[item.id] ? "#5DCFAE" : undefined}
      />
      <Text style={[styles.itemText, { color: colors.text }]}>
        {item.ITEM_NAME} - {item.ITEM_UNITY}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    marginHorizontal: 8,
    borderRadius: 100,
    width: 24,
    height: 24,
  },
  itemText: {
    fontSize: 20,
    fontFamily: "maven_regular",
  },
});

export default ListDetails;
