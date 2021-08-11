import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "react-native-config";
import SkeletonContent from "react-native-skeleton-content-nonexpo";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  useWindowDimensions,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../../constants";
import { SvgUri } from "react-native-svg";

const BrowseCategories = ({ navigation }) => {
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

  // const renderItemFindStreams = ({ item }) => (
  //   <SkeletonContent
  //     isLoading={isLoading}
  //     layout={[
  //       {
  //         key: item.title,
  //         width: 150,
  //         height: 80,
  //         marginRight: 10,
  //         marginLeft: 15,
  //       },
  //     ]}
  //     boneColor="#121212"
  //     highlightColor="#333333"
  //   >
  //     <TouchableOpacity
  //       style={{
  //         width: windowWidth * 0.4,
  //         padding: SIZES.padding,
  //         paddingBottom: SIZES.padding * 2,
  //         borderRadius: SIZES.radius,
  //         alignItems: "flex-start",
  //         justifyContent: "center",
  //       }}
  //       //   onPress={() => onSelectCategory(item)}
  //     >
  //       <View
  //         style={{
  //           width: "100%",
  //           height: 80,
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Image
  //           source={{ uri: item.avatar_url }}
  //           resizeMode="cover"
  //           style={{
  //             position: "absolute",
  //             width: "100%",
  //             height: "100%",
  //             borderRadius: SIZES.radius * 2,
  //           }}
  //         />
  //         <Text
  //           style={{
  //             color: COLORS.white,
  //             ...FONTS.body3,
  //           }}
  //         >
  //           {item.title}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   </SkeletonContent>
  // );

  return (
    <View
      style={{
        paddingBottom: 0,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          padding: SIZES.padding,

          ...FONTS.body2,
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
    </View>
  );
};

export default BrowseCategories;
