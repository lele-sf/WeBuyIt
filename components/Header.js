import { View, StyleSheet, TouchableOpacity } from "react-native";
import Gradient from "./Gradient.js";
import Ionicons from "@expo/vector-icons/Ionicons";

function Header() {
  return (
    <View style={styles.header}>
      <Gradient style={styles.logotext}>WeBuyIt</Gradient>
      <TouchableOpacity onPress={() => console.log("menu pressionado")}>
        <Gradient>
          <Ionicons name="ellipsis-horizontal-circle" size={40} />
        </Gradient>
      </TouchableOpacity>
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
    fontFamily: "MavenPro_600SemiBold",
    fontSize: 32,
    letterSpacing: 6,
  },
});

export default Header;
