import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function CategoryBox({ title, count, iconName }) {
  return (
    <TouchableOpacity style={styles.box}>
      <Text style={styles.count}>{count}</Text>
      <Ionicons name={iconName} size={24} color="#fff" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 110,
    height: 110,
    backgroundColor: "rgba(192, 189, 189, 0.2)",
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
    fontFamily: "MavenPro_600SemiBold",
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
});

export default CategoryBox;
