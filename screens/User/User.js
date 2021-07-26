import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import { Button, Card, Layout, Text, Icon, Input } from "@ui-kitten/components";
import LoginPage from "../../navigation/Login/LoginPage";
import Context from "../../Context/Context";
import { images, icons, SIZES, FONTS, COLORS } from "../../constants";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StarIcon = (props) => <Icon {...props} name="log-out-outline" />;

const User = () => {
  const [userInfo, setUserInfo] = useState({});

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
          };
          setUserInfo(userSettingsInfo);
          console.log(data["item"]);
        });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const Header = (props) => (
    <View style={[props.style, styles.headerContainer]} {...props}>
      <Text category="h6">Settings</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button style={styles.footerControl}>Get coins</Button>
      <Button style={styles.footerControl}>Sell coins</Button>
    </View>
  );

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
      height: 350,
      marginTop: 10,
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
    headerContainer: {
      borderWidth: 1,
      borderColor: "yellow",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    footerControl: {
      marginHorizontal: 8,
    },
    input: {},
  });

  const { setLoggedIn, loggedIn, userDetails } = useContext(Context);
  useEffect(() => {}, [userDetails]);

  return loggedIn ? (
    <>
      <Layout style={styles.topContainer} level="4">
        <Card appearance="outline" style={styles.cardHeader}>
          <Text category="h6">Account</Text>
        </Card>
      </Layout>

      <Layout style={styles.container}>
        <View style={styles.content}>
          <View style={styles.userContainer}>
            <Icon fill="#8F9BB3" name="person" style={styles.userIcon} />
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
        <Card style={styles.content2} header={Header}>
          <Input
            value={userInfo["firstName"]}
            style={styles.input}
            label="First name"
          />
          <Input
            value={userInfo["lastName"]}
            style={styles.input}
            label="Last name"
          />
          <Input
            value={userInfo["username"]}
            style={styles.input}
            label="Username"
          />
          <Input
            placeholder={userInfo["bio"] === null ? "Bio" : userInfo["bio"]}
            value={userInfo["bio"]}
            style={styles.input}
            label="Bio"
          />
        </Card>
      </Layout>
    </>
  ) : (
    <LoginPage />
  );
};

export default User;
