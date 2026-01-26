import axios from "axios";

export const adminHttp = axios.create({
  baseURL: "http://localhost:8080", // your backend
  headers: { "Content-Type": "application/json" },
});