import axios from "axios";

const apiUrl = "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error de respuesta:", error.response);
    } else if (error.request) {
      console.error("Error de red:", error.request);
    } else {
      console.error("Error en la solicitud:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
