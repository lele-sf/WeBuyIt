import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

import Gradient from "./Gradient";
import ListPreviewItem from "./ListPreviewItem";

function ListOverview({ lists = [] }) {
  const { colors } = useTheme();
  return (
    <View>
      <Gradient style={{ margin: 20 }}>
        <Text style={styles.title}>Minhas listas</Text>
      </Gradient>
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        {lists.map((item, index) => (
          <ListPreviewItem
            key={index}
            title={item.id}
            iconName="list-outline"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "maven_medium",
    fontSize: 24,
  },
});

export default ListOverview;
