import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, Text, StatusBar, View } from "react-native";

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { PokemonContext } from "../components/PokemonContext";

const Home = () => {
  // const [initData, setInitData] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { pokemonList, setPokemonList } = useContext(PokemonContext);

  // Create pokemon card
  const createListItem = ({ item }) => <ListItem data={item} type={""} />;

  const handleSearch = (value) => {
    if (value.length === 0) setPokemonData(pokemonList);

    // Check if ID being passed
    const filteredDataByID = pokemonList.filter((item) =>
      item.id.toString().includes(value)
    );

    // Check if name being passed
    const filteredData = pokemonList.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0 && filteredDataByID.length === 0)
      setPokemonData(pokemonList);
    else setPokemonData([...filteredDataByID, ...filteredData]);
  };

  // GraphQL query
  // const gqlQuery = `query pokeAPIquery {
  //   pokemon_v2_pokemon {
  //     name
  //     id
  //     pokemon_v2_pokemontypes {
  //       pokemon_v2_type {
  //         name
  //       }
  //     }
  //   }
  // }`;

  const gqlQuery = `query pokeAPIquery {
    pokemon_v2_pokemonspecies(order_by: {id: asc}) {
      name
      id
      pokemon_v2_generation {
        name
      }
      pokemon_v2_pokemons(limit: 1) {
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
      pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
        genus
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
            setPokemonList(res.data.pokemon_v2_pokemonspecies);
            setPokemonData(res.data.pokemon_v2_pokemonspecies);
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
