import axios from "axios";
import Config from "react-native-config";
import { streamByUsername } from "./Stream";

export const writeMessageAsNotification = async (
  message,
  streamerUsername,
  access_token
) => {
  return streamByUsername(streamerUsername, access_token).then((res) => {
    if (res.data.item) {
      let res_data = res.data.item;
      let default_matrix_room_id = res_data["default_matrix_room_id"];

      function generateRandomNumber() {
        const d = new Date();
        const uniqueKey = d.getTime().toString();
        let text = "";
        for (let i = 0; i < 30; i++)
          text += uniqueKey.charAt(
            Math.floor(Math.random() * uniqueKey.length)
          );

        return text;
      }
      let random = generateRandomNumber();

      /* join room */
      axios.post(
        Config.REACT_APP_MatrixUrl +
          `rooms/${default_matrix_room_id}/join?access_token=${access_token}`
      );

      /* send message */
      axios.put(
        Config.REACT_APP_MatrixUrl +
          `rooms/${default_matrix_room_id}/send/m.room.message/${random}?access_token=` +
          access_token,
        {
          msgtype: "m.text",
          body: message,
        }
      );
    }
  });
};
