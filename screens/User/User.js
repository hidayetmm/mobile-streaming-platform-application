import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import { Button, Card, Layout, Text, Icon } from "@ui-kitten/components";
import LoginPage from "../../navigation/Login/LoginPage";
import Context from "../../Context/Context";
import { images, icons, SIZES, FONTS, COLORS } from "../../constants";

const StarIcon = (props) => <Icon {...props} name="log-out-outline" />;

const User = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">Wallet balance:</Text>
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
        <Card style={styles.content2} header={Header} footer={Footer}>
          <Text>300 TC</Text>
        </Card>
      </Layout>
    </>
  ) : (
    <LoginPage />
  );
};

export default User;
