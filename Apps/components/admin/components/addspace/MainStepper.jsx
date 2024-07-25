import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import SpaceInformation from "./spaces/SpaceInformation";
import AddImages from "./spaces/AddImages";
import Price_Conditions from "./spaces/Price_Conditions";
import Stepper from "./stepper/Stepper";

import { useToast } from "react-native-toast-notifications";
import { getImageFileData } from "../../../../utils/getFileType";
import { useCreate, useGet } from "../../../../hooks";
import { API } from "../../../../../api/endpoints";
import { useNavigation } from "@react-navigation/native";
import CommonProgress from "../../../global/progress/CommonProgress";
import useLazyGet from "../../../../hooks/useLazyGet";
import { useRoute } from "@react-navigation/native";
import BackHeader from "../../../global/header/BackHeader";
import usePatchUpdate from "../../../../hooks/usePatchUpdate";

const MainStepper = () => {
  const route = useRoute();
  // const { id: spaceId } = route.params || {};
  const [spaceId, setSpaceId] = useState(route.params?.id || null);

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
    isLoading: spaceRentLoading,
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
    if (spaceId && spacedata?.data?.length > 0) {
      setFormData({
        name: spacedata?.data?.name || "",
        type: spacedata?.data?.type?._id || "",
        area: spacedata?.data?.area || 0,
        height: spacedata?.data?.height || 0,
        pricePerMonth: spacedata?.data?.pricePerMonth || 0,
        minimumBookingDays: spacedata?.data?.minimumBookingDays || 0,
        accessMethod: spacedata?.data?.accessMethod?._id || "",
        location: spacedata?.data?.location || "",
        description: spacedata?.data?.description || "",
        spaceImages: spacedata?.data?.spaceImages || [],
        spaceSchedules: spacedata?.data?.spaceSchedules || [],
        storageConditions: spacedata?.data?.storageConditions || [],
        spaceSecurities: spacedata?.data?.spaceSecurities || [],
        unloadingMovings: spacedata?.data?.unloadingMovings || [],
      });
    }
  }, [spaceId, spacedata]);

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

  const updateAPI = API.UpdateSpaceForRent + `${spaceId}`;

  const {
    mutateAsync: spaceUpdate,
    isLoading: spaceUpdateIsLoading,
    isSuccess: UpdateSuccess,
    isError: UpdateError,
  } = usePatchUpdate({
    endpoint: updateAPI,
    isMultiPart: true, // Assuming you have file data
  });

  const handleSubmit = async () => {
    try {
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

      if (spaceId) {
        for (const uri of formData?.spaceImages) {
          payload.append("spaceImages", uri);
        }
      } else {
        for (const uri of formData?.spaceImages) {
          const { type, name, size } = await getImageFileData(uri);
          payload.append("spaceImages", {
            uri: uri,
            name: name,
            size: size,
            type: type,
          });
        }
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

      console.log("Final Payload ===> ", payload);

      let response = "";

      if (spaceId) {
        response = await spaceUpdate(payload);
      } else {
        response = await spaceCreate(payload);
      }

      if (response || isSuccess || UpdateSuccess) {
        setFormData("");
        if (spaceId) {
          toast.show("Space Update Successfully ! 👋", { type: "success" });
        } else {
          toast.show("Space Created Successfully ! 👋", { type: "success" });
        }

        navigation.navigate("Rentals");
        handleClear();
      }
    } catch (error) {
      // Handle errors, e.g., display error messages
      console.log({ error });
    }
  };

  if (spaceIsLoading || spaceUpdateIsLoading) {
    return <CommonProgress />;
  }

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <SpaceInformation
            onSubmit={nextStep}
            data={formData}
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
            isLoading={spaceIsLoading}
          />
        );
      default:
    }
  };

  return (
    <View className="w-[100%] h-[100%]">
      {spaceId && (
        <BackHeader Headertext={"go back"} handleFunction={handleClear} />
      )}
      {spaceRentLoading ? (
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

export default MainStepper;
