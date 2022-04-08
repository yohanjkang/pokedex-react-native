import { StyleSheet, Text, ScrollView, LogBox } from "react-native";
import React, { useState, useEffect } from "react";

import { COLORS } from "../constants/colors";

const DetailsEvol = ({ data }) => {
  const [pokemonData, setPokemonData] = useState(data.pokemonData);
  const [pokemonAdditionalData, setPokemonAdditionalData] = useState(
    data.pokemonAdditionalData
  );
  const [inputData, setInputData] = useState(data.inputData);

  const [primaryObj, secondaryObj] = inputData.pokemon_v2_pokemontypes;
  const [primaryType, secondaryType] = [
    primaryObj.pokemon_v2_type.name,
    secondaryObj?.pokemon_v2_type.name,
  ];

  const [loading, setLoading] = useState(true);
  const [evolChain, setEvolChain] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

    const fetchEvolutionChain = async () => {
      try {
        const evolutionId = pokemonAdditionalData.evolution_chain.url
          .trim()
          .slice(8) // remove https://
          .split("/");

        const result = await fetch(
          `https://pokeapi.co/api/v2/evolution-chain/${
            evolutionId[evolutionId.length - 2]
          }`
        );

        const data = await result.json();

        const evolChain = createEvolChain(data);

        console.log(evolChain);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvolutionChain();
  });

  const createEvolChain = ({ chain: data }) => {
    const evolutions = {
      0: data.species.name,
    };

    if (data.evolves_to.length === 0) return evolutions;

    const tier2 = [];
    const tier3 = [];
    data.evolves_to.forEach((tier2Evo) => {
      tier2.push(tier2Evo.species.name);
      tier2Evo.evolves_to.forEach((tier3Evo) => {
        tier3.push(tier3Evo.species.name);
      });
    });

    evolutions[1] = tier2;
    evolutions[2] = tier3;

    return evolutions;
  };

  return (
    <ScrollView>
      <Text style={styles.contentTitle}>Evolution Chain</Text>
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
});

export default DetailsEvol;
