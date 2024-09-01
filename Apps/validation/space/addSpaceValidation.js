import * as Yup from "yup";

export const addSpaceValidation = Yup.object().shape({
  name: Yup.string().required("Space Name is required"),
  type: Yup.string().required("Type is required"),
  area: Yup.number()
    .positive("Area must be a positive number")
    .required("Area is required"),
  height: Yup.number()
    .positive("Height must be a positive number")
    .required("Height is required"),
  accessMethod: Yup.string().required("Access Method is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
});

export const imagesValidation = Yup.object().shape({
  spaceImages: Yup.array().of(
    Yup.object().shape({
      imageUrl: Yup.string()
        .url("Image URL must be a valid URL")
        .required("Image URL is required"),
    })
  ),
});

export const conditionValidation = Yup.object().shape({
  pricePerMonth: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
  minimumBookingDays: Yup.number()
    .integer("Minimum Booking Days must be an integer")
    .positive("Minimum Booking Days must be a positive number")
    .required("Minimum Booking Days is required"),
});
