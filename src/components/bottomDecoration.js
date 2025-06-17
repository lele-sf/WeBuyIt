import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Polygon } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function BottomDecoration() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Svg height={150} width={width} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="gradLeft" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#5DCFAE" stopOpacity="0.5" />
            <Stop offset="1" stopColor="#00ADAB" stopOpacity="0.5" />
          </LinearGradient>
          <LinearGradient id="gradRight" x1="1" y1="0" x2="0" y2="0">
            <Stop offset="0" stopColor="#00ADAB" stopOpacity="0.7" />
            <Stop offset="1" stopColor="#5DCFAE" stopOpacity="0.7" />
          </LinearGradient>
        </Defs>

        {/* Triângulo da esquerda */}
        <Polygon
          points={`0,150 ${width / 2},0 0,0`}
          fill="url(#gradLeft)"
        />

        {/* Triângulo da direita - sobreposto */}
        <Polygon
          points={`${width},150 ${width / 2},0 ${width},0`}
          fill="url(#gradRight)"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: 150,
    overflow: "visible",
  },
});
