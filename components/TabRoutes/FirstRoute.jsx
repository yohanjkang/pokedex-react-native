import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

import DetailsDesc from "../DetailsDesc";
import { COLORS } from "../../constants/colors";

// Pokemon descriptions tab
export const FirstRoute = memo(
  ({ pokemonData, pokemonAdditionalData, inputData }) => {
    return (
      <DetailsDesc
        data={{
          pokemonData,
          pokemonAdditionalData,
          inputData,
        }}
      />
    );
  }
);

// Pre-loaded descriptions tab
export const FirstRoutePreload = () => (
  <>
    <Text style={styles.contentTitle}>Description</Text>
    <View style={{ ...styles.content, alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
    <Text style={styles.contentTitle}>Base Stats</Text>
    <View style={{ ...styles.content, alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.backgroundDefault,
    margin: 10,
    padding: 12,
    borderRadius: 12,
  },
  contentTitle: {
    fontFamily: "NunitoMedium",
    fontSize: 18,
    color: COLORS.font,
    textAlign: "center",
    marginTop: 24,
  },
});
