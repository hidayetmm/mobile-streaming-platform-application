import React, { useState } from "react";
import BrowseCategories from "../BrowseCategories/BrowseCategories";
import Recommended from "../Recommended/Recommended";

const HomePage = ({ navigation }) => {
  const [streamCount, setStreamCount] = useState(0);
  return (
    <>
      <Recommended setStreamCount={setStreamCount} navigation={navigation} />
      <BrowseCategories streamCount={streamCount} navigation={navigation} />
    </>
  );
};

export default HomePage;
