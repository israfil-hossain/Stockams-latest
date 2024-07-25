import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import NearMeScreen from "../pages/rental";
import SpaceOverviewScreen from "../pages/rental/SpaceOverviewScreen";
import SpaceReviewScreen from "../pages/rental/SpaceReviewScreen";

const BookingStack = createStackNavigator();

export default function BookingScreenNavigation() {
  return (
    <BookingStack.Navigator screenOptions={{ headerShown: false }}>
      <BookingStack.Screen
        name="index"
        component={NearMeScreen}
      />

      <BookingStack.Screen
        name="spaceOverview"
        component={SpaceOverviewScreen}
      />
      <BookingStack.Screen
        name="spaceReview"
        component={SpaceReviewScreen}
      />

    </BookingStack.Navigator>
  );
}



  