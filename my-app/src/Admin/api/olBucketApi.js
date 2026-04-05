import { adminHttp } from "./http";

// Matches @RequestMapping("olsubejct/")
const BASE_URL = "/olsubejct"; 

export const olBucketApi = {
  // --- BUCKET 1 ---
  getSubject1: async () => (await adminHttp.get(`${BASE_URL}/Subject1`)).data,
  saveSubject1: async (list) => (await adminHttp.post(`${BASE_URL}/Subject1`, list)).data,
  deleteSubject1: async (id) => (await adminHttp.delete(`${BASE_URL}/Subject1/${id}`)).data,
  deleteAllSubject1: async () => (await adminHttp.delete(`${BASE_URL}/Subject1`)).data,

  // --- BUCKET 2 ---
  getSubject2: async () => (await adminHttp.get(`${BASE_URL}/Subject2`)).data,
  saveSubject2: async (list) => (await adminHttp.post(`${BASE_URL}/Subject2`, list)).data,
  deleteSubject2: async (id) => (await adminHttp.delete(`${BASE_URL}/Subject2/${id}`)).data,
  deleteAllSubject2: async () => (await adminHttp.delete(`${BASE_URL}/Subject2`)).data,

  // --- BUCKET 3 ---
  getSubject3: async () => (await adminHttp.get(`${BASE_URL}/Subject3`)).data,
  saveSubject3: async (list) => (await adminHttp.post(`${BASE_URL}/Subject3`, list)).data,
  deleteSubject3: async (id) => (await adminHttp.delete(`${BASE_URL}/Subject3/${id}`)).data,
  deleteAllSubject3: async () => (await adminHttp.delete(`${BASE_URL}/Subject3`)).data,
};