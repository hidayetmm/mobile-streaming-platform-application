import React, { useEffect, useState } from "react";
import { Button, Text } from "@ui-kitten/components";
import { COLORS, FONTS, SIZES, icons, images } from "../../../constants";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SvgUri } from "react-native-svg";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import Config from "react-native-config";
import LinearGradient from "react-native-linear-gradient";

const CategoryPage = ({ route, navigation }) => {
  const [streams, setStreams] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const item = route.params;

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    getStreamsByCategory();
  }, []);

  const getStreamsByCategory = () => {
    axios
      .get(
        Config.REACT_APP_TOOT_BACKEND +
          "streams/browse?stream_type_id=1&tag_slugs[]=" +
          item.slug
      )
      .then(({ data }) => {
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

        if (streamsArr.length < 1) {
          setIsEmpty(true);
        } else {
          setStreams([...streamsArr]);
        }
      });
  };

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
    <LinearGradient
      colors={[
        COLORS.black,
        item?.slug === "music"
          ? "#5D26C1"
          : item?.slug === "art"
          ? "#00467F"
          : item?.slug === "events"
          ? "#076585"
          : item?.slug === "fashion"
          ? "rgba(196,113,237,0.7)"
          : item?.slug === "test"
          ? "#2B32B2"
          : null,

        COLORS.black,
      ]}
      style={styles.linearGradient}
    >
      <View>
        <View style={styles.mainView}>
          <Text category="h1">{item.label}</Text>
          <SvgUri height={35} width={35} uri={item.icon_url} />
        </View>
        <View style={styles.carouselView}>
          {isEmpty ? (
            <View style={styles.emptyView}>
              <Text>No stream available for {item.label}</Text>
            </View>
          ) : (
            <Carousel
              data={streams}
              renderItem={renderItem}
              sliderWidth={windowWidth}
              itemWidth={windowWidth - 80}
              layout="default"
            />
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 3.5,
  },
  icon: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
  },
  carouselView: {
    paddingVertical: SIZES.padding,
  },
  linearGradient: {
    height: "100%",
  },
  emptyView: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
});
