import { adminHttp } from "./http";

export const deadlineApi = {
  // backend returns Optional<Deadline>
  get: async () => (await adminHttp.get("/Courses/deadline")).data ?? null,

  save: async (closingDate) =>
    (await adminHttp.post("/Courses/deadline", { closingDate })).data,

  remove: async () => (await adminHttp.delete("/Courses/deadline")).data,
};