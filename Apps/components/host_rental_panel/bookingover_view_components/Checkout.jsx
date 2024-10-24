import { View, Text } from "react-native";
import React, { useState } from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import CustomButton from "../../global/common/ui/Button";
import { useToast } from "react-native-toast-notifications";

const Checkout = ({ paymentIntentData, toggleSheet, congratulationSheet }) => {
  const { confirmPayment,initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const toast = useToast();

  console.log("card", cardDetails);

  const handlePayment = async () => {
    try {
      if (!paymentIntentData) return;

      const { stripeSecret } = paymentIntentData;

      const { error, paymentIntent } = await confirmPayment(stripeSecret, {
        paymentMethodData: {
          card: cardDetails,
        },
      });

      if (error) {
        console.log("Payment failed", error);
        toggleSheet();
        toast.show("Payment failed", { type: "danger" });
      } else if (paymentIntent) {
        console.log("Payment successful", paymentIntent);
        toast.show("Payment successful!", { type: "success" });
        await congratulationSheet();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View className="w-full flex flex-col  justify-start px-4 mb-5 mt-5">
      <Text className="font-[outfit] text-lg text-start">Input Card Information</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{ number: "4242 4242 4242 4242" }}
        cardStyle={{ backgroundColor: "#E7E9E2", textColor: "black", fontFamily:"outfit-medium", fontSize:16, borderRadius:10, marginTop: 5 }}
        style={{
          width: "100%",
          height: 50,
          paddingLeft: 5,
          paddingRight: 10,
          borderRadius: 10,
        }}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
      />
      <View className="pt-5 items-center">
        <CustomButton text="Pay Now" onPress={handlePayment} />
      </View>
    </View>
  );
};

export default Checkout;
