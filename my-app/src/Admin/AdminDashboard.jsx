import React, { useEffect, useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import DashboardHome from "./components/Dashboard/DashboardHome";
import ApplicantManager from "./components/Applicants/ApplicantManager";
import CourseManager from "./components/Courses/CourseManager";
import { applicantApi } from './api/applicantApi';
import { courseApi } from "./api/courseApi";
import { generateMockApplicants } from "./utils/mockDataGenerator";
import {  mapBackendApplicantToFrontend } from './utils/dataMappers';
import SubjectConfigManager from './components/Subjects/SubjectConfigManager';
import OLBucketConfigManager from './components/Subjects/OLBucketConfigManager';


export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [mainView, setMainView] = useState("DASHBOARD");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Courses & Applicants in Parallel
      const [coursesData, applicantsData] = await Promise.all([
        courseApi.getAll(),
        applicantApi.getAll()
      ]);

      // 2. Map Courses
      //const formattedCourses = coursesData.map(mapBackendApplicantToFrontend);
      setCourses(coursesData);

      // 3. Map Applicants 
      if (Array.isArray(applicantsData)) {
        const formattedApplicants = applicantsData.map(mapBackendApplicantToFrontend);
        setApplicants(formattedApplicants);
      }

    } catch (error) {
      console.error("Failed to load admin data", error);
    } finally {
      setLoading(false);
    }
    
  };




  if (loading) return <div className="p-8">Loading admin...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-slate-800">
      <Sidebar activeView={mainView} onViewChange={setMainView} />

      <main className="flex-1 p-8 overflow-y-auto">
        {mainView === "DASHBOARD" && (
          <DashboardHome applicants={applicants} courses={courses} />
        )}

        {mainView === "COURSES" && (
          <CourseManager courses={courses} setCourses={setCourses} />
        )}

        {mainView === "APPLICANTS" && (
          <ApplicantManager applicants={applicants} courses={courses} />
        )}
        
        {mainView === 'SUBJECTS' && (
          <SubjectConfigManager />
        )}

        {mainView === 'OL_BUCKETS' && (
          <OLBucketConfigManager />
        )}
      </main>
    </div>
  );
}