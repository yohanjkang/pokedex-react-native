import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";

import { typeNames } from "./Utils";
import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";
import searchIcon from "../assets/misc_icons/search.png";
import { FlatList } from "react-native-gesture-handler";

const Header = ({ onSearch, onTypeFilter }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [typeFilterText, setTypeFilterText] = useState("All");
  const [typeFilterColor, setTypeFilterColor] = useState(COLORS["all"].default);

  const renderTypeFilters = (type) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onTypeFilter(type);
          setModalVisible(false);
          setTypeFilterText(type);
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

  return (
    <View style={styles.main}>
      <Text style={styles.headerTitle}>Pokémon</Text>
      {/* Filters */}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 12,
        }}
      >
        <TouchableOpacity
          style={{ ...styles.filterButton, backgroundColor: typeFilterColor }}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "NunitoBold",
              color: COLORS.font,
            }}
          >
            {typeFilterText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.filterButton,
            backgroundColor: COLORS["all"].default,
          }}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "NunitoBold",
              color: COLORS.font,
            }}
          >
            Gen
          </Text>
        </TouchableOpacity>
      </View>
      {/* END */}
      {/* Type Modal */}
      <Modal
        isVisible={modalVisible}
        deviceWidth={Dimensions.deviceWidth}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
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
          {/* {Object.keys(typeNames).map((type) => renderTypeFilters(type))} */}
          <TouchableOpacity
            onPress={() => {
              onTypeFilter("all");
              setModalVisible(false);
              setTypeFilterText("all");
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
    color: COLORS.font,
  },
});

export default Header;
