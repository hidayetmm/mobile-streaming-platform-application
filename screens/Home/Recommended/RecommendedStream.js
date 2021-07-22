import React, { useState, useEffect } from "react";
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
import { SIZES, FONTS, COLORS, icons } from "../../../constants";

const RecommendedStream = ({ item }) => {
  //   const [status, setStatus] = useState(false);

  //   const windowWidth = useWindowDimensions().width;
  //   const windowHeight = useWindowDimensions().height;

  //   useEffect(() => {
  //     const checkStreamUrl = async (wowza_player_hls_playback_url) => {
  //       return await axios.get(wowza_player_hls_playback_url);
  //     };
  //   }, []);

  //   const renderItem = ({ item }) => (

  //   );
  return (
    <TouchableOpacity
      style={{
        // width: windowWidth * 0.8,
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        alignItems: "flex-start",
        justifyContent: "center",
        marginRight: SIZES.padding2,
      }}
      //   onPress={() => onSelectCategory(item)}
    >
      <View
        style={{
          width: "100%",
          height: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.stream_thumbnail_url }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SIZES.radius * 2,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: SIZES.padding,
            color: COLORS.white,
            ...FONTS.body2,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            marginTop: SIZES.padding,
            color: COLORS.white,
            ...FONTS.body3,
          }}
        >
          {item.viewer_count}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: 100,
        }}
      >
        <Image
          source={{ uri: "https://via.placeholder.com/350x180" }}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            borderRadius: SIZES.radius * 2,
          }}
        />
        <Text
          style={{
            color: COLORS.white,
            marginLeft: 5,
            ...FONTS.body3,
          }}
        >
          {item.user.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedStream;
