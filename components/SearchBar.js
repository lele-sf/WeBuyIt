import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function SearchBar() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchData(API_URL);
  }, []);

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setFullData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(query) {
    setSearch(query);
    const filteredData = fullData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Erro ao carregar os dados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#000" />
      <TextInput
        placeholder="Buscar"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(query) => handleSearch(query)}
        value={search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
