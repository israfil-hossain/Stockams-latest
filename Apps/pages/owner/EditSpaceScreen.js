import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { API } from "../../../api/endpoints";
import useLazyGet from "../../hooks/useLazyGet";
import { useCreate, useGet } from "../../hooks";
import SpaceInformation from "../../components/admin/components/addspace/spaces/SpaceInformation";
import AddImages from "../../components/admin/components/addspace/spaces/AddImages";
import Price_Conditions from "../../components/admin/components/addspace/spaces/Price_Conditions";
import BackHeader from "../../components/global/header/BackHeader";
import CommonProgress from "../../components/global/progress/CommonProgress";
import Stepper from "../../components/admin/components/addspace/stepper/Stepper";

const EditSpaceScreen = () => {
  const route = useRoute();
  // const { id:spaceId } = route.params || {};
  const [spaceId, setSpaceId] = useState(route.params?.id || null);

  console.log({ spaceId });
  const navigation = useNavigation();
  const steps = ["Space Info.", "Images", "Price"];
  const [step, setStep] = useState(1);
  const toast = useToast();

  const handleClear = () => {
    setSpaceId("");
  };

  const spaceRentEndpoint = `${API.GetSingleSpaceForRent}/${spaceId}`;
  const {
    data: { data: spacedata } = {},
    isLoading: spaceDataLoading,
    refetch,
  } = useLazyGet(spaceRentEndpoint);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    area: 0,
    height: 0,
    pricePerMonth: 0,
    minimumBookingDays: 0,
    accessMethod: "",
    location: "",
    description: "",
    spaceImages: [],
    spaceSchedules: [],
    storageConditions: [],
    spaceSecurities: [],
    unloadingMovings: [],
  });

  useEffect(() => {
    if (spaceId) {
      refetch(spaceId);
    }
  }, [spaceId]);

  useEffect(() => {
    if (spacedata?.data?.spaceImages) {
      const urls = spacedata.data.spaceImages.map((image) => ({
        url: image.url,
        _id: image._id,
      }));
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        spaceImages: urls,
      }));
    }
  }, [spacedata]);
  

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const {
    mutateAsync: spaceCreate,
    isLoading: spaceIsLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useCreate({
    endpoint: API.SpaceForRentCreate,
    isMultiPart: true, // Assuming you have file data
  });

  const handleSubmit = async () => {

    try {

      console.log("FORM DATA : ", formData)

      const payload = new FormData();
      payload.append("name", formData?.name);
      payload.append("description", formData?.description);
      payload.append("location", formData?.location);
      payload.append("area", formData?.area);
      payload.append("height", formData?.height);
      payload.append("pricePerMonth", formData?.pricePerMonth);
      payload.append("minimumBookingDays", formData?.minimumBookingDays);
      payload.append("type", formData?.type);
      payload.append("accessMethod", formData?.accessMethod);

      for (const uri of formData?.spaceImages) {
        // const { type, name, size } = await getImageFileData(uri);
        payload.append("spaceImages", uri);
      }
      formData?.storageConditions?.forEach((item) => {
        payload.append("storageConditions", item);
      });

      formData?.unloadingMovings?.forEach((item) => {
        payload.append("unloadingMovings", item);
      });

      formData?.spaceSecurities?.forEach((item) => {
        payload.append("spaceSecurities", item);
      });

      formData?.spaceSchedules?.forEach((item) => {
        payload.append("spaceSchedules", item);
      });

      // console.log("Final Payload ===> ", payload);

      const response = await spaceCreate(payload); // Trigger the mutation with form data

      if (response || isSuccess) {
        setFormData("");
        toast.show("Space Created Successfully ! 👋", { type: "success" });
        navigation.navigate("Rentals");
      }
    } catch (error) {
      // Handle errors, e.g., display error messages
      console.log({ error });
    }
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <SpaceInformation
            onSubmit={nextStep}
            data={formData}
            spacedata={spacedata || []}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <AddImages
            onSubmit={nextStep}
            prevStep={prevStep}
            data={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <Price_Conditions
            onSubmit={handleSubmit}
            prevStep={prevStep}
            data={formData}
            setFormData={setFormData}
            spacedata={spacedata || []}
            isLoading={spaceIsLoading}
          />
        );
      default:
    }
  };

  return (
    <View className="w-[100%] h-[100%]">
      {spaceId && (
        <BackHeader Headertext={"Go Back"} handleFunction={handleClear} />
      )}
      {spaceDataLoading ? (
        <CommonProgress />
      ) : (
        <>
          <Stepper currentStep={step} steps={steps} />
          <View className="mb-10">{displayStep(step)}</View>
        </>
      )}
    </View>
  );
};

export default EditSpaceScreen;
