import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";

import MovesHeader from "../components/MovesScreen/MovesHeader";
import MovesListItem from "../components/MovesScreen/MovesListItem";

// GraphQL query
// From: https://beta.pokeapi.co/graphql/console/
const gqlQuery = `query pokeAPIquery {
    pokemon_v2_move(order_by: {name: asc}) {
        name
        accuracy
        power
        pp
        pokemon_v2_movedamageclass {
          name
        }
        pokemon_v2_moveflavortexts(where: {
            language_id: {_eq: 9}}, 
            limit: 1, 
            order_by: {flavor_text: asc}) 
        {
          flavor_text
        }
        pokemon_v2_type {
          name
        }
        move_effect_chance
        pokemon_v2_moveeffect {
            pokemon_v2_moveeffecteffecttexts {
                short_effect
            }
        }
      }
  }`;

const Moves = () => {
  const [movesData, setMovesData] = useState(null);
  const [movesList, setMovesList] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    // Fetch move data
    const fetchMoveData = async () => {
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
          setMovesData(res.data.pokemon_v2_move);
          setMovesList(res.data.pokemon_v2_move);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchMoveData();
  }, []);

  // Update type filter (passed to Header)
  const changeTypeFilter = (type) => {
    if (type === filterType) return;

    if (type === "all") {
      setFilterType(type);
      setMovesList(movesData);
      return;
    }

    const filteredList = movesData.filter(
      (item) => item.pokemon_v2_type.name === type
    );
    setMovesList(filteredList);
    setFilterType(type);
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

  const createListItem = ({ item }) => <MovesListItem data={item} />;

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
      <MovesHeader onTypeFilter={changeTypeFilter} />
      <FlatList
        data={movesList}
        renderItem={createListItem}
        keyExtractor={(item) => item.name}
        // Optimize flatlist (?)
        initialNumToRender={20}
        maxToRenderPerBatch={25}
        windowSize={10}
        contentContainerStyle={{ paddingBottom: 175 }}
      />
    </SafeAreaView>
  );
};

export default Moves;

const styles = StyleSheet.create({});
