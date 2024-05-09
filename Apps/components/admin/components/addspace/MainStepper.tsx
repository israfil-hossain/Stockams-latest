import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import SpaceInformation from "./spaces/SpaceInformation";
import AddImages from "./spaces/AddImages";
import Price_Conditions from "./spaces/Price_Conditions";
import Stepper from "./stepper/Stepper";
import { useCreate } from "@/hooks";
import { API } from "@/api/endpoints";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { getImageFileData } from "@/utils/getFileType";


const MainStepper = () => {
  const steps = ["Space Info.", "Images", "Price"];
  const [step, setStep] = useState(1);
  const toast = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
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
  } as any);

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
    onSuccess: () => console.log("Data created successfully!"),
    onError: (error) => console.error("Error creating data:", error),
  });

  const handleSubmit = async () => {
    if (spaceIsLoading) {
      return console.log("Data creation in progress...");
    }
    
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

      for(const uri of formData?.spaceImages){
        const {type,name,size} = await getImageFileData(uri); 
        payload.append("spaceImages",{
          uri:uri,
          name:name,
          size:size,
          type:type
        })
      }
      formData?.storageConditions?.forEach((item:any) => {
        payload.append("storageConditions", item);
      });
  
      formData?.unloadingMovings?.forEach((item:any) => {
        payload.append("unloadingMovings", item);
      });
  
      formData?.spaceSecurities?.forEach((item:any) => {
        payload.append("spaceSecurities", item);
      });
  
      formData?.spaceSchedules?.forEach((item:any) => {
        payload.append("spaceSchedules", item);
      });
  

      console.log("Final Payload ===> ", payload);

      await spaceCreate(payload); // Trigger the mutation with form data

      if (isSuccess) {
        setFormData("");
        toast.show("Space Created Successfully ! 👋", { type: "success" });
        router.push("/(main)/(home)/(owner)/(tabs)/rentals");
      }
    } catch (error) {
      // Handle errors, e.g., display error messages
      console.log({ error });
    }
  };

  const displayStep = (step: any) => {
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
      <Stepper currentStep={step} steps={steps} />
      <View className="mb-10">{displayStep(step)}</View>
    </View>
  );
};

export default MainStepper;
