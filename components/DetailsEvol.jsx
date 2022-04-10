import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import { PokemonContext } from "./PokemonContext";
import { COLORS } from "../constants/colors";
import ListItem from "./ListItem";
import chevronDownIcon from "../assets/misc_icons/chevron_down.png";

const DetailsEvol = ({ data }) => {
  const [pokemonAdditionalData, setPokemonAdditionalData] = useState(
    data.pokemonAdditionalData
  );

  const [loading, setLoading] = useState(true);
  const [evolChain, setEvolChain] = useState([]);

  const { pokemonList, setPokemonList } = useContext(PokemonContext);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const evolutionId = pokemonAdditionalData.evolution_chain.url
          .trim()
          .slice(8) // remove https://
          .split("/");

        const result = await fetch(
          `https://pokeapi.co/api/v2/evolution-chain/${
            evolutionId[evolutionId.length - 2] // get evolution-chain ID
          }`
        );

        const data = await result.json();

        setEvolChain(createEvolChain(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvolutionChain();
  }, []);

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

  const renderEvolution = (pokemon) => {
    const evolution = pokemonList.filter((item) =>
      item.name.toLowerCase().includes(pokemon)
    );

    if (evolution.length == 0) return null;

    return <ListItem data={evolution[0]} type={"Additional"} />;
  };

  return (
    <ScrollView>
      <Text style={styles.contentTitle}>Evolution Chain</Text>
      {renderEvolution(evolChain[0])}
      {evolChain[1]?.length !== 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image style={{ width: 40, height: 30 }} source={chevronDownIcon} />
        </View>
      )}
      {evolChain[1]?.map((pokemon) => renderEvolution(pokemon))}
      {evolChain[2]?.length !== 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image style={{ width: 40, height: 30 }} source={chevronDownIcon} />
        </View>
      )}
      {evolChain[2]?.map((pokemon) => renderEvolution(pokemon))}
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
