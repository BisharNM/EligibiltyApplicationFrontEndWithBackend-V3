import React, { useEffect, useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import DashboardHome from "./components/Dashboard/DashboardHome";
import ApplicantManager from "./components/Applicants/ApplicantManager";
import CourseManager from "./components/Courses/CourseManager";

import { courseApi } from "./api/courseApi";
import { generateMockApplicants } from "./utils/mockDataGenerator";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [mainView, setMainView] = useState("DASHBOARD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await courseApi.getAll();
        if (!alive) return;

        setCourses(data || []);
        // optional until you connect real applications
        setApplicants(generateMockApplicants(data || []));
      } catch (e) {
        console.error(e);
        alert("Failed to load courses from backend.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, []);

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
      </main>
    </div>
  );
}