import React from "react";
import { View, Text, StyleSheet, BackHandler, ScrollView } from "react-native";
import BackHeader from "../../components/global/header/BackHeader";

const PrivacyPolicyScreen = () => {
  return (
    <View className="bg-white">
      <BackHeader Headertext="Back to Profile" />
      <ScrollView className="h-[90%] mb-5 px-4 ">
        <View className="flex flex-col">
          <Text className="font-bold text-xl  mt-8 mb-4">Privacy Policy</Text>
          <Text className="text-[15px]  text-[#ABB0B6] text-justify">
            The privacy of our visitors at WPKube is very important to us. We
            want you to understand the type of information we collect when you
            visit our site and how we use this information.
          </Text>
          <Text className="font-medium text-lg mt-4 ">Log File Data</Text>
          <Text className="text-[14px] mt-3 text-[#ABB0B6] text-justify ">
            In common with other websites, log files are stored on the web
            server saving details such as your IP address, browser type,
            referring page and time of visit. This information is not used to
            track individual visitors to this website.
          </Text>
          <Text className="font-medium text-lg mt-4 ">
            Cookies & Your Personal Data
          </Text>
          <Text className="text-[14px] mt-3 text-[#ABB0B6] text-justify ">
            Cookies are small digital signature files that are stored by your
            web browser that allow your preferences to be recorded when visiting
            the website. Also they may be used to track your return visits to
            the website.
          </Text>
          <Text className="text-[14px]  text-[#ABB0B6] text-justify mt-3 ">
            We might use cookies to store your preferences when you visit
            WPKube. This helps us to improve your experience as a visitor by
            tracking your interests, and lets us identify repeat visitors.
          </Text>
          <Text className="text-[14px]  text-[#ABB0B6] text-justify mt-3">
            We don't collect any personal information from you unless you supply
            it and we need it (for example signing up to our newsletter).
          </Text>
          <Text className="text-[14px] text-[#ABB0B6] text-justify mt-3">
            We won't share your personal information with anyone else except
            when required by some third party services who provide services such
            as sending out our newsletter.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

//make this component available to the app
export default PrivacyPolicyScreen;
