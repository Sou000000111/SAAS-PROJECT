import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ NO /api here
});

export default api;
export { api };