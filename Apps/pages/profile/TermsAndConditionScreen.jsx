import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BackHeader from "../../components/global/header/BackHeader";


const TermsAndConditionScreen = () => {
  return (
    <View className="bg-white">
      <BackHeader Headertext="Back to Profile" />
      <ScrollView className="h-[90%] mb-5">
        <View className="flex flex-col">
          <Text className="font-bold text-xl m-5">Terms And Condition</Text>
          <Text className="text-[15px] mx-5 text-[#ABB0B6] text-justify leading-5">
            This service is operated by BBC Studios Distribution Limited (we, us
            or our). We are registered in England and Wales under company number
            1420028 and have our registered office at 1 Television Centre, 101
            Wood Lane, London W12 7FA. Our VAT number is 333289454.
          </Text>
          <Text className="text-[14px] mx-5 text-[#ABB0B6] text-justify mt-2 leading-5">
            1. Please read these terms and conditions (the Terms) carefully. By
            accessing and using our website and any content and features therein
            (including without limitation any games, widgets, embeddable media
            players and RSS feeds) (together, our Services), you indicate your
            acceptance of these Terms, the Privacy Policy, the Code of Conduct
            and any other notics, guidelines and rules published by us on our
            Services from time to time (each of which is incorporated into the
            Terms by this reference). The Privacy Policy and Code of Conduct can
            be accessed from links at the bottom of our webpages.
          </Text>
          <Text className="text-[14px] mx-5 text-[#ABB0B6] text-justify mt-2 leading-5">
            2. If you do not accept these Terms please do not access and or use
            our Services.
          </Text>
          <Text className="text-[14px] mx-5 text-[#ABB0B6] text-justify mt-3 leading-5">
            3. We may update these Terms at any time. Please review the Terms
            regularly to ensure you are aware of any changes. Your continued
            access to and/or use of our Services after changes have been made to
            the Terms indicates your agreement to be legally bound by the
            updated and/or amended Terms.
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
export default TermsAndConditionScreen;
