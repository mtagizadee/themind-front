import axios from "axios";

const BASE_URL = (import.meta as any).env.VITE_APP_BASE_URL as string;

export const publicApi = axios.create({
  baseURL: BASE_URL,
});
