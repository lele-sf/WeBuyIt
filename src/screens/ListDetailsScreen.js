import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useRoute, useTheme } from "@react-navigation/native";

import ListDetails from "../components/ListDetails";
import Gradient from "../components/Gradient";
import { getItems } from "../database/getItems";

function ListScreen() {
  const route = useRoute();
  const { colors } = useTheme();
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Gradient>
        <Text style={styles.text}>{title}</Text>
      </Gradient>
      <ListDetails data={data} listId={title} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "maven_semibold",
    fontSize: 30,
  },
});

export default ListScreen;
