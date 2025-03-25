import { View, StyleSheet, TouchableOpacity } from "react-native";
import GradientText from "./GradientText.js";
import Ionicons from "@expo/vector-icons/Ionicons";

function Header () {
  return (
    <View style={styles.header}>
      <GradientText style={styles.logotext}>WeBuyIt</GradientText>
      <TouchableOpacity onPress={() => console.log("menu pressionado")}>
      <GradientText><Ionicons name="ellipsis-horizontal-circle" size={40}/></GradientText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },  
  logotext: {
    fontFamily: "MavenPro_600SemiBold",
    fontSize: 32,
    letterSpacing: 6,
  },
});

export default Header;