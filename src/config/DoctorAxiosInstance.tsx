import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  addDoctorToken,
  removeDoctorToken,
} from "../redux/slice/doctorTokenSlice";
import store from "../redux/store";

// Define an Axios instance
const doctorAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOCTOR_BASEURL,
  withCredentials: true,
});

// Request Interceptor
doctorAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().doctorTokenSlice.doctorToken;

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
doctorAxiosInstance.interceptors.response.use(
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

        store.dispatch(addDoctorToken(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return doctorAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(" Refresh Token Failed:", refreshError);
        store.dispatch(removeDoctorToken());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default doctorAxiosInstance;
