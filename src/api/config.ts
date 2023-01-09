import axios, { AxiosHeaders } from "axios";
import { publicRoutes } from "../common/routes";

const BASE_URL = (import.meta as any).env.VITE_APP_BASE_URL as string;

// instance of axios for requests that do not require authentication
export const publicApi = axios.create({
  baseURL: BASE_URL,
});

// instance of axios for requests that require authentication
export const privateApi = axios.create({
  baseURL: BASE_URL,
});

type TAuthHedaers = AxiosHeaders & { Authorization: string };

// interceptor that sets the authToken in each request
privateApi.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("authToken");
    if (jwtToken) {
      (config.headers as TAuthHedaers).Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor that handles 401 error in interceptor
privateApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = publicRoutes.addUserPage;
    }

    return Promise.reject(error);
  }
);
