import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import SpaceOverviewScreen from "../pages/rental/SpaceOverviewScreen";
import SearchScreen from "../pages/rental/SearchScreen";

const SearchStack = createStackNavigator();


export default function SearchBookingScreenNavigation() {
    return (
      <SearchStack.Navigator screenOptions={{ headerShown: false }}>
        <SearchStack.Screen
          name="Search"
          component={SearchScreen}
        />
  
        <SearchStack.Screen
          name="spaceOverview"
          component={SpaceOverviewScreen}
        />
      </SearchStack.Navigator>
    );
  }