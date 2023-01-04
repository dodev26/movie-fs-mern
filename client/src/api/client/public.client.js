import axios from "axios";
import queryString from "query-string";
const baseURL = "";
const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});
publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-type": "application/json",
    },
  };
});
publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
