import axios from "axios";

export const axiosInstant = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add token to requests if available
axiosInstant.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiConnector = (
  method,
  url,
  bodyData,
  headers = {},
  params = {},
) => {
  return axiosInstant({
    method,
    url,
    data: bodyData || null,
    headers,
    params,
  });
};
