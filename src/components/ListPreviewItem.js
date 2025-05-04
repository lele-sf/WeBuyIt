import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useTheme } from "@react-navigation/native";

import Gradient from "./Gradient";

function ListPreviewItem({ title, iconName }) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate("List", { title })}
    >
      <Gradient>
        <Ionicons name={iconName} size={24} />
      </Gradient>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
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
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ListPreviewItem;
