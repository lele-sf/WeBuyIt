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
import ListContainer from "../components/ListContainer.js"
import { getLists } from "../database/getLists.js";;

const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
  return "Data não disponível";
};

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
      <ListContainer lists={lists} />
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
