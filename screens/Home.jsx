import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, Text, StatusBar } from "react-native";

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { PokemonContext } from "../components/PokemonContext";

const genNameToAPIName = {
  gen1: "generation-i",
  gen2: "generation-ii",
  gen3: "generation-iii",
  gen4: "generation-iv",
  gen5: "generation-v",
  gen6: "generation-vi",
  gen7: "generation-vii",
  gen8: "generation-viii",
};

// GraphQL query
// From: https://beta.pokeapi.co/graphql/console/
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

// HOME SCREEN
const Home = () => {
  // Pokemon list info
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { pokemonList, setPokemonList } = useContext(PokemonContext);

  // Filter variables
  const [filterType, setFilterType] = useState("all");
  const [filterGen, setFilterGen] = useState("allGen");

  // Create pokemon card
  const createListItem = ({ item }) => <ListItem data={item} type={""} />;

  // Update type filter (passed to Header)
  const changeTypeFilter = (type) => {
    if (type === filterType) return;

    setFilterType(type);
  };

  // Update generation filter (passed to Header)
  const changeGenFilter = (gen) => {
    if (gen === filterGen) return;

    setFilterGen(gen);
  };

  // Search functionality
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

  // Apply filters on update
  const applyFilters = () => {
    let typeListToFilter;
    // Type filter
    if (filterType === "all") {
      typeListToFilter = pokemonList;
    } else {
      typeListToFilter = pokemonList.filter((item) => {
        const types = item.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes;

        return (
          types[0].pokemon_v2_type.name === filterType ||
          types[1]?.pokemon_v2_type.name === filterType
        );
      });
    }

    // Generation filter
    if (filterGen === "allGen") {
      setPokemonData(typeListToFilter);
    } else {
      const genListFiltered = typeListToFilter.filter(
        (item) =>
          genNameToAPIName[filterGen] === item.pokemon_v2_generation.name
      );

      setPokemonData(genListFiltered);
    }
  };

  // On initial render
  useEffect(() => {
    const fetchPokemonData = async () => {
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
        })
        .catch((err) => alert(err));
    };

    fetchPokemonData();
  }, []);

  // Update when filters are changed
  useEffect(() => {
    applyFilters();
  }, [filterType, filterGen]);

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
      <Header
        onSearch={handleSearch}
        onTypeFilter={changeTypeFilter}
        onGenFilter={changeGenFilter}
      />

      <FlatList
        data={pokemonData}
        renderItem={createListItem}
        keyExtractor={(item) => item.id}
        // Optimize flatlist (?)
        initialNumToRender={20}
        maxToRenderPerBatch={25}
        windowSize={10}
        contentContainerStyle={{ paddingBottom: 175 }}
      />
    </SafeAreaView>
  );
};

export default Home;
