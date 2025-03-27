import React from "react";
import { View, StyleSheet } from "react-native";
import CategoryBox from "../components/CategoryBox";

const categories = [
  { title: "Arquivados", count: 5, iconName: "archive-outline" },
  { title: "Favoritos", count: 8, iconName: "heart-outline" },
  { title: "Outros", count: 3, iconName: "list-outline" },
];

function CategoriesSection() {
  return (
    <View style={styles.container}>
      {categories.map((item, index) => (
        <CategoryBox
          key={index}
          title={item.title}
          count={item.count}
          iconName={item.iconName}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
});

export default CategoriesSection;
