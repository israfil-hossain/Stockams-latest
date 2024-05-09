import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../pages/auth/loginScreen";
import SignupScreen from "../pages/auth/signupScreen";
import BookingScreen from "../pages/rental/BookingScreen";
import SearchScreen from "../pages/rental/SearchScreen";
import ProfileScreen from "../pages/ProfileScreen";
import MessageScreen from "../pages/rental/MessageScreen";
import RentalsScreen from "../pages/owner/RentalsScreen";
import AddSpaceScreen from "../pages/owner/AddSpaceScreen";
import PaymentScreen from "../pages/owner/PaymentScreen";

import { Foundation } from "@expo/vector-icons";
import { useAuthUserContext } from "../context/AuthUserProvider";
import { SplashScreen } from "expo-router";

// Auth Stack
const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

// Rental Tab Navigator
const RentalTab = createBottomTabNavigator();

const RentalTabNavigator = () => {
  return (
    <RentalTab.Navigator>
      <RentalTab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={size} color={color} />
          ),
        }}
      />
      <RentalTab.Screen name="Search" component={SearchScreen} />
      <RentalTab.Screen name="Message" component={MessageScreen} />
      <RentalTab.Screen name="Profile" component={ProfileScreen} />
    </RentalTab.Navigator>
  );
};

// Owner Tab Navigator
const OwnerTab = createBottomTabNavigator();

const OwnerTabNavigator = () => {
  return (
    <OwnerTab.Navigator>
      <OwnerTab.Screen name="Rental" component={RentalsScreen} />
      <OwnerTab.Screen name="AddSpace" component={AddSpaceScreen} />
      <OwnerTab.Screen name="Payment" component={PaymentScreen} />
      <OwnerTab.Screen name="Profile" component={ProfileScreen} />
    </OwnerTab.Navigator>
  );
};

// Main Stack
const MainStack = createStackNavigator();

export default function MainNavigator() {
  const { userFound, userLoading, userRole } = useAuthUserContext();
  return (
    <MainStack.Navigator initialRouteName="SplashScreen">
      {userFound ? (
        <>
          {userRole === "RENTER" ? (
            <MainStack.Screen
              name="RentalTabs"
              component={RentalTabNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <MainStack.Screen
              name="OwnerTabs"
              component={OwnerTabNavigator}
              options={{ headerShown: false }}
            />
          )}
          <MainStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerTitle: "Profile" }}
          />
        </>
      ) : (
        <MainStack.Screen
          name="AuthTabs"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </MainStack.Navigator>
  );
}
