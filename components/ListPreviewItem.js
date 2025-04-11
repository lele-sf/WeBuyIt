import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Gradient from "./Gradient";
import { useNavigation } from "@react-navigation/native";

function ListPreviewItem({ title, iconName }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("List", { title })}
    >
      <Gradient>
        <Ionicons name={iconName} size={24} />
      </Gradient>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontFamily: "MavenPro_400Regular",
    fontSize: 16,
    marginLeft: 10,
    color: "#E5E5E5",
  },
});

export default ListPreviewItem;
