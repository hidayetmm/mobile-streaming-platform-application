import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import PublicProfile from "../PublicProfile/PublicProfile";
import BrowseCategories from "./BrowseCategories/BrowseCategories";
import Recommended from "./Recommended/Recommended";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./HomePage/HomePage";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="PublicProfile" component={PublicProfile} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </>
  );
};

export default Home;
