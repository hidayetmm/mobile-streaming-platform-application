import React, { useEffect } from "react";
import * as RootNavigation from "./RootNavigation";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import { images, icons, SIZES, FONTS, COLORS } from "../constants";

const Header = () => {
  useEffect(() => {});

  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        marginBottom: 10,
        zIndex: 2,
        backgroundColor: COLORS.black,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: 80,
          paddingLeft: SIZES.padding * 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => RootNavigation.navigate("HomePage")}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={{ color: "#fff", paddingLeft: 10, ...FONTS.h3 }}>
          toot
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      ></View>
      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: "center",
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
