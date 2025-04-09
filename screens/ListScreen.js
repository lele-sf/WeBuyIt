import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import ListContent from "../components/ListContent";

function ListScreen() {
  const [data, setData] = useState([
    { id: 1, title: "Arroz" },
    { id: 2, title: "Peixe" },
    { id: 3, title: "Alface" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ListContent data={data} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1C25",
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default ListScreen;