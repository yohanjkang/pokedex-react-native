import { View, Text, Image, TextInput } from "react-native";
import React from "react";

import searchIcon from "../assets/misc_icons/search.png";

const Header = ({ onSearch }) => {
  return (
    <View
      style={{
        backgroundColor: "gray",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 10,
        margin: 10,
      }}
    >
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
  );
};

export default Header;
