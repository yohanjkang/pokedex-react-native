import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { typeNames } from "../Utils";
import { COLORS } from "../../constants/colors";
import { ICONS } from "../../constants/icons";
import { headerStyles } from "../styles";

const MovesHeader = ({ onTypeFilter, onClassFilter }) => {
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [classModalVisible, setClassModalVisible] = useState(false);

  const [typeFilterText, setTypeFilterText] = useState("Types");
  const [typeFilterColor, setTypeFilterColor] = useState(COLORS["all"].default);
  const [typeFilterTextColor, setTypeFilterTextColor] = useState(
    COLORS.lightFont
  );

  const [classFilterText, setClassFilterText] = useState("Class");
  const [classFilterColor, setClassFilterColor] = useState(
    COLORS["all"].default
  );

  const navigation = useNavigation();

  // Render type modal filters
  const renderTypeFilters = (type) => {
    const typeFilterText = type === "all" ? "Types" : type;
    const fontColor =
      type === "electric" || type === "fairy" || type === "ice"
        ? COLORS.font
        : COLORS.lightFont;

    return (
      // Modal Button
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

  // Render class modal filters
  const renderClassFilters = (moveClass) => {
    const classFilterText = moveClass === "all" ? "Classes" : moveClass;
    const classModalText = moveClass === "all" ? "allClass" : moveClass;

    return (
      // Modal Button
      <TouchableOpacity
        onPress={() => {
          onClassFilter(classModalText);
          setClassModalVisible(false);
          setClassFilterText(classFilterText);
          setClassFilterColor(COLORS[classModalText]);
        }}
        style={{
          ...styles.typeFilter,
          backgroundColor: COLORS[classModalText],
        }}
        activeOpacity={0.7}
      >
        <Text
          style={{
            ...styles.typeName,
            color: COLORS.lightFont,
            height: 50,
            textAlignVertical: "center",
          }}
        >
          {moveClass}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ ...styles.main, paddingBottom: 0 }}>
      <View style={{ flexDirection: "row", marginBottom: 6 }}>
        {/* Drawer Menu */}
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Entypo name="menu" size={36} color={COLORS.font} />
        </TouchableOpacity>
        {/* END Drawer Menu */}

        <Text style={styles.headerTitle}>Moves</Text>
      </View>

      {/* FILTERS */}
      <View
        style={{
          flexDirection: "row",
          height: 26,
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

        {/* Class Filter */}
        <TouchableOpacity
          style={{
            ...styles.filterButton,
            backgroundColor: classFilterColor,
          }}
          onPress={() => setClassModalVisible(true)}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "NunitoBold",
              color: COLORS.lightFont,
            }}
          >
            {classFilterText}
          </Text>
        </TouchableOpacity>
        {/* END Class Filter */}
      </View>
      {/* END FILTERS */}

      {/* COLUMN NAMES */}
      <View style={styles.moveInfoContainer}>
        <Text style={{ ...styles.moveInfo, width: "55%" }}>Name</Text>
        <Text style={styles.moveInfo}>Power</Text>
        <Text style={styles.moveInfo}>Acc.</Text>
        <Text style={styles.moveInfo}>PP</Text>
      </View>
      {/* END COLUMN NAMES */}

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

      {/* Class Modal */}
      <Modal
        isVisible={classModalVisible}
        deviceWidth={Dimensions.deviceWidth}
        onBackButtonPress={() => setClassModalVisible(false)}
        onBackdropPress={() => setClassModalVisible(false)}
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
            data={["all", "physical", "special", "status"]}
            renderItem={({ item }) => renderClassFilters(item)}
            keyExtractor={(item, index) => index}
            style={{ padding: 3 }}
          />
        </View>
      </Modal>
      {/* END Class Modal */}
    </View>
  );
};

export default MovesHeader;

const styles = StyleSheet.create({
  filterButton: headerStyles.filterButton,
  headerTitle: headerStyles.headerTitle,
  main: headerStyles.main,
  moveInfo: {
    width: "15%",
    textAlign: "center",
    color: COLORS.font,
    fontFamily: "NunitoBold",
  },
  moveInfoContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.backgroundAlt,
    marginHorizontal: -12,
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  searchBar: headerStyles.searchBar,
  typeFilter: headerStyles.typeFilter,
  typeIcon: headerStyles.typeIcon,
  typeName: headerStyles.typeName,
});
