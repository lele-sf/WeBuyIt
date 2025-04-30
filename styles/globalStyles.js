import { StyleSheet } from "react-native";

export const lightColors = {
  primaryText: "#1E1E1E",
  primaryBox: "#FFFFFF",
  primaryBox_on_Focus: "#E0E0E0",
};

export const darkColors = {
  primaryText: "#E5E5E5",
  primaryBox: "#262834",
  primaryBox_on_Focus: "#383945",
};

export const getTheme = (isDarkMode) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return {
    colors,
    styles: StyleSheet.create({
      font: {
        fontFamily: "MavenPro_400Regular",
        color: colors.primaryText,
      },
    }),
  };
};
