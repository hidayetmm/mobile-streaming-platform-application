import React, { useEffect } from "react";
import * as RootNavigation from "./RootNavigation";
import { withInAppNotification } from "react-native-in-app-notification";

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

  const syncNotifications = async (
    access_token,
    since = "s108_112_0_1_1_1_1_11_1"
  ) => {
    let w_storage = window.localStorage;

    w_storage.setItem("sync_since", since);

    let get_since = w_storage.getItem("sync_since");

    await axios
      .get(
        process.env.REACT_APP_MatrixUrl +
          `sync?timeout=30000&since=${get_since}&access_token=` +
          access_token
      )
      .then((res) => {
        const invites = res.data.rooms.invite;
        const joins = res.data.rooms.join;

        /* room ivite notifications */
        if (typeof invites !== "undefined") {
          const notif_list = [];

          for (let key in invites) {
            let room_id = "",
              room_name = "",
              username = "",
              notif_type = "";

            let row = invites[key],
              events = row.invite_state.events;

            room_id = key;

            for (let detail of events) {
              let type = detail.type;

              if (type === "m.room.name") {
                notif_type = type;
                room_name = detail.content.name;
                username = detail.sender
                  .replace("@", "")
                  .replace(":" + process.env.REACT_APP_BACK_END_SERVER, "");
              }
            }

            if (Boolean(room_name.includes("from_"))) {
              autoJoinP2pChatRoom(access_token, room_id);
            } else {
              /* show notif */
              notif_list.unshift({
                room_id: room_id,
                type: notif_type,
                room_name: room_name,
                username: username,
              });
            }
          }

          setRoomNotifications(
            since === "s108_112_0_1_1_1_1_11_1" ? [] : notif_list
          );

          {
            since !== "s108_112_0_1_1_1_1_11_1" &&
              notif_list.map((item) => {
                const notifDiv = () => (
                  <div style={{ padding: "0 3px" }}>
                    <Space direction="vertical">
                      <h6 style={{ fontSize: ".9rem" }}>
                        {item.username} invite you {item.room_name} room
                      </h6>
                      <Space>
                        <Button
                          onClick={joinRoomAceptOrDeny.bind(this, item)}
                          htmlType="button"
                          className="showJoinRoomAceptOrDenyPopup"
                          style={{
                            color: "white",
                            backgroundImage:
                              "linear-gradient(to top, #7d54f2, #702be1)",
                            border: "0",
                          }}
                        >
                          Accept
                        </Button>

                        <Button
                          htmlType="button"
                          style={{
                            color: "white",
                            border: "0",
                            backgroundColor: "rgb(255, 58, 63)",
                          }}
                        >
                          Decline
                        </Button>
                      </Space>
                    </Space>
                  </div>
                );
                toast.dark(notifDiv, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  newestOnTop: false,
                  closeOnClick: true,
                  rtl: false,
                  pauseOnFocusLoss: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });
          }
        }

        /* message notification */
        if (typeof joins !== "undefined") {
          const notif_list = [];

          for (let key in joins) {
            let room_id = "",
              room_name = "",
              username = "",
              notif_type = "";

            let row = joins[key],
              events = row.timeline.events;

            room_id = key;

            for (let detail of events) {
              let type = detail.type,
                sender = detail.sender
                  .replace("@", "")
                  .replace(":" + process.env.REACT_APP_BACK_END_SERVER, "");

              if (
                type === "m.room.message" &&
                sender !== generalData.userData.user.username &&
                generalData.userData.user.username !== undefined
              ) {
                notif_type = type;
                username = sender;
              }
            }

            /* show notif */
            if (notif_type.trim().length > 0) {
              notif_list.unshift({
                room_id: room_id,
                type: notif_type,
                room_name: room_name,
                username: username,
              });
            }
          }

          setMessageNotifications(
            since === "s108_112_0_1_1_1_1_11_1" ? [] : notif_list
          );

          {
            since !== "s108_112_0_1_1_1_1_11_1" &&
              notif_list.map((item) => {
                const notifDiv = () => (
                  <div
                  // onClick={() => {
                  //   window.location.href = "/t/inbox/" + item.username;
                  // }}
                  >
                    <span>{item.username} sent you a message!</span>
                  </div>
                );
                toast.dark(notifDiv, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  newestOnTop: false,
                  closeOnClick: true,
                  rtl: false,
                  pauseOnFocusLoss: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });
          }
        }

        syncNotifications(access_token, res.data.next_batch);
      });
  };

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
      />
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
