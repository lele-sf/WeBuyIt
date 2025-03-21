import { useFonts, MavenPro_600SemiBold } from "@expo-google-fonts/maven-pro";

const useCustomFonts = () => {
  let [fontsLoaded] = useFonts({
    MavenPro_600SemiBold,
  });

  return fontsLoaded;
};

export default useCustomFonts;