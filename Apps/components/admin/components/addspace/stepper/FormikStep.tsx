// FormikStep.tsx
import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";

export interface FormikStepProps {
  label: string;
  validationSchema?: any;
  children: (formikProps: any) => React.ReactNode; // Accept a function to render children with formikProps
}

export function FormikStep({ children }: FormikStepProps) {
    const formikProps = useFormikContext();
    return <View>{children(formikProps)}</View>;
  }
