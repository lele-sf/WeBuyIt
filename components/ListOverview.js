import Gradient from "./Gradient";
import ListPreviewItem from "./ListPreviewItem";
import { StyleSheet, View, Text } from "react-native";

function ListOverview({ lists = [] }) {
  return (
    <View>
      <Gradient style={{ margin: 20 }}>
        <Text style={styles.title}>Minhas listas</Text>
      </Gradient>
      <View style={styles.container}>
        {lists.map((item, index) => (
          <ListPreviewItem key={index} title={item.id} iconName={item.icon} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262834",
    borderRadius: 15,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "MavenPro_500Medium",
    fontSize: 24,
  },
});

export default ListOverview;
