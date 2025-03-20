import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from "@react-native-masked-view/masked-view"

const GradientText = (props) => {
    return (
      <MaskedView maskElement={<Text {...props}/>}>
        <LinearGradient
          colors={["#5DCFAE", "#00ADAB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text {...props} style={[props.style, { opacity: 0 }]}/>
        </LinearGradient>
      </MaskedView>
    );
  };

export default GradientText;