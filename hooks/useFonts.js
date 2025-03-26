import { useFonts, MavenPro_600SemiBold, MavenPro_400Regular, MavenPro_500Medium } from "@expo-google-fonts/maven-pro";

const useCustomFonts = () => {
  let [fontsLoaded] = useFonts({
    MavenPro_600SemiBold,
    MavenPro_400Regular,
    MavenPro_500Medium
  });

  return fontsLoaded;
};

export default useCustomFonts;