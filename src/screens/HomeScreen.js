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
import { useTheme } from "@react-navigation/native";

function HomeScreen() {
  const [lists, setLists] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLists();
      setLists(data);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="auto" />
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <CategoriesSection />
      <ListOverview lists={lists} />
      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
