import React from 'react';
import { Info, BookOpen, GraduationCap, FileCheck } from 'lucide-react';

export default function RequirementsCard({course, subCourse }) {
  if (!subCourse) return null;
 const { ageLimit } = course;
  const { qualificationCount, alRules, olRules, additionalConfigs } = subCourse;

  // Filter for Compulsory Subjects (Status = true)
  const compulsoryAL = alRules ? alRules.filter(r => r.status === true) : [];
  const compulsoryOL = olRules ? olRules.filter(r => r.status === true) : [];
  
  // Filter for Additional Docs
  
  const requiredDocs = additionalConfigs || [];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 shadow-sm">
      <div className="flex items-center mb-4 border-b border-blue-200 pb-2">
        <Info className="w-6 h-6 text-blue-700 mr-2" />
        <h3 className="text-lg font-bold text-blue-900">
          Eligibility Requirements for {subCourse.subCourseName}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/*  1. A/L Requirements  */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <GraduationCap className="w-4 h-4 text-purple-600 mr-2" />
            <h4 className="font-bold text-sm uppercase text-gray-700">G.C.E A/L</h4>
          </div>
          <ul className="text-xs text-gray-600 space-y-1 ml-1 list-disc list-inside">
            {/* General Count */}
            {qualificationCount && (
              <li className="font-semibold text-purple-800">
                Must pass {qualificationCount.alSubjectCount || 3} subjects.
              </li>
            )}
            {/* Specific Subjects */}
            {compulsoryAL.length > 0 ? (
              compulsoryAL.map((rule) => (
                <li key={rule.alRuleId}>
                  Must pass <b>{rule.alSubject}</b> ({rule.grade || 'S'})
                </li>
              ))
            ) : (
              <li>Any stream is accepted.</li>
            )}
          </ul>
        </div>

        {/*  2. O/L Requirements  */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <BookOpen className="w-4 h-4 text-green-600 mr-2" />
            <h4 className="font-bold text-sm uppercase text-gray-700">G.C.E O/L</h4>
          </div>
          <ul className="text-xs text-gray-600 space-y-1 ml-1 list-disc list-inside">
             {/* General Count */}
             {qualificationCount && (
              <li className="font-semibold text-green-800">
                {qualificationCount.olSubjectCount || 6} Passes & {qualificationCount.olCreditsNeeded || 3} Credits.
              </li>
            )}
            {/* Specific Subjects */}
            {compulsoryOL.map((rule) => (
              <li key={rule.olRuleId}>
                <b>{rule.olSubject}</b>: {rule.grade === 'C' ? 'Credit (C)' : 'Pass (S)'}
              </li>
            ))}
          </ul>
        </div>
        <li>
                  Maximum Age: <b>{ageLimit || 25} Years</b>
                  <span className="text-xs text-gray-400 ml-1">(as of Jan 1st)</span>
               </li>

        {/*  3. Additional Docs  */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <FileCheck className="w-4 h-4 text-orange-600 mr-2" />
            <h4 className="font-bold text-sm uppercase text-gray-700">Other / Certificates</h4>
          </div>
          {requiredDocs.length > 0 ? (
            <ul className="text-xs text-gray-600 space-y-1 ml-1 list-disc list-inside">
              {requiredDocs.map((config) => (
                <li key={config.configId}>
                  {config.inputLabel}
                  {config.inputType === 'file' && (
                     <span className="text-orange-500 font-bold ml-1">
                       (Upload)
                     </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-400 italic">No additional documents required.</p>
          )}
        </div>

      </div>
    </div>
  );
}