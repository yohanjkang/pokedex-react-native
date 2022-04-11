import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";

import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";
import { EffectivenessCalculator } from "./Utils";

// Functions
const renderEffectiveness = (info) => {
  return (
    <View
      key={info.type}
      style={{
        ...styles.effectiveness,
        backgroundColor: COLORS[info.type].light,
      }}
    >
      <Image source={ICONS[info.type]} style={styles.typeIcon} />
      <Text
        style={{
          ...styles.effectivenessText,
          marginLeft: 6,
          textTransform: "uppercase",
        }}
      >
        {info.type}
      </Text>
      <View
        style={{
          ...styles.effectivenessTextContainer,
          backgroundColor: COLORS[info.type].default,
        }}
      >
        <Text style={styles.effectivenessText}>x{info.multiplier}</Text>
      </View>
    </View>
  );
};

// DETAILS ATT
const DetailsAtt = ({ data }) => {
  const [inputData, setInputData] = useState(data.inputData);

  const [primaryObj, secondaryObj] =
    inputData.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes;
  const [primaryType, secondaryType] = [
    primaryObj.pokemon_v2_type.name,
    secondaryObj?.pokemon_v2_type.name,
  ];

  const [weakAgainst, setWeakAgainst] = useState([]);
  const [resistantTo, setResistantTo] = useState([]);
  const [normalDmg, setNormalDmg] = useState([]);

  useEffect(() => {
    const multipliers = EffectivenessCalculator(primaryType, secondaryType);
    createEffectiveness(multipliers);
  }, []);

  const createEffectiveness = (multipliers) => {
    const weakAgainst = [],
      resistantTo = [],
      normalDmg = [];

    for (const type in multipliers) {
      if (multipliers[type] > 1)
        weakAgainst.push({
          type,
          multiplier: multipliers[type],
        });
      else if (multipliers[type] < 1) {
        if (multipliers[type] === 0.5)
          resistantTo.push({
            type,
            multiplier: "½",
          });
        else if (multipliers[type] === 0.25)
          resistantTo.push({
            type,
            multiplier: "¼",
          });
        else
          resistantTo.push({
            type,
            multiplier: "0",
          });
      } else
        normalDmg.push({
          type,
          multiplier: multipliers[type],
        });
    }

    setWeakAgainst(weakAgainst);
    setResistantTo(resistantTo);
    setNormalDmg(normalDmg);
  };

  return (
    <ScrollView>
      <Text style={styles.contentTitle}>Weak Against</Text>
      <View style={styles.content}>
        {weakAgainst.map((type) => renderEffectiveness(type))}
      </View>
      <Text style={styles.contentTitle}>Resistant To</Text>
      <View style={styles.content}>
        {resistantTo.map((type) => renderEffectiveness(type))}
      </View>
      <Text style={styles.contentTitle}>Normal Damage Taken</Text>
      <View style={styles.content}>
        {normalDmg.map((type) => renderEffectiveness(type))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.backgroundDefault,
    margin: 10,
    padding: 3,
    borderRadius: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: "auto",
  },
  contentTitle: {
    fontFamily: "NunitoMedium",
    fontSize: 18,
    color: COLORS.font,
    textAlign: "center",
    marginTop: 24,
  },
  effectiveness: {
    width: "48%",
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    margin: 3,
    borderRadius: 12,
    overflow: "hidden",
  },
  effectivenessText: {
    color: COLORS.font,
    fontFamily: "NunitoMedium",
    fontSize: 16,
  },
  effectivenessTextContainer: {
    height: 40,
    width: "20%",
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  typeIcon: {
    width: 30,
    height: 30,
    margin: 6,
  },
});

export default DetailsAtt;
