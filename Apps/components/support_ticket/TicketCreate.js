import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import usePost from "../../hooks/useCreate";
import { API } from "../../../api/endpoints";
import { useToast } from "react-native-toast-notifications";
import CustomButton from "../global/common/ui/Button";
import Colors from "../../constants/Colors";

// Validation Schema using Yup
const TicketSchema = Yup.object().shape({
  title: Yup.string().required("Subject is required"),
  description: Yup.string().required("Description is required"),
});

const TicketCreation = ({ setIsOpen }) => {
  const toast = useToast();
  const { mutateAsync: createMutation, isLoading: ticketLoading } = usePost({
    isMultiPart: false,
    endpoint: API.CreateTicket,
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        title: values?.title,
        description: values?.description,
      };
      const response = await createMutation(payload);
      if (response) {
        toast.show("Ticket Assign Successfully ! 👋", { type: "success" });
        toggleSheet();
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View className="w-[80%] bg-white">
      <Text style={styles.title}>Create New Ticket</Text>

      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={TicketSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {/* Subject Field */}
            <TextInput
              style={styles.input}
              placeholder="Subject"
              onChangeText={handleChange("subject")}
              onBlur={handleBlur("subject")}
              value={values.subject}
            />
            {touched.subject && errors.subject && (
              <Text style={styles.errorText}>{errors.subject}</Text>
            )}

            {/* Description Field */}
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Description"
              multiline
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}

            <View className="flex flex-row justify-around items-center w-[100%]">
              <View className="w-[45%] ">
                <CustomButton
                  text="Cancel"
                  size={"100%"}
                  height={40}
                  bg={Colors.danger}
                  onPress={() => {
                    setIsOpen(false);
                  }}
                />
              </View>
              <View className="w-[45%] ">
                <CustomButton
                  text="Create Ticket"
                  size={"100%"}
                  height={40}
                  disabled={ticketLoading}
                  onPress={handleSubmit}
                  isLoading={ticketLoading}
                  bg={Colors.primary}
                />
              </View>
            </View>
            {/* Submit Button */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default TicketCreation;
