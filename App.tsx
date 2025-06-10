import RootStack from "./navigation/RootStack";
import {NavigationContainer} from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function App() {
  return (
      <NavigationContainer>
        <RootStack/>
        <Toast/>
      </NavigationContainer>
  );
}
