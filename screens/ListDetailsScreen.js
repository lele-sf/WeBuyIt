import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import ListDetails from "../components/ListDetails";
import Gradient from "../components/Gradient";
import { getItems } from "../database/getItems";

function ListScreen() {
  const route = useRoute();
  const { title } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems(title);
      setData(items);
    };
    fetchItems();
  }, [title]);

  return (
    <SafeAreaView style={styles.container}>
      <Gradient>
        <Text style={styles.text}>{title}</Text>
      </Gradient>
      <ListDetails data={data} listId={title}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1C25",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "MavenPro_600SemiBold",
    fontSize: 30,
  },
});

export default ListScreen;
