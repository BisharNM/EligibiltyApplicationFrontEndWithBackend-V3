import { adminHttp } from "./http";


const BASE_URL = "/api/v1/alsubejct"; 

export const subjectApi = {
  // --- SUBJECT 1 ---
  getSubject1: async () => (await adminHttp.get(`${BASE_URL}/Subject1`)).data,
  saveSubject1: async (list) => (await adminHttp.post(`${BASE_URL}/Subject1`, list)).data,
  deleteSubject1: async (id) => (await adminHttp.delete(`${BASE_URL}/Subject1/${id}`)).data,

  // --- SUBJECT 2 ---
  getSubject2: async () => (await adminHttp.get(`${BASE_URL}/Subject2`)).data,
  saveSubject2: async (list) => (await adminHttp.post(`${BASE_URL}/Subject2`, list)).data,
  deleteSubject2: async (id) => (await adminHttp.delete(`${BASE_URL}/Subject2/${id}`)).data,

  // --- SUBJECT 3 ---
  getSubject3: async () => (await adminHttp.get(`${BASE_URL}/Subject3`)).data,
  saveSubject3: async (list) => (await adminHttp.post(`${BASE_URL}/Subject3`, list)).data,
  deleteSubject3: async (id) => (await adminHttp.delete(`${BASE_URL}/Subject3/${id}`)).data,

    deleteAllSubject1: async () => (await adminHttp.delete(`${BASE_URL}/Subject1`)).data,
  deleteAllSubject2: async () => (await adminHttp.delete(`${BASE_URL}/Subject2`)).data,
  deleteAllSubject3: async () => (await adminHttp.delete(`${BASE_URL}/Subject3`)).data,
};