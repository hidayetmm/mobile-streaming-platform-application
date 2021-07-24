import axios from "axios";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writeMessageAsNotification } from "./Notifications";

export const followUnfollow = async (follow_status, streamerUsername) => {
  const type = follow_status === "following" ? "unfollow" : "follow";

  // const data = new FormData();
  // data.append("username", username);

  try {
    const value = await AsyncStorage.getItem("userData");
    if (value !== null) {
      // We have data!!
      const userData = JSON.parse(value);

      return await axios({
        method: "post",
        url: `${Config.REACT_APP_TOOT_BACKEND}followers/${type}?access_token=${userData["access_token"]}`,
        data: { username: streamerUsername },
      })
        .then((res) => {
          if (follow_status !== "following") {
            writeMessageAsNotification(
              `${userData.username} just followed!`,
              streamerUsername,
              userData["access_token"]
            );
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFollowStatus = async (username) => {
  try {
    const value = await AsyncStorage.getItem("userData");
    if (value !== null) {
      // We have data!!
      const userData = JSON.parse(value);

      return await axios({
        method: "post",
        url: `${Config.REACT_APP_TOOT_BACKEND}followers/is_following?access_token=
          ${userData.access_token}`,
        data: { username: username },
      }).catch((err) => alert(err.message));
    }
  } catch (error) {
    console.log(error);
  }
};
