import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import { ShadeColor } from "./Utils";
import { COLORS } from "../constants/colors";

// Functions
const setDesc = (pokemonAdditionalData) => {
  const { flavor_text_entries: descriptions } = pokemonAdditionalData;
  for (let i = descriptions.length - 1; i >= 0; i--) {
    if (descriptions[i].language.name !== "en") continue;
    return (
      <Text style={styles.descriptionText}>
        {descriptions[i].flavor_text.replace(/(\r\n|\n|\r)/gm, " ")}
      </Text>
    );
  }

  return <Text>Description unavailable.</Text>;
};

const setGen = (gen) => {
  let genText;
  switch (gen) {
    case "generation-i":
      genText = "Generation I";
      break;
    case "generation-ii":
      genText = "Generation II";
      break;
    case "generation-iii":
      genText = "Generation III";
      break;
    case "generation-iv":
      genText = "Generation IV";
      break;
    case "generation-v":
      genText = "Generation V";
      break;
    case "generation-vi":
      genText = "Generation VI";
      break;
    case "generation-vii":
      genText = "Generation VII";
      break;
    case "generation-viii":
      genText = "Generation VIII";
      break;

    default:
      break;
  }

  return <Text style={styles.descriptionText}>{genText}</Text>;
};

// DETAILS DESC
const DetailsDesc = ({ data }) => {
  const [pokemonData, setPokemonData] = useState(data.pokemonData);
  const [pokemonAdditionalData, setPokemonAdditionalData] = useState(
    data.pokemonAdditionalData
  );
  const [inputData, setInputData] = useState(data.inputData);

  const [primaryObj] = inputData.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes;
  const primaryType = primaryObj.pokemon_v2_type.name;

  // Functions
  const setStat = ({ stat, base_stat: statVal }) => {
    let statName;
    const maxStat = Math.max.apply(
      Math,
      pokemonData.stats.map((stat) => stat.base_stat)
    );

    switch (stat.name) {
      case "hp":
        statName = "HP";
        break;
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
      <View key={stat.id} style={{ flexDirection: "row", marginBottom: 6 }}>
        <Text
          key={stat.id}
          style={{
            ...styles.statName,
            backgroundColor: ShadeColor(COLORS[primaryType].default, -15),
          }}
        >
          {statName}
        </Text>
        <Text
          key={stat.id}
          style={{
            ...styles.statVal,
            width: `${(statVal / maxStat) * 75}%`,
            backgroundColor: ShadeColor(COLORS[primaryType].default, -5),
          }}
        >
          {statVal}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <Text style={styles.contentTitle}>Description</Text>

      {/* Description */}
      <View
        style={{
          ...styles.content,
          textAlign: "center",
        }}
      >
        {/* Flavor Text */}
        {setDesc(pokemonAdditionalData)}
        <Text
          style={{
            ...styles.descriptionTitle,
            color: COLORS[primaryType].default,
            marginBottom: 12,
          }}
        >
          Description
        </Text>
        {/* END Flavor Text */}

        {/* Generation */}
        {setGen(pokemonAdditionalData.generation.name)}
        <Text
          style={{
            ...styles.descriptionTitle,
            color: COLORS[primaryType].default,
            marginBottom: 12,
          }}
        >
          Generation
        </Text>
        {/* END Generation */}

        <View style={{ flexDirection: "row" }}>
          {/* Height */}
          <View style={{ flexGrow: 1, marginRight: 12 }}>
            <Text style={styles.descriptionText}>{`${
              pokemonData.height / 10
            }m (${((pokemonData.height / 10) * 3.2808).toFixed(2)}ft)`}</Text>
            <Text
              style={{
                ...styles.descriptionTitle,
                color: COLORS[primaryType].default,
              }}
            >
              Height
            </Text>
          </View>
          {/* END Height */}

          {/* Weight */}
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.descriptionText}>{`${
              pokemonData.weight / 10
            }kg (${((pokemonData.weight / 10) * 2.2046).toFixed(2)}lbs)`}</Text>
            <Text
              style={{
                ...styles.descriptionTitle,
                color: COLORS[primaryType].default,
              }}
            >
              Weight
            </Text>
          </View>
          {/* END Weight */}
        </View>
      </View>
      {/* END Description */}

      {/* Base Stats */}
      <Text style={styles.contentTitle}>Base Stats</Text>

      <View style={{ ...styles.content, paddingBottom: 4, marginBottom: 30 }}>
        {pokemonData.stats.map((stat) => setStat(stat))}
      </View>
      {/* END Base Stats */}
    </ScrollView>
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
  descriptionText: {
    fontFamily: "NunitoRegular",
    color: COLORS.font,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.font,
    borderRadius: 12,
    textAlign: "center",
  },
  descriptionTitle: {
    fontFamily: "NunitoBold",
    color: COLORS.font,
    borderColor: COLORS.font,
    textAlign: "center",
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

export default DetailsDesc;
