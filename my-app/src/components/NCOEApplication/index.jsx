import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormValidation } from '../../hooks/useFormValidation';
import { parseMediums } from '../../utils/helpers';
import DynamicQualForm from './DynamicQualForm';
import RequirementsCard from './RequirementsCard';

// Components
import Header from './Header';
import CourseSelector from './CourseSelector';
import MediumSelector from './MediumSelector';
import PersonalInfoForm from './PersonalInfoForm';
import ALevelForm from './ALevelForm';
import OLevelForm from './OLevelForm';
import DocumentUpload from './DocumentUpload';
import ValidationSummary from './ValidationSummary';

// Backend URL
const API_URL = "http://localhost:8080/Courses/";

export default function NCOEApplication() {
  // --- STATE ---
  const [courses, setCourses] = useState([]);
   const [globalDeadline, setGlobalDeadline] = useState(null); 

  const [isLoading, setIsLoading] = useState(true);

  // Selection State
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeSubCourseId, setActiveSubCourseId] = useState(null);
  const [selectedMedium, setSelectedMedium] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    fullName: '', nic: '', dob: '', alYear: '', zScore: '',
    // ... initialize other fields based on your previous code
  });

  // --- 1. LOAD DATA FROM BACKEND ---
 useEffect(() => {
    const loadData = async () => {
      try {
        // Run fetches in parallel
        const [coursesRes, deadlineRes] = await Promise.all([
          axios.get(API_URL),                 // Get Courses
          axios.get(`${API_URL}deadline`)     // Get Deadline
        ]);

        setCourses(coursesRes.data);
        
        // 2. SET DEADLINE STATE
        // The backend returns object: { id: 1, closingDate: "2025-11-28" }
        if (deadlineRes.data && deadlineRes.data.closingDate) {
          setGlobalDeadline(deadlineRes.data.closingDate);
        }

        // ... existing default selection logic ...

      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // --- HELPERS ---
  const activeCourse = courses.find(c => c.courseId === activeCourseId);
  const activeSubCourse = activeCourse?.subCourses?.find(sc => sc.subCourseId === activeSubCourseId);

    // Get the configurations specifically for the active Sub-Course
  const dynamicConfigs = activeSubCourse?.additionalConfigs || [];
  // --- HANDLERS ---
  const handleCourseSwitch = (courseId) => {
    setActiveCourseId(courseId);
    
    // Auto-select first sub-course of the new course
    const newCourse = courses.find(c => c.courseId === courseId);
    if (newCourse?.subCourses?.length > 0) {
      const firstSub = newCourse.subCourses[0];
      setActiveSubCourseId(firstSub.subCourseId);
      
      // Reset Medium
      const meds = parseMediums(firstSub.mediumLanguage);
      setSelectedMedium(meds[0] || '');
    } else {
      setActiveSubCourseId(null);
    }
  };
  

  const handleSubCourseSwitch = (subId) => {
    setActiveSubCourseId(subId);
    // When sub-course changes, reset medium to the first available one
    const sub = activeCourse.subCourses.find(sc => sc.subCourseId === subId);
    const meds = parseMediums(sub?.mediumLanguage);
    setSelectedMedium(meds[0] || '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  // Logic to determine form validation (Update hook to accept activeSubCourse objects)
  const { errors, canApply } = useFormValidation(formData, activeSubCourse,activeCourse,globalDeadline,selectedMedium);

  if (isLoading) return <div className="text-center p-10">Loading Courses...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <Header />
        
        {/* 1. Dynamic Course Tabs */}
        <CourseSelector 
          courses={courses} 
          activeId={activeCourseId} 
          onSelect={handleCourseSwitch} 
        />
        
        <form className="p-6">
          {/* 2. SubCourse & Medium Selector (Handles "STE" parsing) */}
          <MediumSelector 
            activeCourse={activeCourse}
            activeSubCourseId={activeSubCourseId}
            onSubCourseSelect={handleSubCourseSwitch}
            selectedMedium={selectedMedium}
            onMediumSelect={setSelectedMedium}
          />
          {activeSubCourse && (
             <RequirementsCard course={activeCourse} subCourse={activeSubCourse} globalDeadline={globalDeadline} />
          )}
          
          <PersonalInfoForm formData={formData} onChange={handleInputChange} />
          
          
          
          {/* Pass activeSubCourse to forms so they can check specific Rules */}
          <ALevelForm formData={formData} onChange={handleInputChange} />
          <OLevelForm formData={formData} onChange={handleInputChange} />
           <DynamicQualForm 
                configs={dynamicConfigs} 
                formData={formData} 
                onChange={handleInputChange} 
             />
          
          <DocumentUpload onChange={handleInputChange} />
          <ValidationSummary errors={errors} canApply={canApply} />
          
        </form>
      </div>
    </div>
  );
}