import { adminHttp } from "./http";

export const alYearApi = {
  // GET method Returns { id: 1, firstAlYear: "2023", secondAlYear: "2024" }
  get: async () => {
    try {
      const response = await adminHttp.get("/Courses/AlYears");
      return response.data;
    } catch (e) {
      console.error("Error fetching AL Years:", e);
      return null;
    }
  },

  //  Save Years
  save: async (first, second) => {
    const response = await adminHttp.post("/Courses/AlYears", {
      firstAlYear: first,
      secondAlYear: second
    });
    return response.data;
  }
};