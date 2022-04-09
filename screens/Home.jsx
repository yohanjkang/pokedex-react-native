import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, StatusBar } from "react-native";

import ListItem from "../components/ListItem";
import Header from "../components/Header";

const Home = () => {
  const [initData, setInitData] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create pokemon card
  const createListItem = ({ item }) =>
    item.id < 10000 && <ListItem data={item} isDetails={false} />;

  const handleSearch = (value) => {
    if (value.length === 0) setPokemonData(initData);

    // Check if ID being passed
    const filteredDataByID = initData.filter((item) =>
      item.id.toString().includes(value)
    );

    // Check if name being passed
    const filteredData = initData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0 && filteredDataByID.length === 0)
      setPokemonData(initData);
    else setPokemonData([...filteredDataByID, ...filteredData]);
  };

  // GraphQL query
  const gqlQuery = `query pokeAPIquery {
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

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        fetch("https://beta.pokeapi.co/graphql/v1beta", {
          credentials: "omit",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: gqlQuery,
          }),
          method: "POST",
        })
          .then((res) => res.json())
          .then((res) => {
            setInitData(res.data.pokemon_v2_pokemon);
            setPokemonData(res.data.pokemon_v2_pokemon);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemonData();
  }, []);

  // Loading screen
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header onSearch={handleSearch} />
      <FlatList
        data={pokemonData}
        renderItem={createListItem}
        keyExtractor={(item) => item.id}
        // Optimize flatlist (?)
        initialNumToRender={50}
        maxToRenderPerBatch={25}
        windowSize={10}
      />
    </SafeAreaView>
  );
};

export default Home;
