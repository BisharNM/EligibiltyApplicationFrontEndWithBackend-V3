import React, { useState } from 'react';
import { COURSES, INITIAL_FORM_STATE,LANG_SUB_COURSES } from '../../constants';
import { useFormValidation } from '../../hooks/useFormValidation';
import Header from './Header';
import CourseSelector from './CourseSelector';
import MediumSelector from './MediumSelector';
import InfoPopup from './shared/InfoPopup';
import PersonalInfoForm from './PersonalInfoForm';
import ALevelForm from './ALevelForm';
import OLevelForm from './OLevelForm';
import AdditionalQualifications from './AdditionalQualifications';
import DocumentUpload from './DocumentUpload';
import ValidationSummary from './ValidationSummary';

export default function NCOEApplication() {
  const [activeTab, setActiveTab] = useState(COURSES.PRIMARY);
  const [subTab, setSubTab] = useState('Sinhala'); 
  const [specificMedium, setSpecificMedium] = useState('Sinhala');
  const [showReligionPopup, setShowReligionPopup] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const { errors, canApply } = useFormValidation(formData, activeTab, subTab, specificMedium);

  const handleTabSwitch = (course) => {
    setActiveTab(course);
    
    if (course === COURSES.RELIGION) {
      setSubTab('Buddhism'); 
      setShowReligionPopup(true);
    } else if (course === COURSES.ART) {
      setSubTab('Art'); 
      setSpecificMedium('Sinhala'); 
    } else if (course === COURSES.LANGUAGE_LIT) {
      setSubTab(LANG_SUB_COURSES[0]);
    } else if (course === COURSES.ENGLISH) {
      setSubTab('English');
    } else {
      setSubTab('Sinhala'); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(canApply) {
      alert("Application Submitted Successfully! (Simulated)");
      console.log('Form Data:', formData);
    } else {
      alert("Please fix all validation errors before submitting.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans relative">
      
      <InfoPopup 
        show={showReligionPopup}
        onClose={() => setShowReligionPopup(false)}
        title="Eligibility Warning"
        message="You can only apply for the religion you belong to."
      />

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        
        <Header />
        
        <CourseSelector activeTab={activeTab} onTabChange={handleTabSwitch} />

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          <MediumSelector 
            activeTab={activeTab}
            subTab={subTab}
            setSubTab={setSubTab}
            specificMedium={specificMedium}
            setSpecificMedium={setSpecificMedium}
          />

          <PersonalInfoForm 
            formData={formData} 
            onChange={handleInputChange} 
            activeTab={activeTab}
          />

          <ALevelForm 
            formData={formData} 
            onChange={handleInputChange}
            activeTab={activeTab}
            subTab={subTab}
          />

          <OLevelForm 
            formData={formData} 
            onChange={handleInputChange}
            activeTab={activeTab}
            subTab={subTab}
          />

          <AdditionalQualifications 
            activeTab={activeTab}
            subTab={subTab}
            formData={formData}
            onChange={handleInputChange}
          />

          <DocumentUpload onChange={handleInputChange} />

          <div className="mt-8">
            <ValidationSummary errors={errors} canApply={canApply} />
            <button 
              type="submit" 
              disabled={!canApply} 
              className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all
                ${canApply 
                  ? 'bg-blue-900 text-white hover:bg-blue-800 hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Submit Application
            </button>
          </div>

        </form>
      </div>
      
      <style>{`
        .input-field { 
          width: 100%; 
          padding: 0.5rem; 
          border: 1px solid #d1d5db; 
          border-radius: 0.375rem; 
          margin-top: 0.25rem; 
          font-size: 0.875rem; 
        }
        .input-field:focus { 
          outline: none; 
          border-color: #1e3a8a; 
          box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.2); 
        }
        .label-text { 
          font-size: 0.875rem; 
          font-weight: 600; 
          color: #374151; 
        }
        .section-title { 
          font-size: 1.125rem; 
          font-weight: 700; 
          color: #1e3a8a; 
          display: flex; 
          align-items: center; 
        }
      `}</style>
    </div>
  );
}