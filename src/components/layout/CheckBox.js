import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Gradient from "./Gradient";

function Checkbox({ checked, onToggle }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: checked ? colors.primary : "#aaa",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {checked && (
        <Gradient>
          <Ionicons name="checkmark" size={16} />
        </Gradient>
      )}
    </TouchableOpacity>
  );
}

export default Checkbox;
