import React from "react";
import BrowseCategories from "../BrowseCategories/BrowseCategories";
import Recommended from "../Recommended/Recommended";

const HomePage = ({ navigation }) => {
  return (
    <>
      <Recommended navigation={navigation} />
      <BrowseCategories />
    </>
  );
};

export default HomePage;
