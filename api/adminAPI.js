// adminAPI.js
import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAccessToken,
} from "../Apps/utils/localStorageUtils";
import { adminQueryClient } from ".";

// const ADMIN_BASE_URL = "https://space-rental-api.vercel.app";
const ADMIN_BASE_URL = "https://spacerental-backend.onrender.com"; 

const adminAPI = axios.create({ baseURL: ADMIN_BASE_URL });



// #region Refreshing process and unauthorized request queue
let isRefreshingToken = false;
let requestQueue = [];

const addRequestToQueue = (callback) => {
  requestQueue.push(callback);
};

const processRequestQueue = (accessToken) => {
  while (requestQueue.length) {
    const currentRequest = requestQueue.shift();
    currentRequest(accessToken);
  }
};

adminAPI.interceptors.request.use(async (config) => {
  config.headers.Authorization = "Bearer " + await getAccessToken();
  // console.log(config.headers.Authorization);
  return config;
});

adminAPI.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error?.config;
  const refreshToken = await getRefreshToken();

  if (
    error?.response?.status === 401 &&
    !originalRequest?._retry &&
    !!refreshToken
  ) {
    originalRequest._retry = true;

    // Token refresh process
    if (!isRefreshingToken) {
      isRefreshingToken = true;
      axios
        .post(`${ADMIN_BASE_URL}/api/Authentication/TokenRefresh`, {
          refreshToken,
        })
        .then(async ({ data = {} }) => {
          await setAccessToken(data?.data?.accessToken);
           processRequestQueue(data?.data?.accessToken);
        })
        .catch(async () => {
          await removeTokens();
           processRequestQueue(false);
          adminQueryClient.resetQueries();
        })
        .finally(() => {
          isRefreshingToken = false;
        });
    }

    // Add request to queue
    return new Promise((resolve, reject) => {
      addRequestToQueue((accessToken) => {
        if (accessToken) {
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        }
        reject(originalRequest);
      });
    });
  }

  return Promise.reject(error);
});

// #endregion

export default adminAPI;
