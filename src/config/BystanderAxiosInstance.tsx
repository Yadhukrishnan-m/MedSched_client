import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { addBystanderToken, removeBystanderToken } from "../redux/slice/bystanderTokenSlice";
import store from "../redux/store";

// Define an Axios instance
const bystanderAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BYSTANDER_BASEURL,
  withCredentials: true,
});

// Request Interceptor
bystanderAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().bystanderTokenSlice.bystanderToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn(" No token found in Redux store!");
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
bystanderAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      console.error(" No response from server!");
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response.status;

    //  Handle Token Expiry
    if (
      status === 403 &&
      (error.response.data as { message: string })?.message ===
        "Invalid or expired token." &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log(" Refreshing Token...");
        const refreshResponse = await axios.post<{ accessToken: string }>(
          `${import.meta.env.VITE_SERVER_BASEURL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        // console.log(" New Access Token:", newAccessToken);

        store.dispatch(addBystanderToken(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return bystanderAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(" Refresh Token Failed:", refreshError);
        store.dispatch(removeBystanderToken());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default bystanderAxiosInstance;
