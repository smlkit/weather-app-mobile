import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import { ButtomNav } from "./components/BottomNav";
import { NativeBaseProvider, useColorMode } from "native-base";
import { customTheme } from "./theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NativeBaseProvider theme={customTheme}>
          <SafeAreaView style={styles.safe}>
            <StatusBar backgroundColor="#3b82f6"></StatusBar>
            <ButtomNav />
          </SafeAreaView>
        </NativeBaseProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "blue",
  },
});
