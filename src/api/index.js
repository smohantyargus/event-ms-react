import axios from "axios";

const api = axios.create({
  baseURL: "http://192.1.200.50:8080/api/v1/",
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export default api;
