import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from "@react-navigation/native";
import BackHeader from "../../components/global/header/BackHeader";
import { API } from '../../../api/endpoints';

const SpaceReviewScreen = () => {
  const route = useRoute();
  const { id } = route.params; // Destructure the 'id' param
  const spaceReviewAPI = `${API.GetSpaceReviewByID}/${id}`;
  return (
    <View>
      <BackHeader Headertext="Back" />
      <Text>SpaceReviewScreen</Text>
    </View>
  )
}

export default SpaceReviewScreen