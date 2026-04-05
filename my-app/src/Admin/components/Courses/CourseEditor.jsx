import React, { useEffect, useState } from 'react';
import { createNewSubCourse } from '../../utils/courseHelpers';
import SubCourseEditor from './SubCourseEditor';
import { referenceApi } from '../../api/referenceApi'; 
import { Save, X, Layers, User, Plus, Info, Settings, LayoutGrid } from 'lucide-react';

export default function CourseEditor({ course, setCourse, onSave, onCancel, saving }) {
  
  // State for reference data
  const [alSubjectList, setAlSubjectList] = useState([]);
  const [olSubjectList, setOlSubjectList] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  // Fetch References on Mount
  useEffect(() => {
    const loadReferences = async () => {
      setLoadingRefs(true);
      try {
        const [al, ol] = await Promise.all([
          referenceApi.getAllAlSubjects(),
          referenceApi.getAllOlSubjects()
        ]);
        setAlSubjectList(al || []);
        setOlSubjectList(ol || []);
      } catch (e) {
        console.error("Failed to load subjects", e);
      } finally {
        setLoadingRefs(false);
      }
    };
    loadReferences();
  }, []);

  // Ensure at least one sub-course exists
  useEffect(() => {
    if (!course.subCourses || course.subCourses.length === 0) {
      const defaultSub = createNewSubCourse(null, course.courseName || "General");
      setCourse(prev => ({ ...prev, subCourses: [defaultSub] }));
    }
  }, []);

  const handleSubChange = (updatedSub, index) => {
    setCourse(prev => {
      const newSubs = [...prev.subCourses];
      newSubs[index] = updatedSub;
      return { ...prev, subCourses: newSubs };
    });
  };

  const addSubCourse = () => {
    const newSub = createNewSubCourse(null, "New Stream");
    setCourse(prev => ({ 
      ...prev, 
      subCourses: [...prev.subCourses, newSub] 
    }));
    setActiveSubIndex(course.subCourses.length);
  };

  const removeSubCourse = (e, index) => {
    e.stopPropagation();
    if (window.confirm("Delete this specialization?")) {
      setCourse(prev => {
        const newSubs = prev.subCourses.filter((_, i) => i !== index);
        return { ...prev, subCourses: newSubs };
      });
      setActiveSubIndex(0);
    }
  };

  const activeSubCourse = course.subCourses && course.subCourses[activeSubIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      
      {/*  HEADER  */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {course.courseId ? 'Edit Course Configuration' : 'Create New Course'}
            </h2>
            <p className="text-sm text-gray-500">Define course details and eligibility requirements.</p>
          </div>
        </div>
        
        <div className="flex gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
          <button 
            onClick={onCancel} 
            className="flex-1 sm:flex-none px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            disabled={saving} 
            className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={18}/>}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/*  Section 1 - General Settings  */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <Layers size={16}/> General Settings
          </h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Course Name</label>
            <input 
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
              value={course.courseName || ""}
              placeholder="e.g. Primary Education"
              onChange={(e) => setCourse({...course, courseName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Age Limit <span className="text-xs font-normal text-gray-400 ml-1">(Max Years)</span>
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="number"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                value={course.ageLimit }
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setCourse({...course, ageLimit: isNaN(val) ? 25 : val});
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Info size={12} /> Default is 25 if not set.
            </p>
          </div>
        </div>
      </div>

      {/*  Section 2 - Stream Configuration  */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <LayoutGrid size={16}/> Stream Configuration
          </h3>
          <button 
            onClick={addSubCourse}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition shadow-sm"
          >
            <Plus size={14} /> Add Stream
          </button>
        </div>

        {/* TABS (Horizontal Scrollable) */}
        <div className="px-4 pt-4 border-b border-gray-200 flex overflow-x-auto gap-2 hide-scrollbar bg-white">
          {course.subCourses?.map((sub, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSubIndex(idx)}
              className={`group relative px-5 py-3 rounded-t-xl text-sm font-bold flex items-center gap-3 transition-all min-w-[160px] justify-center border-t border-x
                ${activeSubIndex === idx 
                  ? 'bg-blue-50 border-blue-200 text-blue-700 z-10 shadow-sm' 
                  : 'bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              <span className="truncate max-w-[120px]">
                {sub.subCourseName || `Stream ${idx + 1}`}
              </span>
              
              {course.subCourses.length > 1 && (
                <span 
                  onClick={(e) => removeSubCourse(e, idx)} 
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 hover:text-red-600 rounded-full transition"
                >
                  <X size={14} />
                </span>
              )}
              
              {activeSubIndex === idx && (
                <div className="absolute bottom-[-1px] left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 bg-blue-50/30 min-h-[400px]">
          {activeSubCourse ? (
            <SubCourseEditor 
              subCourse={activeSubCourse}
              onChange={(updated) => handleSubChange(updated, activeSubIndex)}
              alOptions={alSubjectList}
              olOptions={olSubjectList}
              isLoadingOptions={loadingRefs}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 animate-pulse"></div>
              <p>Loading Configuration...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}