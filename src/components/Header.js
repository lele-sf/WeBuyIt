import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import Gradient from "./Gradient.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";

function Header() {
  const { colors } = useTheme();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
      setSearchQuery("");
    } else {
      setIsSearchActive(true);
    }
  };

  return (
    <View style={styles.header}>
      {!isSearchActive ? (
        <>
          <Gradient style={styles.logotext}>WeBuyIt</Gradient>
          <TouchableOpacity onPress={toggleSearch}>
            <Gradient>
              <Ionicons name="search" size={30} />
            </Gradient>
          </TouchableOpacity>
        </>
      ) : (
        <View style={[styles.searchContainer]}>
          <TextInput
            //necessario colocar a query de search aqui
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Pesquisar"
            placeholderTextColor="#aaa"
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
          />
          <TouchableOpacity onPress={toggleSearch}>
            <Gradient>
              <Ionicons name="close" size={30} />
            </Gradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logotext: {
    fontFamily: "maven_semibold",
    fontSize: 32,
    letterSpacing: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "maven_regular",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default Header;
