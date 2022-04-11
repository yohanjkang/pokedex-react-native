import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";

import Home from "./screens/Home";
import Details from "./screens/Details";
import { PokemonContext } from "./components/PokemonContext";

const Stack = createStackNavigator();

export default function App() {
  const [pokemonList, setPokemonList] = useState(null);

  const [loaded] = useFonts({
    NunitoExtraBold: require("./assets/fonts/Nunito-ExtraBold.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
    NunitoSemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    NunitoMedium: require("./assets/fonts/Nunito-Medium.ttf"),
    NunitoRegular: require("./assets/fonts/Nunito-Regular.ttf"),
    NunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <PokemonContext.Provider value={{ pokemonList, setPokemonList }}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </PokemonContext.Provider>
    </NavigationContainer>
  );
}
