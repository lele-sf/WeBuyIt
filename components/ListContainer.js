import Gradient from "./Gradient";
import ListItem from "./ListItem";
import { StyleSheet, View, Text } from "react-native";

function ListContainer({ lists = [] }) {
  return (
    <View>
      <Gradient style={{ margin: 20 }}>
        <Text style={styles.title}>Minhas listas</Text>
      </Gradient>
      <View style={styles.container}>
        {lists.map((item, index) => (
          <ListItem
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
    backgroundColor: "#262834",
    borderRadius: 15,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "MavenPro_500Medium",
    fontSize: 24,
  },
});

export default ListContainer;
