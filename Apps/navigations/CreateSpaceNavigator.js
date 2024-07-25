import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AddSpaceScreen from "../pages/owner/AddSpaceScreen";
import EditSpaceScreen from "../pages/owner/EditSpaceScreen";
import RentalsScreen from "../pages/owner/RentalsScreen";

const SpaceStack = createStackNavigator();


export default function SpaceCreateNavigation() {
    return (
      <SpaceStack.Navigator screenOptions={{ headerShown: false }}>
        <SpaceStack.Screen
          name="Rentals"
          component={RentalsScreen}
        />
  
        <SpaceStack.Screen
          name="SpaceEdit"
          component={EditSpaceScreen}
        />
      </SpaceStack.Navigator>
    );
  }