/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import Context from "./Context/Context";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
// import {COLORS} from './constants';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Header from "./navigation/Header";
import { COLORS } from "./constants";
import Login from "./navigation/Login/LoginModal";
import { navigationRef } from "./navigation/RootNavigation";
import { InAppNotificationProvider } from "react-native-in-app-notification";

const Stack = createStackNavigator();

const App = () => {
  const [userDetails, setUserDetails] = useState({});
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@storage_Key");
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: COLORS.black,
  };
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.darkerBlack,
    },
  };

  const userDataHandler = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        // We have data!!
        const userData = JSON.parse(value);
        setUserDetails(userData);
        setLoggedIn(true);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    userDataHandler();

    const loginHandler = () => {};

    SplashScreen.hide();
    if (userDetails) {
      setVisible(true);
    }
  }, []);

  return (
    <InAppNotificationProvider>
      <Context.Provider
        value={{
          userDetails: userDetails,
          setUserDetails: (userData) => setUserDetails(userData),
          setModalVisible: setVisible,
          loggedIn: loggedIn,
          setLoggedIn: (val) => {
            if (val === false) {
              AsyncStorage.clear();
            }
            setLoggedIn(val);
          },
        }}
      >
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "light-content"}
            />
            <Header />
            {visible && <Login setVisible={(value) => setVisible(value)} />}
          </SafeAreaView>
          <NavigationContainer ref={navigationRef} theme={MyTheme}>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Home"
            >
              <Stack.Screen name="Home" component={Tabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </Context.Provider>
    </InAppNotificationProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
