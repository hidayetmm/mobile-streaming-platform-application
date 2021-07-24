import React, { useEffect, useState } from "react";
import { getFollowStatus, followUnfollow } from "./Follow";
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Layout, Text, Icon, Input } from "@ui-kitten/components";

import { images, icons, SIZES, FONTS, COLORS } from "../../constants";
import Video from "react-native-video";
import StreamChat from "./StreamChat/StreamChat";

const PublicProfile = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [subscribtionStatus, setSubscribtionStatus] = useState(false);

  const [followingStatus, setFollowingStatus] = useState("");

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  let { item } = route.params;

  const styles = StyleSheet.create({
    backgroundVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: 220,
    },
    topContainer: {
      marginBottom: 5,
    },
    cardHeader: {
      width: "100%",
      alignItems: "center",
      borderRadius: 0,
    },
    container: {
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 10,
      height: 200,
      width: windowWidth * 0.92,
      backgroundColor: "#222B45",
    },
    content2: {
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 10,
      height: 200,
      width: windowWidth * 0.92,
      backgroundColor: "#222B45",
    },
    userContainer: {
      justifyContent: "space-between",
      height: 120,
      width: 100,
    },
    live: {
      display: "flex",
      justifyContent: "flex-start",
      height: 120,
    },
    userIcon: {
      width: 45,
      height: 45,
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    footerControl: {
      marginHorizontal: 8,
    },
    item: {
      backgroundColor: "#260c4e",
      borderRadius: SIZES.radius,
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 16,
      alignSelf: "flex-start",
    },
    itemReceiver: {
      backgroundColor: "#260c4e",
      borderRadius: SIZES.radius,
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 16,
      alignSelf: "flex-end",
    },
    title: {
      fontSize: 14,
    },
    icon: {
      width: 25,
      height: 25,
    },
  });

  const BellIcon = (props) => (
    <Icon {...props} name={subscribtionStatus ? "bell" : "bell-outline"} />
  );

  useEffect(() => {
    getFollowStatus(item.username)
      .then((res) => {
        setFollowingStatus(
          res.data.is_following === "yes" ? "following" : "notFollowing"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const followUnfollowHandler = () => {
    followUnfollow(followingStatus, item.username).then((res) => {
      setFollowingStatus((prevState) =>
        prevState === "following" ? "notFollowing" : "following"
      );
    });
  };

  return (
    <>
      <View
        style={{
          height: 220,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && (
          <Image
            source={{ uri: item.stream_thumbnail_url }}
            resizeMode="cover"
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              opacity: 0.3,
            }}
          />
        )}
        <ActivityIndicator animating={loading} size="large" />
        <Video
          source={{
            uri: item.streamURL,
          }} // Can be a URL or a local file.
          // ref={(ref) => {
          //   this.player = ref;
          // }}
          // Store reference
          // onBuffer={() => {
          //   console.log("buffering");
          //   setLoading(!loading);
          // }} // Callback when remote video is buffering
          onLoad={() => setLoading(false)}
          // onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          controls
        />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={110}
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            height: windowHeight * 0.1,
            flexDirection: "row",
            backgroundColor: "#222b45",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              justifyContent: "space-evenly",
              paddingLeft: 15,
            }}
          >
            <Text style={{ ...FONTS.body3, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
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
                  ...FONTS.body4,
                }}
              >
                {item.username}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 15,
              width: "42%",
            }}
          >
            <TouchableOpacity onPress={followUnfollowHandler}>
              <Icon
                fill="#fff"
                style={styles.icon}
                name={
                  followingStatus === "following" ? "heart" : "heart-outline"
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                accessoryLeft={BellIcon}
                appearance="outline"
                status={subscribtionStatus ? "basic" : "control"}
                size="tiny"
              >
                {subscribtionStatus ? "Subscribed" : "Subscribe"}
              </Button>
            </TouchableOpacity>
          </View>
        </View>

        <StreamChat item={item} />
      </KeyboardAvoidingView>
    </>
  );
};

export default PublicProfile;
