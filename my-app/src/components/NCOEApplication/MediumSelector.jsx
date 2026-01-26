import React from 'react';
import { parseMediums } from '../../utils/helpers';

export default function MediumSelector({ 
  activeCourse, 
  activeSubCourseId, 
  onSubCourseSelect, 
  selectedMedium, 
  onMediumSelect 
}) {
  
  if (!activeCourse || !activeCourse.subCourses) return null;

  // Find the currently active sub-course object
  const activeSubCourse = activeCourse.subCourses.find(sc => sc.subCourseId === activeSubCourseId);
  
  // Get available mediums from the "STE" string (e.g., "ST" -> ['Sinhala', 'Tamil'])
  const availableMediums = activeSubCourse ? parseMediums(activeSubCourse.mediumLanguage) : [];

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
      
      {/* 1. Sub-Course Selection (Only show if there is more than 1 option) */}
      {activeCourse.subCourses.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Select Specialization / Subject:
          </label>
          <div className="flex flex-wrap gap-2">
            {activeCourse.subCourses.map(sub => (
              <button 
                key={sub.subCourseId}
                type="button"
                onClick={() => onSubCourseSelect(sub.subCourseId)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
                  ${activeSubCourseId === sub.subCourseId 
                    ? 'bg-blue-800 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'}`
                }
              >
                {sub.subCourseName}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Medium Selection (Parsed from "STE" string) */}
      {availableMediums.length > 0 && (
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2">
             Select Medium:
           </label>
           <div className="flex gap-2">
             {availableMediums.map(med => (
               <button 
                 key={med} 
                 type="button"
                 onClick={() => onMediumSelect(med)}
                 className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
                   ${selectedMedium === med 
                     ? 'bg-green-600 text-white shadow-md' 
                     : 'bg-white text-gray-600 hover:bg-gray-100'}`
                 }
               >
                 {med} Medium
               </button>
             ))}
           </div>
        </div>
      )}
      
      {/* Helper text if logic fails */}
      {availableMediums.length === 0 && activeSubCourse && (
         <p className="text-xs text-red-500">No medium configuration found for this course.</p>
      )}
    </div>
  );
}