import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./HomeScreen";
import { SettingsScreen } from "./SettingsScreen";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useColorMode, useTheme } from "native-base";

const Tab = createBottomTabNavigator();

export const ButtomNav = () => {
  const colorMode = useColorMode().colorMode;

  const dark = {
    dark: true,
    colors: {
      primary: "red",
      background: "red",
      card: "#1f2937",
      text: "rgb(28, 28, 30)",
      border: "#111827",
      notification: "red",
    },
  };

  const light = {
    dark: false,
    colors: {
      primary: "red",
      background: "red",
      card: "#f9fafb",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };

  return (
    <NavigationContainer theme={colorMode === "dark" ? dark : light}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Settings") {
              iconName = focused ? "setting" : "setting";
            }

            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#9ca3af",
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
