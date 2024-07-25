import AsyncStorage from "@react-native-async-storage/async-storage";


export const setAccessToken = async (token)  => {
  try {
    // const data: AccessToken = { token };
    // const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem("accessToken", token);
    console.log("ACCESS TOKEN SAVE : ", token);
  } catch (error) {
    console.error({ error });
    const errorResponse = {
      message: "Error setting access token",
    };

    throw errorResponse;
  }
};

export const getAccessToken = async () => {
  try {
    // const userData = await AsyncStorage.getItem("accessToken");
    const jsonValue = await AsyncStorage.getItem("accessToken");
    return  jsonValue ?? "";
  } catch (error) {
    // console.error({ error });
    // Handle the error and return an ErrorResponse
    const errorResponse  = {
      message: "Error retrieving access token",
      // Include additional properties based on your error handling needs
    };

    throw errorResponse;
  }
};

export const setRefreshToken = async (token ) => {
  try {
    // const data: RefreshToken = { token };
    // const jsonData = JSON.stringify(data);
    
    await AsyncStorage.setItem("refreshToken", token);
    console.log("Refresh TOken SAVE  )))))))>",token)
  } catch (error) {
    console.error({ error });
    const errorResponse = {
      message: "Error setting refresh token",
    };

    throw errorResponse;
  }
};




export const getRefreshToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("refreshToken");
    return jsonValue ?? "";
  } catch (error) {
    // Handle the error and return an ErrorResponse
    const errorResponse = {
      message: "Error retrieving access token",
      // Include additional properties based on your error handling needs
    };

    throw errorResponse;
  }
};

export const setUserRole = async (role ) => {
  try { 
    await AsyncStorage.setItem("userRole", role);
  } catch (error) {
    console.error({ error });
    const errorResponse = {
      message: "Error setting User Role",
    };

    throw errorResponse;
  }
};
export const getUserRole = async ()  => {
  try {
    const jsonValue = await AsyncStorage.getItem("userRole");
    return jsonValue ?? "";
  } catch (error) {
    // Handle the error and return an ErrorResponse
    const errorResponse  = {
      message: "Error retrieving access token",
      // Include additional properties based on your error handling needs
    };

    throw errorResponse;
  }
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken","userRole"]);
  } catch (error) {
    console.error("Error removing tokens:", error);
  }
};
