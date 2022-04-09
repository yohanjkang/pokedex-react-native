import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import React from "react";

import { COLORS } from "../constants/colors";
import searchIcon from "../assets/misc_icons/search.png";

const types = [{ value: "Normal" }, { value: "Grass" }, { value: "Fire" }];

const Header = ({ onSearch }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.headerTitle}>Pokémon</Text>
      {/* Filters */}
      {/* END */}
      {/* Searchbar */}
      <View style={styles.searchBar}>
        <Image
          source={searchIcon}
          resizeMode="contain"
          style={{ width: 20, height: 20, marginHorizontal: 10 }}
        />
        <TextInput
          placeholder="Search a Pokémon"
          placeholderTextColor="#fff"
          style={{ flex: 1, color: "white" }}
          onChangeText={onSearch}
        />
      </View>
      {/* END */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontFamily: "NunitoBold",
    color: COLORS.font,
    marginBottom: 6,
    marginLeft: 12,
  },
  main: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    paddingTop: StatusBar.currentHeight + 10,
  },
  searchBar: {
    backgroundColor: "gray",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default Header;
