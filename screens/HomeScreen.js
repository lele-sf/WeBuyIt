import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar.js";
// import { getLists } from "../database/FirebaseTestQuery.js";
import FloatingButton from "../components/FloatingButton.js";
import Box from "../components/CategoryBox.js";
import Feather from "@expo/vector-icons/Feather";
import Gradient from "../components/Gradient.js";
import { MavenPro_600SemiBold } from "@expo-google-fonts/maven-pro";
import CategoriesSection from "../components/CategoriesSection.js";
import ListOverview from "../components/ListOverview.js";

const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
  return "Data não disponível";
};

function HomeScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLists();
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <CategoriesSection />
      <ListOverview />
      <FloatingButton/>
      {/* <View>
        <Text>Lista de Itens:</Text>
        {items.length > 0 ? (
          items.map((item) => (
            <View key={item.id}>
              <Text style={styles.whitetext}>🛒 Nome: {item.ITEM_NAME}</Text>
              <Text style={styles.whitetext}>✅ Checado: {item.ITEM_CHECKED ? "Sim" : "Não"}</Text>
              <Text style={styles.whitetext}>⏰ Data: {formatTimestamp(item.ITEM_TIME_MODIFIED)}</Text>
              <Text style={styles.whitetext}>📦 Unidade: {item.ITEM_UNITY}</Text>
              <Text>---------------------------</Text>
            </View>
          ))
        ))}
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1C25",
    flex: 1,
  },
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  whitetext: {
    color: "#fff",
  },
});

export default HomeScreen;
