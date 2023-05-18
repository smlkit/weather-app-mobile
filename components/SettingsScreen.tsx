import { View, Text } from "react-native";
import { IconButton, useColorMode } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

export const SettingsScreen = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconName = colorMode === "dark" ? "sunny" : "moon";
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <IconButton
        variant="solid"
        size="lg"
        borderRadius="full"
        icon={<Ionicons name={iconName} />}
        onPress={toggleColorMode}
      ></IconButton>
    </View>
  );
};
