import { useColorMode, Button, View, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

export const SettingsScreen = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const btnText = colorMode === "dark" ? "Light mode" : "Dark mode";
  const iconName = colorMode === "dark" ? "sunny" : "moon";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button leftIcon={<Ionicons name={iconName} as="Ionicons" color="#f9fafb" />} onPress={toggleColorMode}>
        {btnText}
      </Button>
    </View>
  );
};
