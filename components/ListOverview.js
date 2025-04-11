import Gradient from "./Gradient";
import ListPreviewItem from "./ListPreviewItem";
import { StyleSheet, View, Text } from "react-native";

const items = [
  { title: "Mercado", iconName: "cart-outline" },
  { title: "Aniversário", iconName: "gift-outline" },
  { title: "Encontro", iconName: "wine-outline" },
];

function ListOverview({ lists = [] }) {
  return (
    <View>
      <Gradient style={{ margin: 20 }}>
        <Text style={styles.title}>Minhas listas</Text>
      </Gradient>
      <View style={styles.container}>
        {lists.map((item, index) => (
          <ListPreviewItem key={index} title={item.title} iconName={item.iconName} />
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
