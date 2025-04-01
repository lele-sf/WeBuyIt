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
import Box from "../components/CategoryBox.js";
import Feather from "@expo/vector-icons/Feather";
import Gradient from "../components/Gradient.js";
import { MavenPro_600SemiBold } from "@expo-google-fonts/maven-pro";
import CategoriesSection from "../components/CategoriesSection.js";
import ListContainer from "../components/ListContainer.js";

const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
  return "Data não disponível";
};

function HomeScreen({ navigation }) {
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
      <SearchBar />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Detail")}
      >
        <Text style={styles.buttonText}>Ir para Detalhes</Text>
      </TouchableOpacity>
      <CategoriesSection />
      <ListContainer />
      {/* <Box>
        <Text style={{fontFamily: "MavenPro_600SemiBold", fontSize: 50, color: '#fff'}}>03</Text>
        <Gradient>
          <Feather name="archive" size={24} />
          <Text>Arquivadas</Text>
        </Gradient>
        {/* <Ionicons name="archive" size={25}/> 
        </Box> */}
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
        ) : (
          <Text>Nenhum item encontrado.</Text>
        )}
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1C25",
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  whitetext: {
    color: "#fff",
  },
});

export default HomeScreen;
