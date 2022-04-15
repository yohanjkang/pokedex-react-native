import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";

const ListItem = ({ data, type }) => {
  const navigation = useNavigation();

  const [primaryObj, secondaryObj] =
    data.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes;
  const [primaryType, secondaryType] = [
    primaryObj.pokemon_v2_type.name,
    secondaryObj?.pokemon_v2_type.name,
  ];

  // Handle pressing of list item
  const handleOnPress = () => {
    if (type === "Details") return null;
    else if (type === "Additional") {
      navigation.push("Details", { data });
    } else {
      navigation.navigate("Details", { data });
    }
  };

  const getMainStyle = () => {
    // Style for details page
    if (type === "Details")
      return {
        ...styles.main,
        width: "100%",
        borderRadius: 0,
        paddingTop: StatusBar.currentHeight,
        height: 100 + StatusBar.currentHeight,
        margin: 0,
        marginHorizontal: 0,
        backgroundColor: COLORS[primaryType].default,
      };
    //Style for evolution chain
    else if (type === "Additional") {
      return {
        ...styles.main,
        backgroundColor: COLORS[primaryType].default,
        height: 108,
        borderWidth: 4,
        borderColor: COLORS[primaryType].default,
        // borderColor: "black",
      };
    }
    // Style for home page
    else {
      return {
        ...styles.main,
        backgroundColor: COLORS[primaryType].default,
      };
    }
  };

  const getImageContainerStyle = () => {
    // Style for details page
    if (type === "Details")
      return {
        ...styles.imageContainer,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: COLORS[primaryType].light,
      };
    // Style for home page
    else {
      return {
        ...styles.imageContainer,
        backgroundColor: COLORS[primaryType].light,
      };
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={type === "Details" ? 1 : 0.7}
    >
      <View style={getMainStyle()}>
        <View style={{ flex: 1 }}>
          {/* ID# + Name + Type Icons */}
          <View style={styles.nameContainer}>
            <Text style={styles.id}>#{("00" + data.id).slice(-3)}</Text>
            <Text style={styles.name}>{data.name}</Text>
            {/* Primary type icon */}
            <Image
              resizeMode="contain"
              style={{ ...styles.typeIcon, marginLeft: "auto" }}
              source={ICONS[primaryType]}
            />
            {/* Render secondary type icon if exists */}
            {typeof secondaryType !== "undefined" && (
              <Image
                resizeMode="contain"
                style={{ ...styles.typeIcon, marginLeft: 4 }}
                source={ICONS[secondaryType]}
              />
            )}
          </View>
          {/* END */}
          {/* Genus */}
          {type === "Details" && (
            <Text style={styles.genus}>
              {data.pokemon_v2_pokemonspeciesnames[0]?.genus}
            </Text>
          )}
          {/* END */}
          {/* Type Names */}
          <View style={styles.typesContainer}>
            {/* Primary type name */}
            <Text
              style={{
                ...styles.type,
                backgroundColor: COLORS[primaryType].light,
                color: COLORS.font,
              }}
            >
              {primaryType}
            </Text>
            {/* Render secondary type name if exists */}
            {typeof secondaryType !== "undefined" && (
              <Text
                style={{
                  ...styles.type,
                  backgroundColor: COLORS[secondaryType].light,
                  color: COLORS.font,
                }}
              >
                {secondaryType}
              </Text>
            )}
          </View>
          {/* END */}
        </View>
        {/* Image */}
        <View style={getImageContainerStyle()}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            }}
          />
        </View>
        {/* END */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  genus: {
    marginTop: -6,
    marginLeft: 12,
    marginBottom: 6,
    fontSize: 16,
    fontFamily: "NunitoMedium",
    color: COLORS.font,
  },
  id: {
    margin: 5,
    fontSize: 16,
    fontFamily: "NunitoExtraBold",
    color: COLORS.font,
  },
  image: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 5,
    paddingRight: 5,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingLeft: 10,
    margin: 5,
    marginHorizontal: 10,
    width: Dimensions.get("window").width - 20,
    height: 100,
  },
  name: {
    textTransform: "capitalize",
    margin: 5,
    fontSize: 16,
    fontFamily: "NunitoExtraBold",
    letterSpacing: 0.5,
    color: COLORS.font,
  },
  nameContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  nameDetails: {
    margin: 5,
  },
  type: {
    padding: 2,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: COLORS.font,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "NunitoMedium",
  },
  typeIcon: {
    width: 30,
    height: 30,
  },
  typesContainer: {
    flexDirection: "row",
    alignContent: "stretch",
  },
});

export default ListItem;
