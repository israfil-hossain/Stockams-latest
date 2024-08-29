import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import SpaceOverviewScreen from "../pages/rental/SpaceOverviewScreen";
import SearchScreen from "../pages/rental/SearchScreen";
import SpaceReviewScreen from "../pages/rental/SpaceReviewScreen";

const SearchStack = createStackNavigator();
const BookingStack = createStackNavigator();

export default function SearchBookingScreenNavigation() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />

      <SearchStack.Screen
        name="spaceOverview"
        component={SpaceOverviewScreen}
      />
      <BookingStack.Screen name="spaceReview" component={SpaceReviewScreen} />
    </SearchStack.Navigator>
  );
}
