import { adminAPI } from "../../api";

export default fetchAPI = async ({
  filters = {},
  endpoint = "api/SpaceForRent/GetAll",
  page = 1,
  pageSize = 10,
}) => {
  const buildUrl = () => {
    const urlParams = new URLSearchParams({
      Page: page,
      PageSize: pageSize,
    });

    // Conditionally add filters to the URL if present
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          urlParams.append(key, filters[key]);
        }
      });
    }
    return `${endpoint}?${urlParams.toString()}`;
  };

  try {
    const response = await adminAPI.get(buildUrl());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // Propagate the error
  }
};
