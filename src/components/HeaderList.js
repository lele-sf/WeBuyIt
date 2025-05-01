import { TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Gradient from "./Gradient";

function HeaderList() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log("Share button pressed")}>
        <Gradient>
          <Entypo name="share" size={30} color="#fff" />
        </Gradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Menu button pressed")}>
        <Gradient>
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={40}
            color="#fff"
          />
        </Gradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default HeaderList;
