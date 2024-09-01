import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "../pages/auth/SignupScreen";
import BookingScreen from "../pages/rental/BookingScreen";
import MessageScreen from "../pages/rental/MessageScreen";
import PaymentScreen from "../pages/owner/PaymentScreen";

import {
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useAuthUserContext } from "../context/AuthUserProvider";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MainHeader from "../components/global/header/MainHeader";
import Colors from "../constants/Colors";
import ProfileScreenNavigation from "./ProfileNavigation";
import BookingScreenNavigation from "./BookingScreenNavigation";
import SearchBookingScreenNavigation from "./SearchScreenNavigation";
import HomeScreen from "../pages/owner/HomeScreen";
import CommonProgress from "../components/global/progress/CommonProgress";
import SpaceCreateNavigation from "./CreateSpaceNavigator";
import AddSpaceScreen from "../pages/owner/AddSpaceScreen";
import LoginScreen from "../pages/auth/loginScreen";

// Auth Stack
const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
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
  const navigation = useNavigation();
  return (
    <RentalTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: { height: 65 },

        tabBarLabelStyle: {
          fontFamily: "outfit-medium",
          fontSize: 10,
          height: 24,
          backgroundColor: "white",
          alignContent: "center",
          justifyContent: "space-around",
        },
        header: () => <MainHeader />,
      }}
      sceneContainerStyle={{
        marginTop: 0,
        backgroundColor: "#ffffff",
      }}
      initialRouteName="Nearme"
    >
      <RentalTab.Screen
        name="Nearme"
        component={BookingScreenNavigation}
        options={{
          tabBarLabel: "Near Me",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="my-location" size={24} color={color} />
          ),
        }}
      />

      <RentalTab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="message" size={24} color={color} />
          ),
        }}
      />
      <RentalTab.Screen
        name="SearchScreen"
        component={SearchBookingScreenNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View className="bg-primary relative w-12 h-12 mt-4 flex justify-center items-center rounded-full ">
              <Ionicons name="search" size={30} color={Colors.black} />
            </View>
          ),
        }}
      />
      <RentalTab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarLabel: "Booking",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-multiple-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <RentalTab.Screen
        name="ProfileHome"
        component={ProfileScreenNavigation}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" size={18} color={color} />
          ),
        }}
      />
    </RentalTab.Navigator>
  );
};

// Owner Tab Navigator
const OwnerTab = createBottomTabNavigator();

const OwnerTabNavigator = () => {
  return (
    <OwnerTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: { height: 65 },

        tabBarLabelStyle: {
          fontFamily: "outfit-medium",
          fontSize: 10,
          height: 24,
          backgroundColor: "white",
          alignContent: "center",
          justifyContent: "space-around",
        },
        header: () => <MainHeader />,
      }}
      sceneContainerStyle={{
        marginTop: 0,
        backgroundColor: "#ffffff",
      }}
      initialRouteName="Home"
    >
      <OwnerTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <OwnerTab.Screen
        name="RentalsOwner"
        component={SpaceCreateNavigation}
        options={{
          tabBarLabel: "Rentals",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="car-rental" size={24} color={color} />
          ),
        }}
      />
      <OwnerTab.Screen
        name="AddSpace"
        component={AddSpaceScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View className="bg-primary relative w-12 h-12 mt-4 flex justify-center items-center rounded-full ">
              <Ionicons
                name="add-circle-sharp"
                size={40}
                color={Colors.black}
              />
            </View>
          ),
        }}
      />
      <OwnerTab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarLabel: "Payments",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="payment" size={18} color={color} />
          ),
        }}
      />
      <OwnerTab.Screen
        name="ProfileOwner"
        component={ProfileScreenNavigation}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" size={18} color={color} />
          ),
        }}
      />
    </OwnerTab.Navigator>
  );
};

// Main Stack
const MainStack = createStackNavigator();

export default function MainNavigator() {
  const { userFound, userRole } = useAuthUserContext();

  return (
    <MainStack.Navigator
      screenOptions={{
        header: () => <MainHeader />, // Set the global header component
      }}
      initialRouteName={
        userFound
          ? userRole === "RENTER"
            ? "RentalTabs"
            : "OwnerTabs"
          : "AuthTabs"
      }
    >
      <MainStack.Screen
        name="AuthTabs"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="RentalTabs"
        component={RentalTabNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="OwnerTabs"
        component={OwnerTabNavigator}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}
