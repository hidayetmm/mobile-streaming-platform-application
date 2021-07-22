import axios from "axios";
import moment from "moment";
import Config from "react-native-config";

// const username = window.location.pathname.split("/").filter((item) => {
//   return item.trim().length > 0;
// })[0];

// const l_storage = window.localStorage;
// const logged_user_data = JSON.parse(l_storage.getItem("authdata"));

// export const increaseDecreaseViewCount = async (stream_id, type = "plus") => {
//   const check_view_status = l_storage.getItem("viewed_stream_list")
//     ? JSON.parse(l_storage.getItem("viewed_stream_list"))
//     : [];

//   if (Boolean(logged_user_data)) {
//     if (check_view_status.indexOf(stream_id) === -1) {
//       check_view_status.push(stream_id);

//       l_storage.setItem(
//         "viewed_stream_list",
//         JSON.stringify(check_view_status)
//       );

//       await axios
//         .post(
//           process.env.REACT_APP_TOOT_BACKEND +
//             `streams/update_viewer_count/${stream_id}?access_token=` +
//             logged_user_data.access_token,
//           {
//             plus_minus: type === "plus" ? 1 : -1,
//           }
//         )
//         .then((res) => {});
//     }
//   }
// };

// export const getStreamViewCount = async (stream_id) => {
//   await axios
//     .get(process.env.REACT_APP_TOOT_BACKEND + `streams/info/${stream_id}`)
//     .then((res) => {
//       if (Boolean(res.data.item)) {
//         $(".show_video_views").text(
//           res.data.item.viewer_count > 0 ? res.data.item.viewer_count : "0"
//         );
//       }

//       setTimeout(() => {
//         getStreamViewCount(stream_id);
//       }, 5000);
//     });
// };

// export const getStreamInfo = async (stream_id, access_token) => {
//   return await axios.get(
//     process.env.REACT_APP_TOOT_BACKEND +
//       `streams/info/${stream_id}?access_token=${access_token}`
//   );
// };

// export const resetStreamViewCount = async (stream_id) => {
//   await axios
//     .post(
//       process.env.REACT_APP_TOOT_BACKEND +
//         `streams/update_viewer_count/${stream_id}?access_token=` +
//         logged_user_data.access_token,
//       {
//         exact_count: 0,
//       }
//     )
//     .then((res) => {
//       $(".show_video_views").text("0");

//       window.localStorage.removeItem("viewed_stream_list");
//     });
// };

// export const updateIsLive = async (status, wowza_stream_id) => {
//   await axios
//     .post(
//       process.env.REACT_APP_TOOT_BACKEND +
//         `streams/${status}/${wowza_stream_id}?access_token=${logged_user_data.access_token}`
//     )
//     .then((res) => {
//       if (status === "go_offline") {
//         axios.post(
//           process.env.REACT_APP_TOOT_BACKEND +
//             `streams/delete_rooms/${wowza_stream_id}?access_token=${logged_user_data.access_token}`
//         );

//         window.localStorage.removeItem("viewed_stream_list");
//       }

//       let update_date_type =
//         status === "go_live" ? "start_datetime" : "end_datetime";

//       let up_data = {};

//       up_data[update_date_type] = moment().format("YYYY-MM-DD HH:mm:ss");

//       if (status === "go_offline") {
//         up_data["start_datetime"] = "";
//       }

//       axios.post(
//         process.env.REACT_APP_TOOT_BACKEND +
//           `streams/update/${wowza_stream_id}?access_token=${logged_user_data.access_token}`,
//         up_data
//       );
//     });
// };

// export const checkStreamUrl = async (wowza_player_hls_playback_url) => {
//   return await axios.get(wowza_player_hls_playback_url);
// };

// export const getStreamSettings = async (access_token) => {
//   return await axios.get(
//     process.env.REACT_APP_TOOT_BACKEND +
//       "users/stream_settings?access_token=" +
//       access_token
//   );
// };

// export const getStreamShareLink = async (access_token, stream_id) => {
//   return await axios.post(
//     process.env.REACT_APP_TOOT_BACKEND +
//       "streams/get_stream_share_token/" +
//       stream_id,
//     {
//       access_token: access_token,
//     }
//   );
// };

// export const checkStreamShareToken = async (stream_id, token) => {
//   return await axios.post(
//     process.env.REACT_APP_TOOT_BACKEND +
//       "streams/validate_stream_share_token/" +
//       stream_id,
//     {
//       token: token,
//     }
//   );
// };

export const streamByUsername = async (username, access_token = false) => {
  let link = `streams/byusername/${username}`;

  if (access_token) {
    link += `?access_token=` + access_token;
  }

  return await axios.get(Config.REACT_APP_TOOT_BACKEND + link);
};

// export const beforeLeaveStream = (stream_id) => {
//   window.addEventListener("beforeunload", function () {
//     increaseDecreaseViewCount(stream_id, "minus");
//   });
// };
