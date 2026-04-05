import axios from "axios";

const AL_BASE_URL = "http://localhost:8080/api/v1/alsubejct";
const OL_BASE_URL = "http://localhost:8080/olsubejct";

export const referenceApi = {
  // 1. Fetch All A/L Subjects (Merge 1, 2, 3)
  getAllAlSubjects: async () => {
    try {
      const [s1, s2, s3] = await Promise.all([
        axios.get(`${AL_BASE_URL}/Subject1`),
        axios.get(`${AL_BASE_URL}/Subject2`),
        axios.get(`${AL_BASE_URL}/Subject3`)
      ]);
      
      // Combine and remove duplicates
      const allSubjects = [
        ...s1.data, 
        ...s2.data, 
        ...s3.data
      ].map(s => s.name).sort();

      return [...new Set(allSubjects)]; // Unique list
    } catch (e) {
      console.error("Error fetching A/L subjects", e);
      return [];
    }
  },

  // 2. Fetch All O/L Subjects (Merge Buckets + Add Core Subjects)
  getAllOlSubjects: async () => {
    try {
      const [b1, b2, b3] = await Promise.all([
        axios.get(`${OL_BASE_URL}/Subject1`),
        axios.get(`${OL_BASE_URL}/Subject2`),
        axios.get(`${OL_BASE_URL}/Subject3`)
      ]);

      const bucketSubjects = [
        ...b1.data, 
        ...b2.data, 
        ...b3.data
      ].map(s => s.name);

      
      const coreSubjects = [
        "Mathematics", "Science", "English", "History", 
        "Buddhism", "Islam", "Christianity", "Catholicism", "Hinduism", // Religions
        "Sinhala Language", "Tamil Language"
      ];

      const allSubjects = [...coreSubjects, ...bucketSubjects].sort();
      return [...new Set(allSubjects)];
    } catch (e) {
      console.error("Error fetching O/L subjects", e);
      return [];
    }
  }
};