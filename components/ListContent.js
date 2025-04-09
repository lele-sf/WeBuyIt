import { useState } from "react";
import Checkbox from "expo-checkbox";
import { FlatList, Text, StyleSheet, View } from "react-native";

function ListContent({ data }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Checkbox
        style={styles.checkbox}
        value={checkedItems[item.id] || false}
        onValueChange={() => toggleCheckbox(item.id)}
        color={checkedItems[item.id] ? "#5DCFAE" : undefined} 
      />
      <Text style={styles.itemText}>{item.title}</Text>
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
      marginHorizontal: 20,
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    marginHorizontal: 8,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ListContent;