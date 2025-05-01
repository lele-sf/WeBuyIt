import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";

import Gradient from "./Gradient";

function CategoryBox({ title, count, iconName }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={[styles.count, { color: colors.text }]}>{count}</Text>
      <Gradient>
        <Ionicons name={iconName} size={24} />
      </Gradient>
      <Gradient>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </Gradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 110,
    height: 110,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "maven_regular",
    fontSize: 16,
    marginTop: 5,
  },
  count: {
    fontFamily: "maven_medium",
    fontSize: 30,
    marginBottom: 5,
  },
});

export default CategoryBox;
