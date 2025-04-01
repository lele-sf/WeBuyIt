import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Gradient from "./Gradient";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function ListItem({ title, iconName}) {
    return (
        <TouchableOpacity style={styles.container}>
            <Gradient>
                <Ionicons name={iconName} size={24}/>
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

export default ListItem;