import axios from "axios";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const followUnfollow = async (follow_status, username) => {
  const type = follow_status === "following" ? "unfollow" : "follow";

  // const data = new FormData();
  // data.append("username", username);

  // if (follow_status !== "follow") {
  //   writeMessageAsNotification(current_user.username + " just followed!");
  // }

  try {
    const value = await AsyncStorage.getItem("userData");
    if (value !== null) {
      // We have data!!
      const userData = JSON.parse(value);

      return await axios({
        method: "post",
        url: `${Config.REACT_APP_TOOT_BACKEND}followers/${type}?access_token=${userData.access_token}`,
        data: { username: username },
      }).catch((err) => {
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
