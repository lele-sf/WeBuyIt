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
import FloatingButton from "../components/FloatingButton.js";
import CategoriesSection from "../components/CategoriesSection.js";
import ListOverview from "../components/ListOverview.js";
import { getLists } from "../database/getLists.js";

function HomeScreen() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLists();
      setLists(data);
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
      <ListOverview lists={lists}/>
      <FloatingButton/>
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
