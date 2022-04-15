import { StatusBar } from "react-native";

import { COLORS } from "../constants/colors";

export const headerStyles = {
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
};
