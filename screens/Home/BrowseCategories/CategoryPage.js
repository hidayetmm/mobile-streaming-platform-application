import React from "react";
import { Text } from "@ui-kitten/components";
import { COLORS, FONTS, SIZES, icons, images } from "../../../constants";

const CategoryPage = ({ route }) => {
  console.log(route.params);
  const item = route.params;

  return <Text style={{ color: COLORS.white }}>{item.label}</Text>;
};

export default CategoryPage;
