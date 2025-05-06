import React from "react";
import { View, StyleSheet } from "react-native";
import CategoryBox from "../components/CategoryBox";

const categories = [
  { title: "Eventos chegando", count: '04'},
  { title: "Aguardando confirmação", count: '02'},
  { title: "Novas notificações", count: '03'},
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
    marginTop: 15,
  },
});

export default CategoriesSection;
