import { adminHttp } from "./http";

export const courseApi = {
  getAll: async () => (await adminHttp.get("/Courses/")).data,

  create: async (course) => (await adminHttp.post("/Courses/", course)).data,

  update: async (course) => (await adminHttp.put("/Courses/", course)).data,
};