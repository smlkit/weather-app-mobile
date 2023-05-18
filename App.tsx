import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import { ButtomNav } from "./components/BottomNav";
import { NativeBaseProvider } from "native-base";
import { customTheme } from "./theme";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <SafeAreaView style={styles.safe}>
          <ButtomNav />
        </SafeAreaView>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});
