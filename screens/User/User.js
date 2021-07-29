import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Layout, Text, Icon, Input } from "@ui-kitten/components";
import LoginPage from "../../navigation/Login/LoginPage";
import Context from "../../Context/Context";
import { images, icons, SIZES, FONTS, COLORS } from "../../constants";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, useController, Controller } from "react-hook-form";

const StarIcon = (props) => <Icon {...props} name="log-out-outline" />;

const User = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const InputField = ({ name, control, label, defaultValue }) => {
    const { field } = useController({
      control,
      defaultValue: defaultValue,
      name,
      rules: {
        required: name !== "bio",
      },
    });
    console.log(field);
    return (
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={field.onChange}
        defaultValue={defaultValue}
        label={label}
        disabled={!editMode}
      />
    );
  };

  useEffect(() => {
    getUserInfo().catch((err) => console.log(err));
  }, []);

  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        // We have data!!
        const userData = JSON.parse(value);
        const accessToken = userData["access_token"];

        const url = `${Config.REACT_APP_TOOT_BACKEND}users/info?access_token=${accessToken}`;

        axios.get(url).then(({ data }) => {
          const userSettingsInfo = {
            firstName: data.item["first_name"],
            lastName: data.item["last_name"],
            username: data.item["username"],
            bio: data.item["bio"],
            avatarURL: data.item["avatar_url"],
          };
          setUserInfo(userSettingsInfo);

          // Set default values for input fields after fetching
          const inputFieldDefaultValues = {
            firstName: data.item["first_name"],
            lastName: data.item["last_name"],
            username: data.item["username"],
            bio: data.item["bio"],
          };
          reset(inputFieldDefaultValues);
        });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const updateUserInfo = (data) => {
    console.log(data);
  };

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const styles = StyleSheet.create({
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
      height: 410,
      padding: 20,
      marginTop: 10,
      width: windowWidth * 0.92,
      backgroundColor: "#222B45",
      flexDirection: "column",
      justifyContent: "space-between",
      // borderWidth: 1,
      // borderColor: "yellow",
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
    icon: {
      width: 20,
      height: 20,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    footerControl: {
      marginHorizontal: 8,
    },
    inputView: {
      height: "80%",
      justifyContent: "space-evenly",
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });

  const { setLoggedIn, loggedIn, userDetails } = useContext(Context);

  return loggedIn ? (
    <>
      <Layout style={styles.container}>
        <View style={styles.content}>
          <View style={styles.userContainer}>
            <Image
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
              }}
              source={{ uri: userInfo["avatarURL"] }}
            />
            <Text category="h6">@{userDetails.username}</Text>
            <Text appearance="hint" category="s1">
              Online
            </Text>
          </View>
          <View style={styles.live}>
            <Button
              onPress={() => setLoggedIn(false)}
              style={styles.button}
              accessoryLeft={StarIcon}
            >
              Log out
            </Button>
          </View>
        </View>
      </Layout>
      <Layout style={styles.container} level="4">
        <View style={styles.content2}>
          <View style={styles.headerContainer}>
            <Text category="h6">Settings</Text>
            <TouchableOpacity
              onPress={() => setEditMode((prevState) => !prevState)}
            >
              <Icon
                name="edit-2-outline"
                style={styles.icon}
                fill={editMode ? COLORS.primary : COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <InputField
              control={control}
              label="First name"
              name="firstName"
              defaultValue={userInfo["firstName"]}
            />
            {errors.firstName && (
              <Text category="c1" style={{ color: "white" }}>
                This is required.
              </Text>
            )}

            <InputField
              control={control}
              label="Last name"
              name="lastName"
              defaultValue={userInfo["lastName"]}
            />
            {errors.lastName && (
              <Text category="c1" style={{ color: "white" }}>
                This is required.
              </Text>
            )}
            <InputField
              control={control}
              label="Username"
              name="username"
              defaultValue={userInfo["username"]}
            />
            {errors.username && (
              <Text category="c1" style={{ color: "white" }}>
                This is required.
              </Text>
            )}
            <InputField
              control={control}
              label="Bio"
              name="bio"
              defaultValue={userInfo["bio"]}
            />
            {errors.bio && (
              <Text category="c1" style={{ color: "white" }}>
                This is required.
              </Text>
            )}
          </View>
          <View style={styles.footerContainer}>
            <Button
              size="small"
              style={styles.footerControl}
              status="basic"
              disabled={!editMode}
              onPress={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button
              onPress={handleSubmit(updateUserInfo)}
              size="small"
              style={styles.footerControl}
              disabled={!editMode}
            >
              Save
            </Button>
          </View>
        </View>
      </Layout>
    </>
  ) : (
    <LoginPage />
  );
};

export default User;
