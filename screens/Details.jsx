import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import ListItem from "../components/ListItem";
import { COLORS } from "../constants/colors";

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

  useEffect(() => {
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

  function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  const setDesc = () => {
    const { flavor_text_entries: descriptions } = pokemonAdditionalData;
    for (let i = descriptions.length - 1; i >= 0; i--) {
      if (descriptions[i].language.name !== "en") continue;
      else
        return (
          <Text style={styles.descriptionText}>
            {descriptions[i].flavor_text}
          </Text>
        );
    }

    return <Text>{descriptions[0].flavor_text}</Text>;
  };

  const setStat = (stat, statVal) => {
    let statName;
    const maxStat = Math.max.apply(
      Math,
      pokemonData.stats.map((stat) => stat.base_stat)
    );

    switch (stat) {
      case "attack":
        statName = "ATK";
        break;
      case "defense":
        statName = "DEF";
        break;
      case "special-attack":
        statName = "SP.ATK";
        break;
      case "special-defense":
        statName = "SP.DEF";
        break;
      case "speed":
        statName = "SPD";
        break;

      default:
        return null;
    }

    return (
      <View style={{ flexDirection: "row", marginBottom: 6 }}>
        <Text
          style={{
            ...styles.statName,
            backgroundColor: shadeColor(COLORS[primaryType].default, -15),
          }}
        >
          {statName}
        </Text>
        <Text
          style={{
            ...styles.statVal,
            width: `${(statVal / maxStat) * 75}%`,
            backgroundColor: shadeColor(COLORS[primaryType].default, -5),
          }}
        >
          {statVal}
        </Text>
      </View>
    );
  };

  if (loading)
    return (
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  return (
    <View
      style={{
        height: "100%",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: shadeColor(COLORS[primaryType].default, 10),
      }}
    >
      <ListItem data={inputData} />
      <Text style={styles.contentTitle}>Description</Text>
      <View
        style={{
          ...styles.content,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {setDesc()}
        <Text style={styles.descriptionText}>{`Height: ${
          pokemonData.height / 10
        }m`}</Text>
        <Text style={styles.descriptionText}>{`Weight: ${
          pokemonData.weight / 10
        }kg`}</Text>
      </View>

      <Text style={styles.contentTitle}>Base Stats</Text>
      <View style={{ ...styles.content, ...styles.stats }}>
        <FlatList
          data={pokemonData.stats}
          renderItem={(item) =>
            setStat(item.item.stat.name, item.item.base_stat)
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.backgroundDefault,
    margin: 10,
    padding: 10,
    borderRadius: 12,
  },
  contentTitle: {
    fontFamily: "NunitoMedium",
    fontSize: 18,
    color: COLORS.font,
    textAlign: "center",
    marginTop: 24,
  },
  descriptionText: {
    fontFamily: "NunitoRegular",
    color: COLORS.font,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.font,
  },
  stats: {
    paddingBottom: 4,
  },
  statName: {
    width: "25%",
    color: COLORS.lightFont,
    fontFamily: "NunitoBold",
    padding: 7,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    textAlign: "center",
  },
  statVal: {
    fontFamily: "NunitoMedium",
    color: COLORS.lightFont,
    height: "100%",
    paddingRight: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    textAlign: "right",
    textAlignVertical: "center",
  },
});

export default Details;
