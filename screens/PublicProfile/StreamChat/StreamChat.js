import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "../../../Context/Context";
import axios from "axios";
import { streamByUsername } from "./Stream";
import { images, icons, SIZES, FONTS, COLORS } from "../../../constants";
import { Button, Card, Layout, Icon, Input, Text } from "@ui-kitten/components";

const StreamChat = ({ item }) => {
  const tabBarHeight = useBottomTabBarHeight();

  const { loggedIn, setLoggedIn, userDetails, setUserDetails } =
    useContext(Context);

  /////////////// States
  const [streamerName, setStreamerName] = useState("");
  const [default_matrix_room_id, setDefault_matrix_room_id] = useState("");
  const [streamerData, setStreamerData] = useState([]);
  const [roomMessages, setRoomMessages] = useState([]);
  // const [message, setMessage] = useState("");
  const [emptyInput, setEmptyInput] = useState(null);

  let message = "";

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
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

      alignItems: "center",
    },
    itemReceiver: {
      backgroundColor: "#260c4e",
      borderRadius: SIZES.radius,
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 16,
      alignSelf: "flex-end",
    },
    sender: {
      fontSize: 14,
      paddingHorizontal: 8,
    },
    message: {
      fontSize: 14,
      paddingRight: 8,
      flexShrink: 1,
    },
  });

  const renderItem = ({ item }) => (
    <View
      style={
        userDetails.username === item.sender ? styles.itemReceiver : styles.item
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 25,
            height: 25,
            borderRadius: 100,
          }}
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        />
        <Text category="h6" style={styles.sender}>
          {item.sender}:
        </Text>
        <Text numberOfLines={4} style={styles.message}>
          {item.message}
        </Text>
        {/* {item.message.length > 50 && (
          <Button style={{ alignSelf: "flex-end" }} size="tiny">
            See more
          </Button>
        )} */}
      </View>
    </View>
  );
  const renderIcon = (props) => (
    <TouchableOpacity onPress={sendMessage}>
      <Text>Send</Text>
    </TouchableOpacity>
  );

  ////////////////////////////////////////////////////
  useEffect(() => {
    const streamerUsername = item.username;
    const accessToken = userDetails.access_token;

    if (Boolean(accessToken)) {
      //   setAccessToken(userDetails.access_token);
      //   setLoggedUserData(userDetails);
      setStreamerName(streamerUsername);

      //   if (username === "t") {
      //     username = logged_user_data.user.username;
      //   }

      getUserStreamData(streamerUsername, accessToken);

      //   if (username === logged_user_data.user.username) {
      //     setShowDonationButton(false);
      //   }
    } else {
      getUserStreamData(streamerUsername);
    }

    return () => {
      const emptyArr = [];
      setRoomMessages([...emptyArr]);
    };
  }, []);

  /* get streamer data */
  const getUserStreamData = (username, access_token) => {
    streamByUsername(username, access_token).then((res) => {
      if (Boolean(res.data.item)) {
        let res_data = res.data.item;
        // console.log(res_data);

        // setShowChat(true);

        // if (
        //   res_data.is_live === 1 &&
        //   Boolean(window.sessionStorage.getItem("selected_stream_room"))
        // ) {
        //   openWebRtcTab();
        // } else {
        //   window.sessionStorage.removeItem("selected_stream_room");
        // }

        setDefault_matrix_room_id(res_data.default_matrix_room_id);
        setStreamerData(res_data.user);

        joinStreamRoom(res_data.default_matrix_room_id, access_token);

        getRoomMessages(res_data.default_matrix_room_id, access_token);

        syncMessges(res_data.default_matrix_room_id, access_token);
      }
    });
  };

  const joinStreamRoom = (room_id, access_token) => {
    axios
      .post(
        Config.REACT_APP_MatrixUrl +
          `rooms/${room_id}/join?access_token=${access_token}`
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const syncMessges = async (
    room_id,
    access_token,
    since = "s169_29_0_1_1_1_1_65_1"
  ) => {
    AsyncStorage.setItem("sync_since", since);

    try {
      const get_since = await AsyncStorage.getItem("sync_since");
      if (get_since !== null) {
        // We have data!!
        await axios
          .get(
            Config.REACT_APP_MatrixUrl +
              `sync?timeout=30000&since=${get_since}&access_token=${access_token}`
          )
          .then((res) => {
            getRoomMessages(room_id, access_token);

            syncMessges(room_id, access_token, res.data.next_batch);
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getRoomMessages = (room_id, access_token) => {
    /* from=t1-78_0_0_0_0_0_0_0_0& */
    axios
      .get(
        Config.REACT_APP_MatrixUrl +
          `rooms/${room_id}/messages?dir=b&access_token=${access_token}`
      )
      .then((res) => {
        let data = res.data.chunk,
          roomMessages_ = [...roomMessages];

        data.map((item) => {
          let msg = item.content.body;

          if (typeof msg !== "undefined") {
            roomMessages_.unshift({
              sender: item.user_id
                .replace("@", "")
                .replace(":" + Config.REACT_APP_BACK_END_SERVER, ""),
              message: msg,
            });
          }
        });

        // for (let item of data) {
        //   let msg = item.content.body;
        //   if (typeof msg !== "undefined") {
        //     roomMessages_.unshift({
        //       sender: item.user_id
        //         .replace("@", "")
        //         .replace(":" + Config.REACT_APP_BACK_END_SERVER, ""),
        //       message: msg,
        //     });
        //   }
        // }

        setRoomMessages(roomMessages_);

        // scroll to bottom
        // if (Boolean(message_list.current)) {
        //   message_list.current.scrollIntoView({
        //     behavior: "smooth",
        //     block: "end",
        //     inline: "nearest",
        //   });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function generateRandomNumber() {
    const d = new Date();
    const uniqueKey = d.getTime().toString();
    let text = "";
    for (let i = 0; i < 30; i++)
      text += uniqueKey.charAt(Math.floor(Math.random() * uniqueKey.length));

    return text;
  }

  const sendMessage = () => {
    const access_token = userDetails.access_token;
    let random = generateRandomNumber();

    if (message.length > 0) {
      if (access_token?.length > 0) {
        axios
          .put(
            Config.REACT_APP_MatrixUrl +
              `rooms/${default_matrix_room_id}/send/m.room.message/${random}?access_token=${access_token}`,
            {
              msgtype: "m.text",
              body: message,
            }
          )
          .then((res) => {
            setEmptyInput("");
            setEmptyInput(null);
          })
          .catch((err) => {
            console.log(err);
          });
        // $("#chat_msg").val("");
        // setMessage("");
        // if (roomMessages.length === 0) {
        //   getRoomMessages(default_matrix_room_id, access_token);
        // }
      } else {
        // setShowAlert(true);
        // setAlertType("danger");
        alert("To send message please login or signup");
      }
    }
  };

  return (
    <View
      style={{
        height: 345,
        backgroundColor: COLORS.darkerBlack,
        marginBottom: tabBarHeight + 180,
      }}
    >
      <FlatList
        indicatorStyle="white"
        inverted
        data={roomMessages.reverse()}
        renderItem={renderItem}
        keyExtractor={() => generateRandomNumber()}
        // extraData={roomMessages.reverse()}
      />
      <Input
        onChangeText={(text) => (message = text)}
        accessoryRight={renderIcon}
        placeholder="Send a message"
        value={emptyInput}
      />
    </View>
  );
};

export default StreamChat;
