import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

import Main from "./src/Main";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          {/* <StatusBar style="auto" /> */}
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
