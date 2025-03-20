import { View, StyleSheet, TouchableOpacity } from "react-native";
import GradientText from "./GradientText.js";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  return (
    <View style={styles.header}>
      <GradientText style={styles.logotext}>WeBuyIt</GradientText>
      <TouchableOpacity onPress={() => console.log("menu pressionado")}>
        <Ionicons name="ellipsis-horizontal-circle" size={40} color="#5DCFAE" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logotext: {
    fontFamily: "MavenPro_600SemiBold",
    fontSize: 32,
    letterSpacing: 6,
  },
});

export default Header;
