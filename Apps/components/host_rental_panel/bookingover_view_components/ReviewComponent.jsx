import { View, Text } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { ReviewValidationSchema } from "../../../validation/review/reviewValidation";
import CustomInput from "../../global/common/CommonInput";
import Rating from "./Rating";
import Colors from "../../../constants/Colors";
import CustomButton from "../../global/common/ui/Button";

const ReviewComponent = () => {
  const [rating, setRating] = useState(0);
  console.log("Rating : ", rating)

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const payload = {
        review_msg: values?.review_msg,
        rating: rating
    }
    console.log(payload)
  };
  return (
    <Formik
      initialValues={{
        review_msg: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={ReviewValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View className="flex-col  m-3 shadow-lg shadow-gray-400 bg-white rounded-xl ">
          <View className="p-3">
            <Text className="font-[outfit] text-[16px] ">
              Would you like to rate your experience ?{" "}
            </Text>
            <View>
              <Rating
                initialRating={rating}
                onRatingChange={handleRatingChange}
              />
            </View>
            <Text className="font-[outfit] text-[16px] ">
              Would you like to write about the experience ?
            </Text>
            <CustomInput
              placeholder="Share Your Experience "
              height={100}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              // label="Would you like to write about the experience ?"
              onBlur={handleBlur("review_msg")}
              error={errors.review_msg}
              touched={touched.review_msg}
              onChangeText={handleChange("review_msg")}
              value={values.review_msg}
              type="richtext"
            />
            <View className="items-center mt-4">
            <CustomButton
              bg={Colors.primary}
              size={140}
              text="Submit Review"
              onPress={() => {
                handleSubmit();
              }}
            />
            </View>
            
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ReviewComponent;
