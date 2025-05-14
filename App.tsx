import RootStack from "./navigation/RootStack";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
        <RootStack/>
      </NavigationContainer>
  );
}
