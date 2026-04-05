import axios from 'axios';


const OL_BASE_URL = "http://localhost:8080/olsubejct"; 
const BASE_URL = "http://localhost:8080/api/v1/alsubejct"; 

const BASE_URL1 = "http://localhost:8080/api/applicants";

export const apiService = {
  

  // Fetch O/L Bucket Subjects
  getOLBucket1: async () => {
    const response = await axios.get(`${OL_BASE_URL}/Subject1`);
    return response.data;
  },
  
  getOLBucket2: async () => {
    const response = await axios.get(`${OL_BASE_URL}/Subject2`);
    return response.data;
  },
  
  getOLBucket3: async () => {
    const response = await axios.get(`${OL_BASE_URL}/Subject3`);
    return response.data;
  },

  
  // Fetch A/L Subjects
  getALSubjects1: async () => {
    const response = await axios.get(`${BASE_URL}/Subject1`);
    return response.data;
  },
  
  getALSubjects2: async () => {
    const response = await axios.get(`${BASE_URL}/Subject2`);
    return response.data;
  },
  
  getALSubjects3: async () => {
    const response = await axios.get(`${BASE_URL}/Subject3`);
    return response.data;
  },
   // 1. Create Applicant 
  createApplicant: async (applicantJson) => {
    const response = await axios.post(BASE_URL1, applicantJson);
    return response.data; 
  },

  // 2. Upload BOTH Standard Certificates at once
uploadCertificates: async (applicantId, charFile, healthFile) => {
    const formData = new FormData();
    if (charFile) formData.append('charCert', charFile);
    if (healthFile) formData.append('healthCert', healthFile);
    
    const url = `${BASE_URL1}/${applicantId}/certificates`; // New endpoint
    return axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
   // 2. Upload Standard Certificates
  uploadCertificate: async (applicantId, type, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // type is either 'character-certificate' or 'health-certificate'
    const url = `${BASE_URL1}/${applicantId}/${type}`;
    return axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });},

  // 3. Upload Dynamic Additional File
  uploadAdditionalFile: async (applicantId, labelName, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('labelName', labelName);

    const url = `${BASE_URL1}/${applicantId}/additional/file`;
    return axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

};






 