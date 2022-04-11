import { StyleSheet, View, Text, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { TabView, TabBar } from "react-native-tab-view";

import {
  FirstRoutePreload,
  FirstRoute,
} from "../components/TabRoutes/FirstRoute";
import SecondRoute from "../components/TabRoutes/SecondRoute";
import ThirdRoute from "../components/TabRoutes/ThirdRoute";
import ListItem from "../components/ListItem";
import { ShadeColor } from "../components/Utils";
import { COLORS } from "../constants/colors";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width,
};

// DETAILS SCREEN
const Details = ({ route, navigation }) => {
  const [inputData, setInputData] = useState(route.params.data);
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonAdditionalData, setPokemonAdditionalData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pokemon type info
  const [primaryObj, secondaryObj] =
    inputData.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes;
  const [primaryType, secondaryType] = [
    primaryObj.pokemon_v2_type.name,
    secondaryObj?.pokemon_v2_type.name,
  ];

  // Tab navigation
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Stats" },
    { key: "second", title: "Evolution Chain" },
    { key: "third", title: "Effectiveness" },
  ]);

  //////////////////////////////
  // Functions
  useEffect(() => {
    const fetchPokemonData = async () => {
      Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputData.name}`).then(
          (data) => data.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${inputData.id}`).then(
          (data) => data.json()
        ),
        wait(700),
      ])
        .then(([data, additionalData]) => {
          setPokemonData(data);
          setPokemonAdditionalData(additionalData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPokemonData();
  }, []);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Tab view before data is loaded
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <FirstRoutePreload />;
      case "second":
        return <></>;
      case "third":
        return <></>;
      default:
        return null;
    }
  };

  // Tab view after data is loaded
  const renderSceneLoaded = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <FirstRoute
            pokemonData={pokemonData}
            pokemonAdditionalData={pokemonAdditionalData}
            inputData={inputData}
          />
        );
      case "second":
        return (
          <SecondRoute
            pokemonData={pokemonData}
            pokemonAdditionalData={pokemonAdditionalData}
            inputData={inputData}
          />
        );
      case "third":
        return <ThirdRoute inputData={inputData} />;
      default:
        return null;
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "black" }}
      contentContainerStyle={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS[primaryType].light,
          // backgroundColor: "#b8d9bd",
        }}
      >
        <ListItem data={inputData} type={"Details"} />
        {loading ? (
          // Pre-load tab view
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            swipeEnabled={false}
            initialLayout={initialLayout}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route }) => (
                  <Text style={styles.tabBarText}>{route.title}</Text>
                )}
                style={{
                  backgroundColor: COLORS[primaryType].default,
                  color: COLORS.font,
                }}
                indicatorStyle={{
                  backgroundColor: ShadeColor(COLORS[primaryType].default, -40),
                  height: 5,
                }}
              />
            )}
          />
        ) : (
          // Post-load tab view
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderSceneLoaded}
            onIndexChange={setIndex}
            swipeEnabled={false}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route }) => (
                  <Text style={styles.tabBarText}>{route.title}</Text>
                )}
                style={{
                  backgroundColor: COLORS[primaryType].default,
                  color: COLORS.font,
                }}
                indicatorStyle={{
                  backgroundColor: ShadeColor(COLORS[primaryType].default, -40),
                  height: 5,
                }}
              />
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarText: {
    color: COLORS.font,
    fontFamily: "NunitoExtraBold",
    textAlign: "center",
  },
});

export default Details;
