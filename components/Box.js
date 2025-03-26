import { View, StyleSheet } from "react-native";

const Box = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    // flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
  },
});


export default Box;