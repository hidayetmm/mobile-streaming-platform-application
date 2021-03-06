import React, { useState, useEffect } from "react";
import Config from "react-native-config";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import axios from "axios";
import { SIZES, FONTS, COLORS } from "../../../constants";
import Carousel from "react-native-snap-carousel";

const Recommended = ({ navigation, setStreamCount }) => {
  const [streams, setStreams] = useState([]);

  const windowWidth = useWindowDimensions().width;

  const getStreams = () => {
    axios
      .get(
        Config.REACT_APP_TOOT_BACKEND +
          "streams/browse?stream_type_ids[]=1&stream_type_ids[]=3&stream_type_ids[]=4&stream_type_ids[]=5&order_by_viewer_count=0&order_by_random=1&per_page=8"
      )
      .then(({ data }) => {
        if (Boolean(data.items)) {
          const streamsArr = data.items.map((item) => {
            return {
              id: item.id,
              stream_thumbnail_url: item.stream_thumbnail_url,
              title: item.title,
              viewer_count: item.viewer_count,
              username: item.user.username,
              avatarURL: item.user.avatar_url,
              streamURL: item.wowza_player_hls_playback_url,
            };
          });

          setStreams([...streamsArr]);
          setStreamCount(streamsArr.length);
        }
      });
  };

  useEffect(() => {
    getStreams();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: windowWidth * 0.8,
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        alignItems: "flex-start",
        justifyContent: "center",
        marginRight: SIZES.padding2,
      }}
      onPress={() =>
        navigation.navigate("Home", {
          screen: "PublicProfile",
          params: { item: item },
        })
      }
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
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Image
          source={{ uri: item.avatarURL }}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            color: COLORS.white,
            marginLeft: 5,
            ...FONTS.body3,
          }}
        >
          {item.username}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        paddingBottom: 0,
      }}
    >
      <Carousel
        data={streams}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth - 80}
        layout="default"
      />
    </View>
  );
};

export default Recommended;
