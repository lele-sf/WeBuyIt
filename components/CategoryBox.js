import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Gradient from "./Gradient";

function CategoryBox({ title, count, iconName }) {
  return (
    <TouchableOpacity style={styles.box}>
      <Text style={styles.count}>{count}</Text>
      <Gradient>
        <Ionicons name={iconName} size={24}/>
      </Gradient>
      <Gradient>
        <Text style={styles.title}>{title}</Text>
      </Gradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 110,
    height: 110,
    backgroundColor: "#262834",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "MavenPro_400Regular",
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  count: {
    fontFamily: "MavenPro_500Medium",
    color: "#E5E5E5",
    fontSize: 30,
    marginBottom: 5,
  },
});

export default CategoryBox;
