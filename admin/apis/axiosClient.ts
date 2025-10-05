import axios, { InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");

  config.headers.set(
    "Authorization",
    accessToken ? `Bearer ${accessToken}` : ""
  );
  config.headers.set("Accept", "application/json");
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
