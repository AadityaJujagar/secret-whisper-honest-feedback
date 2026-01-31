import axios from "axios";

export const axiosInstant = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

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
