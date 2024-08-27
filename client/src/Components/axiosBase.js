import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3202/api",
  withCredentials: true,
  headers: {
    //     Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
