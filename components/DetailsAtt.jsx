import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  LogBox,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";
import { EffectivenessCalculator } from "./Utils";

const DetailsAtt = ({ data }) => {
  const [inputData, setInputData] = useState(data.inputData);

  const [primaryObj, secondaryObj] = inputData.pokemon_v2_pokemontypes;
  const [primaryType, secondaryType] = [
    primaryObj.pokemon_v2_type.name,
    secondaryObj?.pokemon_v2_type.name,
  ];

  const [weakAgainst, setWeakAgainst] = useState([]);
  const [resistantTo, setResistantTo] = useState([]);
  const [normalDmg, setNormalDmg] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

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
            multiplier: "1/2",
          });
        else if (multipliers[type] === 0.25)
          resistantTo.push({
            type,
            multiplier: "1/4",
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

  const renderEffectiveness = (info) => {
    return (
      <View
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
    backgroundColor: COLORS.backgroundDefault,
    margin: 10,
    padding: 12,
    paddingBottom: 6,
    borderRadius: 12,
  },
  contentTitle: {
    fontFamily: "NunitoMedium",
    fontSize: 18,
    color: COLORS.font,
    textAlign: "center",
    marginTop: 24,
  },
  effectiveness: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 6,
    overflow: "hidden",
  },
  effectivenessText: {
    color: COLORS.font,
    fontFamily: "NunitoMedium",
    fontSize: 16,
  },
  effectivenessTextContainer: {
    height: "100%",
    width: "20%",
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
