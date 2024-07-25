// FormikStep.tsx
import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";

export function FormikStep({ children }) {
    const formikProps = useFormikContext();
    return <View>{children(formikProps)}</View>;
  }
