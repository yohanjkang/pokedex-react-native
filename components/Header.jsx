import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";

import { typeNames } from "./Utils";
import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";
import searchIcon from "../assets/misc_icons/search.png";

const genNames = [
  "All",
  "Generation I",
  "Generation II",
  "Generation III",
  "Generation IV",
  "Generation V",
  "Generation VI",
  "Generation VII",
  "Generation VIII",
];

const genNameToColor = {
  allGen: genNames[0],
  gen1: genNames[1],
  gen2: genNames[2],
  gen3: genNames[3],
  gen4: genNames[4],
  gen5: genNames[5],
  gen6: genNames[6],
  gen7: genNames[7],
  gen8: genNames[8],
};

// Functions
// Return object key from value
const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

// HEADER
const Header = ({ onSearch, onTypeFilter, onGenFilter }) => {
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [genModalVisible, setGenModalVisible] = useState(false);

  const [typeFilterText, setTypeFilterText] = useState("Types");
  const [typeFilterTextColor, setTypeFilterTextColor] = useState(COLORS.font);
  const [typeFilterColor, setTypeFilterColor] = useState(COLORS["all"].default);

  const [genFilterText, setGenFilterText] = useState("Generation");
  const [genFilterTextColor, setGenFilterTextColor] = useState(COLORS.font);
  const [genFilterColor, setGenFilterColor] = useState(COLORS["allGen"]);

  const renderTypeFilters = (type) => {
    const typeFilterText = type === "all" ? "Types" : type;
    const fontColor =
      type === "dark" ||
      type === "dragon" ||
      type === "fighting" ||
      type === "ghost" ||
      type === "ground" ||
      type === "poison" ||
      type === "steel" ||
      type === "water"
        ? COLORS.lightFont
        : COLORS.font;

    return (
      <TouchableOpacity
        onPress={() => {
          onTypeFilter(type);
          setTypeModalVisible(false);
          setTypeFilterText(typeFilterText);
          setTypeFilterTextColor(fontColor);
          setTypeFilterColor(COLORS[type].default);
        }}
        style={{ ...styles.typeFilter, backgroundColor: COLORS[type].light }}
        activeOpacity={0.7}
      >
        <Image style={styles.typeIcon} source={ICONS[type]} />
        <Text style={styles.typeName}>{type}</Text>
      </TouchableOpacity>
    );
  };

  const renderGenFilters = (gen) => {
    const genFilterText = gen === "All" ? "Generation" : gen;
    const textColor =
      gen === "Generation I" ||
      gen === "Generation V" ||
      gen === "Generation VI" ||
      gen === "Generation VII" ||
      gen === "Generation VIII"
        ? COLORS.lightFont
        : COLORS.font;

    return (
      <TouchableOpacity
        onPress={() => {
          onGenFilter(getKeyByValue(genNameToColor, gen));
          setGenModalVisible(false);
          setGenFilterText(genFilterText);
          setGenFilterTextColor(textColor);
          setGenFilterColor(COLORS[getKeyByValue(genNameToColor, gen)]);
        }}
        style={{
          ...styles.typeFilter,
          height: 50,
          backgroundColor: COLORS[getKeyByValue(genNameToColor, gen)],
        }}
        activeOpacity={0.7}
      >
        <Text
          style={{
            ...styles.typeName,
            color: textColor,
            textTransform: "none",
          }}
        >
          {gen}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.headerTitle}>Pokédex</Text>
      {/* Filters */}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 12,
        }}
      >
        {/* Type Filter */}
        <TouchableOpacity
          style={{
            ...styles.filterButton,
            backgroundColor: typeFilterColor,
            marginRight: 6,
          }}
          onPress={() => setTypeModalVisible(true)}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "NunitoBold",
              color: typeFilterTextColor,
            }}
          >
            {typeFilterText}
          </Text>
        </TouchableOpacity>
        {/* END Type Filter */}

        {/* Gen Filter */}
        <TouchableOpacity
          onPress={() => setGenModalVisible(true)}
          style={{
            ...styles.filterButton,
            backgroundColor: genFilterColor,
          }}
        >
          <Text
            style={{
              fontFamily: "NunitoBold",
              color: genFilterTextColor,
            }}
          >
            {genFilterText}
          </Text>
        </TouchableOpacity>
        {/* END Gen Filter */}
      </View>
      {/* END Filters */}

      {/* Type Modal */}
      <Modal
        isVisible={typeModalVisible}
        deviceWidth={Dimensions.deviceWidth}
        onBackButtonPress={() => setTypeModalVisible(false)}
        onBackdropPress={() => setTypeModalVisible(false)}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onTypeFilter("all");
              setTypeModalVisible(false);
              setTypeFilterText("Types");
              setTypeFilterColor(COLORS["all"].default);
            }}
            activeOpacity={0.7}
          >
            <View
              style={{
                height: 30,
                backgroundColor: "#b8b8b8",
                justifyContent: "center",
                marginHorizontal: 8,
                marginTop: 6,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  textTransform: "capitalize",
                  fontFamily: "NunitoBold",
                  textAlign: "center",
                  color: COLORS.font,
                }}
              >
                all
              </Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={Object.keys(typeNames)}
            renderItem={({ item }) => renderTypeFilters(item)}
            numColumns={2}
            keyExtractor={(item, index) => index}
            style={{ padding: 3 }}
          />
        </View>
      </Modal>
      {/* END Type Modal */}

      {/* Gen Modal */}
      <Modal
        isVisible={genModalVisible}
        deviceWidth={Dimensions.deviceWidth}
        onBackButtonPress={() => setGenModalVisible(false)}
        onBackdropPress={() => setGenModalVisible(false)}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: "hidden",
          }}
        >
          <FlatList
            data={genNames}
            renderItem={({ item }) => renderGenFilters(item)}
            keyExtractor={(item, index) => index}
            style={{ padding: 3 }}
          />
        </View>
      </Modal>
      {/* END Gen Modal */}

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
      {/* END Searchbar */}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flex: 1,
    backgroundColor: "#b8b8b8",
    borderRadius: 12,
    padding: 3,
    alignItems: "center",
  },
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
  typeFilter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    margin: 4,
    borderRadius: 12,
  },
  typeIcon: {
    width: 30,
    height: 30,
  },
  typeName: {
    flex: 1,
    textTransform: "capitalize",
    fontFamily: "NunitoBold",
    textAlign: "center",
  },
});

export default Header;
