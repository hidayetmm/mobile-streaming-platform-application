import React, { useState } from "react";
import { Text } from "@ui-kitten/components";
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

const CategoryPage = ({ route }) => {
  const [streams, setStreams] = useState([]);

  console.log(route.params);
  const item = route.params;

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const getStreamsByCategory = () => {};

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
    <View>
      <View style={styles.mainView}>
        <Text category="h1">{item.label}</Text>
        <SvgUri height={50} width={50} uri={item.icon_url} />
      </View>
      <View>
        <Carousel
          data={streams}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 80}
          layout="default"
        />
      </View>
    </View>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: "yellow",
  },
  icon: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
  },
});
