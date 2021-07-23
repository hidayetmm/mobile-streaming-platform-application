import axios from "axios";
import Config from "react-native-config";

export const streamByUsername = async (username, access_token = false) => {
  let link = `streams/byusername/${username}`;

  if (access_token) {
    link += `?access_token=` + access_token;
  }

  return await axios.get(Config.REACT_APP_TOOT_BACKEND + link);
};
