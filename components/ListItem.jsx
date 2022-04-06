import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";

const ListItem = ({ data }) => {
  const navigation = useNavigation();

  const [primaryObj, secondaryObj] = data.pokemon_v2_pokemontypes;
  const [primaryType, secondaryType] = [
    primaryObj.pokemon_v2_type.name,
    secondaryObj?.pokemon_v2_type.name,
  ];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { data })}
      activeOpacity={0.7}
    >
      <View
        style={{
          ...styles.main,
          backgroundColor: COLORS[primaryType].default,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.nameContainer}>
            <Text style={styles.id}>#{("00" + data.id).slice(-3)}</Text>
            <Text style={styles.name}>{data.name}</Text>
            <Image
              resizeMode="contain"
              style={{ ...styles.typeIcon, marginLeft: "auto" }}
              source={ICONS[primaryType]}
            />
            {typeof secondaryType !== "undefined" && (
              <Image
                resizeMode="contain"
                style={{ ...styles.typeIcon, marginLeft: 4 }}
                source={ICONS[secondaryType]}
              />
            )}
          </View>
          <View style={styles.typesContainer}>
            <Text
              style={{
                ...styles.type,
                backgroundColor: COLORS[primaryType].light,
                color: COLORS.font,
              }}
            >
              {primaryType}
            </Text>
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
        </View>
        <View
          style={{
            ...styles.imageContainer,
            backgroundColor: COLORS[primaryType].light,
          }}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  id: {
    margin: 5,
    fontSize: 16,
    fontFamily: "NunitoBold",
    color: COLORS.font,
  },
  image: {
    width: 80,
    height: 80,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
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
    backgroundColor: "gray",
    paddingLeft: 10,
    margin: 10,
    marginBottom: 0,
  },
  name: {
    textTransform: "capitalize",
    margin: 5,
    fontSize: 16,
    fontFamily: "NunitoBold",
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
    borderWidth: 1,
    borderColor: COLORS.font,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "NunitoRegular",
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
