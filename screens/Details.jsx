import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";

import ListItem from "../components/ListItem";

const Details = ({ route, navigation }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const result = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${route.params.data.name}`
        );
        const data = await result.json();

        setPokemonData(data);
        setLoading(false);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      <ListItem data={route.params.data} />
      <View>
        <Text>{`${pokemonData.height / 10}m`}</Text>
        <Text>{`${pokemonData.weight / 10}kg`}</Text>
      </View>
    </View>
  );
};

export default Details;
