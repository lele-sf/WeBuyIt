import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { LightColors, DarkColors } from './colors';

// "mistura" as cores do nosso tema claro/escuro com o tema padrão do react-navigation
export const LightThemeCustom = {
  ...DefaultTheme, // tema claro padrão do react-navigation
  dark: false, // indica que o tema é claro
  colors: {
    ...DefaultTheme.colors, // cores padrão do react-navigation
    ...LightColors, // nossas cores personalizadas
  },
};

export const DarkThemeCustom = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    ...DarkColors,
  },
};
