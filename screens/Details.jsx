import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { TabView, TabBar } from "react-native-tab-view";

import DetailsDesc from "../components/DetailsDesc";
import DetailsEvol from "../components/DetailsEvol";
import DetailsAtt from "../components/DetailsAtt";
import ListItem from "../components/ListItem";
import { ShadeColor } from "../components/Utils";
import { COLORS } from "../constants/colors";

// Pre-loaded descriptions tab
const FirstRoute = () => (
  <>
    <Text style={styles.contentTitle}>Description</Text>
    <View style={{ ...styles.content, alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
    <Text style={styles.contentTitle}>Base Stats</Text>
    <View style={{ ...styles.content, alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  </>
);

// Loaded descriptions tab
const FirstRouteLoaded = ({
  pokemonData,
  pokemonAdditionalData,
  inputData,
}) => {
  // Pokemon descriptions
  return (
    <DetailsDesc
      data={{
        pokemonData,
        pokemonAdditionalData,
        inputData,
      }}
    />
  );
};

// Evolution chain tab
const SecondRoute = ({ pokemonData, pokemonAdditionalData, inputData }) => {
  return (
    <DetailsEvol
      data={{
        pokemonData,
        pokemonAdditionalData,
        inputData,
      }}
    />
  );
};

// Type effectiveness tab
const ThirdRoute = ({ pokemonData, pokemonAdditionalData, inputData }) => {
  return (
    <DetailsAtt
      data={{
        pokemonData,
        pokemonAdditionalData,
        inputData,
      }}
    />
  );
};

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

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <FirstRoute />;
      case "second":
        return <></>;
      case "third":
        return <></>;
      default:
        return null;
    }
  };

  const renderSceneLoaded = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <FirstRouteLoaded
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
          backgroundColor: ShadeColor(COLORS[primaryType].default, 10),
        }}
      >
        <ListItem data={inputData} type={"Details"} />
        {loading ? (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            swipeEnabled={false}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route, focused }) => (
                  <Text
                    style={{
                      color: COLORS.font,
                      fontFamily: "NunitoExtraBold",
                      textAlign: "center",
                    }}
                  >
                    {route.title}
                  </Text>
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
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderSceneLoaded}
            onIndexChange={setIndex}
            swipeEnabled={false}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route, focused }) => (
                  <Text
                    style={{
                      color: COLORS.font,
                      fontFamily: "NunitoExtraBold",
                      textAlign: "center",
                    }}
                  >
                    {route.title}
                  </Text>
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
  content: {
    backgroundColor: COLORS.backgroundDefault,
    margin: 10,
    padding: 12,
    borderRadius: 12,
  },
  contentTitle: {
    fontFamily: "NunitoMedium",
    fontSize: 18,
    color: COLORS.font,
    textAlign: "center",
    marginTop: 24,
  },
});

export default Details;
