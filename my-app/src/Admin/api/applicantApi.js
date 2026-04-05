import { adminHttp } from "./http";

export const applicantApi = {
  // Fetch all applicants from: GET http://localhost:8080/api/applicants
  getAll: async () => {
    const response = await adminHttp.get("/api/applicants");
    return response.data;
  },
  delete: async (id) => {
    await adminHttp.delete(`/api/applicants/${id}`);
  },
  // Bulk Delete
 
  deleteByStatus: async (status) => {
    return adminHttp.delete(`/api/applicants`, {
      params: { status },
      
      responseType: 'text' 
    });},

  //  Get single details if needed later
  getOne: async (id) => {
    const response = await adminHttp.get(`/api/applicants/${id}`);
    return response.data;
  },
  //  Update Status
  updateStatus: async (id, status) => {
    // URL: /api/applicants/{id}/status?status=APPROVED
    const response = await adminHttp.patch(`/api/applicants/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },
   // PDF endpoints (open in new tab)
  charPdfUrl: (id) => `http://localhost:8080/api/applicants/${id}/character-certificate`,
  healthPdfUrl: (id) => `http://localhost:8080/api/applicants/${id}/health-certificate`,
  additionalPdfUrl: (applicantId, qualId) =>
    `http://localhost:8080/api/applicants/${applicantId}/additional/${qualId}/file`,
};