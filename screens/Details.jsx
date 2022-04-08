import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TabView, TabBar } from "react-native-tab-view";

import DetailsDesc from "../components/DetailsDesc";
import DetailsEvol from "../components/DetailsEvol";
import ListItem from "../components/ListItem";
import { ShadeColor } from "../components/Utils";
import { COLORS } from "../constants/colors";

const FirstRoute = () => (
  <>
    <View style={{ ...styles.content, alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
    <View style={{ ...styles.content, alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  </>
);

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

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#273cd7" }} />
);

const Details = ({ route, navigation }) => {
  const [inputData, setInputData] = useState(route.params.data);
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonAdditionalData, setPokemonAdditionalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [primaryObj, secondaryObj] = inputData.pokemon_v2_pokemontypes;
  const [primaryType, secondaryType] = [
    primaryObj.pokemon_v2_type.name,
    secondaryObj?.pokemon_v2_type.name,
  ];

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Stats" },
    { key: "second", title: "Evolution" },
    { key: "third", title: "Attributes" },
  ]);

  //////////////////////////////
  // Functions
  useEffect(() => {
    // Ignore warning
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

    const fetchPokemonData = async () => {
      Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputData.name}`).then(
          (data) => data.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${inputData.id}`).then(
          (data) => data.json()
        ),
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
        return <ThirdRoute />;
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
        <ListItem data={inputData} isDetails={true} />
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
});

export default Details;
