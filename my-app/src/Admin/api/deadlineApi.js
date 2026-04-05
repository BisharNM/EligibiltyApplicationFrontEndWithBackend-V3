import { adminHttp } from "./http";

export const deadlineApi = {
  //  Returns { id: 1, closingDate: "2025-11-28" } or null
  get: async () => {
    try {
      const response = await adminHttp.get("/Courses/deadline");
      return response.data;
    } catch (e) {
      console.error("Error fetching deadline:", e);
      return null;
    }
  },

  //  Sends { closingDate: "YYYY-MM-DD" }
  save: async (dateString) => {
    const response = await adminHttp.post("/Courses/deadline", {
      closingDate: dateString
    });
    return response.data;
  },

  // DELETE
  remove: async () => {
    await adminHttp.delete("/Courses/deadline");
  }
};