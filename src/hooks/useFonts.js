import { useFonts, MavenPro_600SemiBold, MavenPro_400Regular, MavenPro_500Medium } from "@expo-google-fonts/maven-pro";

const useCustomFonts = () => {
  let [fontsLoaded] = useFonts({
    maven_regular: MavenPro_400Regular,
    maven_medium: MavenPro_500Medium,
    maven_semibold: MavenPro_600SemiBold,
  });

  return fontsLoaded;
};

export default useCustomFonts;