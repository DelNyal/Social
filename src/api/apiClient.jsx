import axios from "axios";

export const mailApi = axios.create({
  baseURL: import.meta.env.VITE_MAIL_API,
});

mailApi.interceptors.request.use(
  async (config) => {
   // config.headers["Authorization"] ="Bearer mlsn.0b0a5e87663c1713ef74239afe8a069d9e8b0c99b07ff0951d60fdfbfdbd02bf";
    config.headers["Content-Type"] = "application/json";
    
    return config;
  },
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
