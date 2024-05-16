import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../pages/ProfileScreen";
import ProfileInformationScreen from "../pages/profile/ProfileInformationScreen";
import ChangePasswordScreen from "../pages/profile/ChangePasswordScreen";
import FavouritePageScreen from "../pages/profile/FavouritePageScreen";
import ManagePaymentScreen from "../pages/profile/ManagePaymentScreen";
import TermsAndConditionScreen from "../pages/profile/TermsAndConditionScreen";
import PrivacyPolicyScreen from "../pages/profile/PrivacyPolicyScreen";
import spaceOverviewScreen from "../pages/rental/SpaceOverviewScreen";

const ProfileStack = createStackNavigator();

export default function ProfileScreenNavigation() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        // options={{
        //   tabBarLabel: "Profile",
        //   tabBarIcon: ({ color, size }) => (
        //     <Octicons name="person" size={18} color={color} />
        //   ),
        // }}
      />
      <ProfileStack.Screen
        name="profileInfo"
        component={ProfileInformationScreen}
      />
      <ProfileStack.Screen name="changePassword" component={ChangePasswordScreen} /> 
            <ProfileStack.Screen name="favourite" component={FavouritePageScreen} /> 
            <ProfileStack.Screen name="manage-payment" component={ManagePaymentScreen} /> 
            <ProfileStack.Screen name="terms-condition" component={TermsAndConditionScreen} /> 
            <ProfileStack.Screen name="privacy-policy" component={PrivacyPolicyScreen} /> 
            <ProfileStack.Screen name="spaceOverview" component={spaceOverviewScreen} /> 
    </ProfileStack.Navigator>
  );
}
