import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

import Gradient from "../layout/Gradient";

function CategoryBox({ title, count, iconName }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={[styles.count, { color: colors.text }]}>{count}</Text>
      <Gradient>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </Gradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "maven_regular",
    textAlign: "center",
    fontSize: 13,
    marginTop: 5,
  },
  count: {
    fontFamily: "maven_medium",
    letterSpacing: 5,
    fontSize: 40,
    marginBottom: 5,
  },
});

export default CategoryBox;
