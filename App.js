import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import Home from "./screens/Home";
import Moves from "./screens/Moves";
import Details from "./screens/Details";
import { COLORS } from "./constants/colors";
import { PokemonContext } from "./components/PokemonContext";
import pokeballIcon from "./assets/misc_icons/pokeball.png";
import pokeballActiveIcon from "./assets/misc_icons/pokeball_active.png";
import pokeballIconLg from "./assets/misc_icons/pokeball-lg.png";
import abilityIcon from "./assets/misc_icons/bolt-solid.png";
import abliityIconActive from "./assets/misc_icons/bolt-solid_active.png";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: COLORS.backgroundDefault,
            marginBottom: 20,
          }}
        >
          <Image source={pokeballIconLg} style={{ width: 60, height: 60 }} />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

function Root() {
  return (
    <Drawer.Navigator
      drawerType="front"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          color: COLORS.font,
          fontFamily: "NunitoExtraBold",
          fontSize: 16,
        },
      }}
      initialRouteName="Pokédex"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Pokédex"
        component={Home}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? pokeballActiveIcon : pokeballIcon}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Moves"
        component={Moves}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? abliityIconActive : abilityIcon}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

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
          initialRouteName="Root"
        >
          <Stack.Screen name="Root" component={Root} />
          {/* <Stack.Screen name="Home" component={Home} /> */}
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </PokemonContext.Provider>
    </NavigationContainer>
  );
}
