import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormValidation } from '../../hooks/useFormValidation';
import { parseMediums } from '../../utils/helpers';
import DynamicQualForm from './DynamicQualForm';
import RequirementsCard from './RequirementsCard';
import { apiService } from '../../services/apiService'; 

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
 
  const [courses, setCourses] = useState([]);
   const [globalDeadline, setGlobalDeadline] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
   
   const [alOptions, setAlOptions] = useState({
    bucket1: [],
    bucket2: [],
    bucket3: []
  });

  

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!canApply) return alert("Please fix validation errors.");
  if (!window.confirm("Submit Application?")) return;

  setIsSubmitting(true);

  try {
    
    const textQuals = [];
    
    // Process Dynamic Inputs (Text/Radio go into JSON, Files are skipped for now)
    (activeSubCourse?.additionalConfigs || []).forEach((config) => {
      const fieldKey = `dynamic_${config.configId}`;
      const value = formData[fieldKey];

      if (!value) return;

      if (config.inputType === 'text') {
        textQuals.push({
          labelName: config.inputLabel,
          valueType: "TEXT",
          valueText: value
        });
      } else if (config.inputType === 'radio') {
        textQuals.push({
          labelName: config.inputLabel,
          valueType: "BOOLEAN",
          valueBool: value === 'Yes'
        });
      }
      
    });
    console.log(formData.gender);
    console.log(formData.olReligionSubject);

    const applicantPayload = {
      NICNumber: formData.nic,
      fullName: formData.fullName,
      courseName: activeCourse.courseName  , 
      subCourseName: activeSubCourse.subCourseName,
      selectedMedium: selectedMedium,
      DOB: formData.dob,
      isMarried: formData.maritalStatus === 'married',
      ALYear: formData.alYear,
      ZScore: formData.zScore,
      ALMedium: formData.alMedium,
      Gender: formData.gender == 'male'? true : false ,
      
      fritsLanguageAndLiterature: formData.olFirstLang, 
      OLMediumGrade: formData.olLang, 

      ALSubject1: formData.alSubject1,
      ALSubject1Grade: formData.alGrade1,
      ALSubject2: formData.alSubject2,
      ALSubject2Grade: formData.alGrade2,
      ALSubject3: formData.alSubject3,
      ALSubject3Grade: formData.alGrade3,

      OLMedium: formData.olMedium,
      // Mapping O/L Subjects
      Religion: formData.olReligionSubject, 

      ReligionGrade: formData.olReligion, 
      mathematics: formData.olMath,
      science: formData.olScience,
      english: formData.olEnglish,
      history: formData.olHistory,
      
      bucket1: formData.olBucket1Sub,
      bucket1Grade: formData.olBucket1Grade,
      bucket2: formData.olBucket2Sub,
      bucket2Grade: formData.olBucket2Grade,
      bucket3: formData.olBucket3Sub,
      bucket3Grade: formData.olBucket3Grade,

      // Attach the Text/Boolean qualifications directly
      additionalQualifications: textQuals
    };

    //  Creating Applicant
    console.log("Creating Applicant...", applicantPayload);
    const savedApplicant = await apiService.createApplicant(applicantPayload);
    const applicantId = savedApplicant.stuId; 
    console.log("Applicant Created with ID:", applicantId);

    //  Upload Standard Files 
    const uploadPromises = [];
     if (formData.charCert instanceof File && formData.healthCert instanceof File) {
      uploadPromises.push(apiService.uploadCertificates(applicantId, formData.charCert, formData.healthCert));
    }

    if (formData.charCert instanceof File) {
      uploadPromises.push(apiService.uploadCertificate(applicantId, 'character-certificate', formData.charCert));
    }
    if (formData.healthCert instanceof File) {
      uploadPromises.push(apiService.uploadCertificate(applicantId, 'health-certificate', formData.healthCert));
    }
    

    // Upload Dynamic Files 
    (activeSubCourse?.additionalConfigs || []).forEach((config) => {
      if (config.inputType === 'file') {
        const fieldKey = `dynamic_${config.configId}`; 
        
        // Handle File Count logic (if array of files)
        
        const limit = parseInt(config.fileCountLimit || 1);
        for(let i=0; i<limit; i++) {
           const uniqueKey = `${fieldKey}_file_${i}`;
           const file = formData[uniqueKey];
           
           if (file instanceof File) {
             uploadPromises.push(
               apiService.uploadAdditionalFile(applicantId, config.inputLabel, file)
             );
           }
        }
      }
    });

    // Wait for all uploads to finish
    await Promise.all(uploadPromises);

    alert("Application & Files Submitted Successfully!");
    
    
  } catch (error) {
    console.error("Submission Error:", error);
    alert("Failed to submit application. Check console.");
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    const loadData = async () => {
      try {
        

        // 2. Fetch A/L Subjects in parallel
        const [sub1, sub2, sub3] = await Promise.all([
          apiService.getALSubjects1(),
          apiService.getALSubjects2(),
          apiService.getALSubjects3()
        ]);

        setAlOptions({
          bucket1: sub1,
          bucket2: sub2,
          bucket3: sub3
        });

      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    loadData();
  }, []);
 const [olOptions, setOlOptions] = useState({
    bucket1: [],
    bucket2: [],
    bucket3: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        

        // Fetch O/L Buckets in parallel
        const [b1, b2, b3] = await Promise.all([
          apiService.getOLBucket1(),
          apiService.getOLBucket2(),
          apiService.getOLBucket3()
        ]);

        setOlOptions({
          bucket1: b1,
          bucket2: b2,
          bucket3: b3
        });

      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    loadData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  // Selection State
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeSubCourseId, setActiveSubCourseId] = useState(null);
  const [selectedMedium, setSelectedMedium] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    fullName: '', nic: '', dob: '', alYear: '', zScore: '', olFirstLang: '', 
    olLang: '', 
    // ... initialize other fields based on your previous code
  });

  //  1. Load Data From Backend 
 useEffect(() => {
    const loadData = async () => {
      try {
        // Run fetches in parallel
        const [coursesRes, deadlineRes] = await Promise.all([
          axios.get(API_URL),                 // Get Courses
          axios.get(`${API_URL}deadline`)     // Get Deadline
        ]);

        setCourses(coursesRes.data);
        
        // 2. Set Deadline State
        // The backend returns object: { id: 1, closingDate: "2025-11-28" }
        if (deadlineRes.data && deadlineRes.data.closingDate) {
          setGlobalDeadline(deadlineRes.data.closingDate);
        }

        

      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  
  const activeCourse = courses.find(c => c.courseId === activeCourseId);
  const activeSubCourse = activeCourse?.subCourses?.find(sc => sc.subCourseId === activeSubCourseId);

    // Get the configurations specifically for the active Sub-Course
  const dynamicConfigs = activeSubCourse?.additionalConfigs || [];
  
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
        
        <form className="p-6" onSubmit={handleSubmit}>
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
          
          
          
          
          {/* <ALevelForm formData={formData} onChange={handleInputChange} /> */}
          <ALevelForm 
        formData={formData} 
        onChange={handleInputChange} 
        subjects1={alOptions.bucket1}
        subjects2={alOptions.bucket2}
        subjects3={alOptions.bucket3}
    />
          {/* <OLevelForm formData={formData} onChange={handleInputChange} /> */}

           <OLevelForm 
        formData={formData} 
        onChange={handleInputChange} 
        // Pass the database data down
        bucket1={olOptions.bucket1}
        bucket2={olOptions.bucket2}
        bucket3={olOptions.bucket3}
    />
           <DynamicQualForm 
                configs={dynamicConfigs} 
                formData={formData} 
                onChange={handleInputChange} 
             />
          
          <DocumentUpload onChange={handleInputChange} />
          <ValidationSummary errors={errors} canApply={canApply} isSubmitting={isSubmitting} />
          
        </form>
      </div>
    </div>
  );
}