import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGet } from "@/hooks";
import { API } from "@/api/endpoints";
import CommonCheckBox from "@/components/global/common/ui/Checkbox";
import FeatureSkeleton from "@/components/global/progress/skeleton/FeatureSkeleton";
import { ActivityIndicator } from "react-native";

const Features = ({
  values,
  setFieldValue,
}: {
  values: any;
  setFieldValue: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  // SecurityFeature
  const {
    data: { data: SecurityData } = [],
    isLoading: SecurityLoading,
    isError: SecurityError,
  } = useGet({
    endpoint: API.GetAllSpaceSecurityDropdown + `?Page=1&PageSize=10`,
  });

  // Schedule Feature
  const {
    data: { data: ScheduleData } = {},
    isLoading: scheduleLoading,
    isError: ScheduleError,
  } = useGet({
    endpoint: API.GetAllScheduleDropdown + `?Page=1&PageSize=10`,
  });

  // Storage Data
  const {
    data: { data: StorageData } = {},
    isLoading: StorageLoading,
    isError: StorageError,
  } = useGet({
    endpoint: API.GetAllStorageConditionDropdown + `?Page=1&PageSize=10`,
  });

  // GetAllUnloadingDropdown
  const {
    data: { data: UnloadingData } = {},
    isLoading: UnloadingLoading,
    isError: UnloadingError,
  } = useGet({
    endpoint: API.GetAllUnloadingDropdown + `?Page=1&PageSize=10`,
  });

  const handleCheckboxChange = (fieldName: any, value: any) => {
    const isChecked = values[fieldName]?.includes(value);

    setFieldValue(
      fieldName,
      isChecked
        ? values[fieldName].filter((item: any) => item !== value)
        : [...values[fieldName], value]
    );
  };

  const renderCheckboxes = (data: any, fieldName: any) =>
    data?.data?.map((item: any) => (
      <CommonCheckBox
        key={item.value}
        index={item.value}
        values={values[fieldName]}
        label={item.label}
        handleCheckedChange={() => handleCheckboxChange(fieldName, item?.value)}
        items={item}
      />
    ));

  if (
    SecurityLoading ||
    scheduleLoading ||
    StorageLoading ||
    UnloadingLoading
  ) {
    return (
      <View>
        <ActivityIndicator size="large" color="#3C09BC" />
        <FeatureSkeleton />
      </View>
    );
  }

  return (
    <View className="pl-2">
      <View style={{ marginBottom: 24 }}>
        <Text style={styles.sectionTitle}>STORAGE</Text>
        <View style={styles.container}>
          {renderCheckboxes(StorageData, "storageConditions")}
        </View>
      </View>

      <View style={{ marginBottom: 24 }}>
        <Text style={styles.sectionTitle}>UNLOADING & MOVING</Text>
        <View style={styles.container}>
          {renderCheckboxes(UnloadingData, "unloadingMovings")}
        </View>
      </View>

      <View style={{ marginBottom: 24 }}>
        <Text style={styles.sectionTitle}>SECURITY</Text>
        <View style={styles.container}>
          {renderCheckboxes(SecurityData, "spaceSecurities")}
        </View>
      </View>

      <View style={{ marginBottom: 24 }}>
        <Text style={styles.sectionTitle}>SCHEDULE</Text>
        <View style={styles.container}>
          {renderCheckboxes(ScheduleData, "spaceSchedules")}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginLeft: 5,
    gap: 6,
    margintTop: 2,
  },
  sectionTitle: {
    fontWeight: "900",
    color: "#3B4C63",
    fontSize: 13,
    paddingBottom: 3,
    paddingLeft: 2,
    marginBottom: 3,
  },
});

export default Features;
