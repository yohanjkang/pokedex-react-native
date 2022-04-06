import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from "react-native";

import ListItem from "../components/ListItem";
import Header from "../components/Header";

const Home = () => {
  const [initData, setInitData] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSearch = (value) => {
    if (value.length === 0) setPokemonData(initData);

    const filteredData = initData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) setPokemonData(initData);
    else setPokemonData(filteredData);
  };

  const gqlQuery = `query samplePokeAPIquery {
    pokemon_v2_pokemon {
      name
      id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }`;

  const gqlVariables = {
    limit: 20,
    offset: 1,
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        fetch("https://beta.pokeapi.co/graphql/v1beta", {
          credentials: "omit",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: gqlQuery,
            //   variables: gqlVariables,
          }),
          method: "POST",
        })
          .then((res) => res.json())
          .then((res) => {
            if (!initData) setInitData(res.data.pokemon_v2_pokemon);
            setPokemonData(res.data.pokemon_v2_pokemon);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemonData();
  }, []);

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
    <SafeAreaView>
      <StatusBar />
      <FlatList
        data={pokemonData}
        renderItem={({ item }) => item.id < 10000 && <ListItem data={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header onSearch={handleSearch} />}
      />
    </SafeAreaView>
  );
};

export default Home;
