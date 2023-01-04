import axios from "axios";
import queryString from "query-string";
const baseURL = "";
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});
privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("actkn")}`,
    },
  };
});
privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
