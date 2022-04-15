import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";

import { COLORS } from "../../constants/colors";
import { ICONS } from "../../constants/icons";

// Functions
function removeLastWord(str) {
  const lastIndexOfSpace = str.lastIndexOf(" ");

  if (lastIndexOfSpace === -1) {
    return str;
  }

  return str.substring(0, lastIndexOfSpace);
}

const formatEffect = (desc, chance) => {
  const replaced = desc?.replace("$effect_chance", chance);

  return <Text>{replaced}</Text>;
};

// MOVES LIST ITEM
const MovesListItem = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);

  let doubleCategory = false;
  const formattedMoveName = formatName(data.name);
  const moveType = data.pokemon_v2_type.name;
  const moveClass = data.pokemon_v2_movedamageclass.name;

  function formatName(name) {
    let replaced = name.replace(/-/g, " ");
    const split = replaced.split(" ");

    if (split[split.length - 1] === "physical") {
      replaced = removeLastWord(replaced);
      doubleCategory = true;
    } else if (split[split.length - 1] === "special") {
      return null;
    }

    return (
      <Text
        style={{
          ...styles.moveInfoText,
          width: "55%",
          textTransform: "capitalize",
          fontFamily: "NunitoExtraBold",
        }}
      >
        {replaced}
      </Text>
    );
  }

  if (!formattedMoveName) return <></>;

  return (
    <>
      <TouchableOpacity
        style={styles.main}
        onPress={() => setModalVisible(true)}
      >
        <View style={{ flexDirection: "row" }}>
          {formattedMoveName}
          <Text style={styles.moveInfoText}>{data.power || "-"}</Text>
          <Text style={styles.moveInfoText}>{data.accuracy || "-"}</Text>
          <Text style={styles.moveInfoText}>{data.pp || "-"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              ...styles.moveType,
              backgroundColor: COLORS[moveType].light,
            }}
          >
            <Image source={ICONS[moveType]} style={styles.typeIcon} />
            <Text
              style={{
                ...styles.moveClass,
                marginLeft: "25%",
              }}
            >
              {moveType}
            </Text>
          </View>
          <Text
            style={{
              ...styles.moveClass,
              width: "35%",
              color: COLORS.lightFont,
              backgroundColor: doubleCategory ? COLORS.font : COLORS[moveClass],
            }}
          >
            {doubleCategory ? "PHYS/SPEC" : moveClass}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Move Description Modal */}
      <Modal
        isVisible={modalVisible}
        deviceWidth={Dimensions.deviceWidth}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        style={{
          margin: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...styles.modalTitle,
              backgroundColor: COLORS[moveType].light,
            }}
          >
            {formattedMoveName}
          </Text>
          <View
            style={{
              alignItems: "stretch",
              padding: 24,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ marginRight: 12 }}>
                <Text
                  style={{
                    ...styles.modalType,
                    backgroundColor: COLORS[moveType].default,
                    color:
                      moveType === "dark" ||
                      moveType === "dragon" ||
                      moveType === "fighting" ||
                      moveType === "ghost" ||
                      moveType === "ground" ||
                      moveType === "poison" ||
                      moveType === "steel" ||
                      moveType === "water"
                        ? COLORS.lightFont
                        : COLORS.font,
                  }}
                >
                  {moveType}
                </Text>
                <Text style={styles.modalDescText}>Type</Text>
              </View>
              <View>
                <Text
                  style={{
                    ...styles.modalType,
                    backgroundColor: doubleCategory
                      ? COLORS.font
                      : COLORS[moveClass],
                    color: COLORS.lightFont,
                  }}
                >
                  {doubleCategory ? "PHYSICAL/SPECIAL" : moveClass}
                </Text>
                <Text style={styles.modalDescText}>Class</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 24,
              }}
            >
              <View style={styles.modalStatsContainer}>
                <Text style={styles.modalStats}>{data.power || "-"}</Text>
                <Text style={styles.modalDescText}>Power</Text>
              </View>
              <View style={styles.modalStatsContainer}>
                <Text style={styles.modalStats}>{data.accuracy || "-"}</Text>
                <Text style={styles.modalDescText}>Accuracy</Text>
              </View>
              <View style={{ ...styles.modalStatsContainer, marginRight: 0 }}>
                <Text style={styles.modalStats}>{data.pp || "-"}</Text>
                <Text style={styles.modalDescText}>PP</Text>
              </View>
            </View>
            <View>
              <Text style={styles.modalTextContainer}>
                {data.pokemon_v2_moveflavortexts[0].flavor_text.replace(
                  /(\r\n|\n|\r)/gm,
                  " "
                )}
              </Text>
              <Text style={styles.modalDescText}>Description</Text>
            </View>
            {data.move_effect_chance && (
              <View>
                <Text style={styles.modalTextContainer}>
                  {formatEffect(
                    data.pokemon_v2_moveeffect
                      ?.pokemon_v2_moveeffecteffecttexts[0]?.short_effect,
                    data.move_effect_chance
                  )}
                </Text>
                <Text style={styles.modalDescText}>Effect Description</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
      {/* END Move Description Modal */}
    </>
  );
};

export default MovesListItem;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.backgroundDefault,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    margin: 5,
    marginHorizontal: 10,
    width: Dimensions.get("window").width - 20,
    height: 80,
  },
  modalTitle: {
    width: "100%",
    fontSize: 24,
    textAlign: "center",
    padding: 12,
  },
  modalType: {
    fontFamily: "NunitoBold",
    textTransform: "uppercase",
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modalDescText: {
    color: COLORS.font,
    fontFamily: "NunitoBold",
    textAlign: "center",
  },
  modalStats: {
    fontSize: 16,
    fontFamily: "NunitoBold",
    color: COLORS.font,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: COLORS.font,
    textAlign: "center",
  },
  modalStatsContainer: {
    marginRight: 12,
    flexGrow: 1,
  },
  modalTextContainer: {
    padding: 12,
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    textAlign: "center",
    fontFamily: "NunitoBold",
  },
  moveInfoText: {
    textAlign: "center",
    fontFamily: "NunitoBold",
    width: "15%",
  },
  moveClass: {
    borderRadius: 12,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "NunitoBold",
    textTransform: "uppercase",
  },
  moveType: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    marginRight: 12,
    borderRadius: 12,
  },
  typeIcon: {
    width: 25,
    height: 25,
  },
});
