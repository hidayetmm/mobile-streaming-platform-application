import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "react-native-config";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Text } from "@ui-kitten/components";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../../constants";
import { SvgUri } from "react-native-svg";

const BrowseCategories = ({ navigation, streamCount }) => {
  const [categories, setCategories] = useState([]);
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = () => {
    setIsLoading(true);

    axios
      .get(Config.REACT_APP_TOOT_BACKEND + "tags")
      .then(({ data }) => {
        setIsLoading(false);
        setCategories(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const renderItemCategories = ({ item }) => (
    <SkeletonContent
      isLoading={isLoading}
      layout={[
        {
          key: item.title,
          width: 150,
          height: 80,
          marginRight: 10,
          marginLeft: 15,
        },
      ]}
      boneColor="#121212"
      highlightColor="#333333"
    >
      <TouchableOpacity
        style={{
          width: windowWidth * 0.4,
          padding: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          borderRadius: SIZES.radius,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        onPress={() =>
          navigation.navigate("Home", {
            screen: "CategoryPage",
            params: item,
          })
        }
      >
        <View
          style={{
            width: "100%",
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.avatar_url }}
            resizeMode="cover"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: SIZES.radius * 2,
            }}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <SvgUri height={20} width={20} uri={item.icon_url} />
            <Text
              style={{
                marginLeft: 10,
                color: COLORS.white,
                ...FONTS.body3,
              }}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SkeletonContent>
  );

  return (
    <View
      style={{
        paddingBottom: 0,
      }}
    >
      <Text
        style={{
          padding: SIZES.padding,
          ...FONTS.body2,
          fontWeight: "900",
        }}
      >
        Browse categories
      </Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.title}`}
        renderItem={renderItemCategories}
      />
      <TouchableOpacity>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingVertical: 90,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/images/wave.jpeg")}
            style={{
              position: "absolute",
              width: "100%",
            }}
          />
          <View
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: 25,
            }}
          >
            <Text category="s2">Find streams to watch</Text>
            <Text category="h6">See who's streaming now</Text>
            <Text category="s2">{streamCount} live now</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BrowseCategories;
