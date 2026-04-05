import React, { useState } from 'react';
import { ArrowLeft, Eye, FileText, CheckCircle, Upload, UploadCloud } from 'lucide-react';

export default function StudentApplicationPreview({ course, onBack }) {
  const [activeSubTab, setActiveSubTab] = useState(
    course.hasSubCourses && course.subCourses.length > 0 ? course.subCourses[0].id : null
  );

  const getCurrentMediums = () => {
    if (course.mediumConfigType === 'GLOBAL' || !course.hasSubCourses) {
      return course.globalMediums;
    }
    const sub = course.subCourses.find(s => s.id === activeSubTab);
    return sub ? sub.mediums : {};
  };

  const getCurrentQuals = () => {
    if (course.qualConfigType === 'GLOBAL' || !course.hasSubCourses) {
      return course.globalQuals;
    }
    const sub = course.subCourses.find(s => s.id === activeSubTab);
    return sub ? sub.additionalQuals : { title: '', fields: [] };
  };

  const currentMediums = getCurrentMediums();
  const currentQuals = getCurrentQuals();

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Preview Header */}
      <div className="flex justify-between items-center mb-6 bg-slate-800 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-3">
          <Eye size={24} className="text-green-400" />
          <div>
            <h2 className="text-lg font-bold">Student View Preview</h2>
            <p className="text-xs text-slate-300">Reviewing: {course.name}</p>
          </div>
        </div>
        <button 
          onClick={onBack} 
          className="bg-white text-slate-900 px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-slate-100 transition"
        >
          <ArrowLeft size={16} /> Back to Editor
        </button>
      </div>

      {/* Student Application Form Preview */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        
        {/* Form Header */}
        <div className="bg-blue-900 text-white p-6 text-center">
          <h1 className="text-2xl font-bold uppercase">Ministry of Education</h1>
          <h2 className="text-lg mt-2 text-blue-200">
            National College of Education Admission - 2025
          </h2>
        </div>

        {/* Course Tabs  */}
        <div className="flex bg-gray-200 border-b border-gray-300">
          <div className="flex-1 py-4 text-center font-bold uppercase bg-white text-blue-900 border-t-4 border-blue-900 shadow-sm z-10 text-sm">
            {course.name}
          </div>
          <div className="flex-1 py-4 text-center font-bold uppercase text-gray-400 border-r border-gray-300 text-xs">
            Science
          </div>
          <div className="flex-1 py-4 text-center font-bold uppercase text-gray-400 border-r border-gray-300 text-xs">
            Arts
          </div>
          <div className="flex-1 py-4 text-center font-bold uppercase text-gray-400 text-xs">
            English
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Sub-Course / Mediums Selection */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            {course.hasSubCourses && (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Select Subject / Stream:
                </label>
                <div className="flex flex-wrap gap-2">
                  {course.subCourses.map(sub => (
                    <button 
                      key={sub.id}
                      onClick={() => setActiveSubTab(sub.id)}
                      className={`px-4 py-1 rounded-full text-xs font-bold border transition ${
                        activeSubTab === sub.id 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Select Medium:
              </label>
              <div className="flex gap-2 flex-wrap">
                {['Sinhala', 'Tamil', 'English'].map(med => {
                  if (!currentMediums[med.toLowerCase()]) return null;
                  return (
                    <button 
                      key={med} 
                      className="px-4 py-1 rounded-full text-xs font-bold border bg-white text-gray-600 border-gray-300 hover:bg-blue-50 transition"
                    >
                      {med} Medium
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="As per NIC" 
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                NIC Number
              </label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="e.g. 2000xxxxxxxxx" 
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date of Birth
              </label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                disabled
              />
            </div>
          </div>

          {/* A/L Results */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5"/> G.C.E A/L Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                <select className="w-full p-2 border rounded-lg" disabled>
                  <option>2023</option>
                  <option>2024</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Z-Score</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-lg" 
                  placeholder="e.g. 1.2500" 
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">A/L Medium</label>
                <select className="w-full p-2 border rounded-lg" disabled>
                  <option>Sinhala</option>
                  <option>Tamil</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          </div>

          {/* O/L Results */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5"/> G.C.E O/L Results
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Maths', 'Science', 'English', 'Sinhala/Tamil', 'Religion', 'History'].map(sub => (
                  <div key={sub}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {sub}
                    </label>
                    <select className="w-full p-2 border rounded-lg" disabled>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>S</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Additional Qualifications */}
          {currentQuals.fields.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5"/> 
                {currentQuals.title || "Additional Qualifications"}
              </h3>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuals.fields.map(field => (
                  <div 
                    key={field.id} 
                    className={field.type === 'radio' || field.type === 'checkbox' ? '' : 'col-span-1 md:col-span-2'}
                  >
                    {/* Text Input */}
                    {field.type === 'text' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-lg focus:ring-2 ring-blue-200 outline-none" 
                          placeholder="Type here..." 
                          disabled
                        />
                      </div>
                    )}

                    {/* File Upload */}
                    {field.type === 'file' && (
                      <div className="border-2 border-dashed border-blue-300 p-4 rounded-lg bg-white text-center hover:bg-blue-50 transition cursor-pointer">
                        <label className="cursor-pointer block">
                          <span className="block text-sm font-semibold text-gray-700 mb-2">
                            {field.label}
                          </span>
                          <UploadCloud className="mx-auto text-gray-400 mb-2" size={32}/>
                          <p className="text-xs text-gray-500">
                            Click to upload {field.allowMultiple ? '(Multiple allowed)' : '(Single file)'}
                          </p>
                          <input type="file" className="hidden" disabled />
                        </label>
                      </div>
                    )}

                    {/* Radio Input */}
                    {field.type === 'radio' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {field.label}
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-sm">
                            <input type="radio" name={`radio_${field.id}`} disabled /> Yes
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="radio" name={`radio_${field.id}`} disabled /> No
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Checkbox Input */}
                    {field.type === 'checkbox' && (
                      <div className="flex items-center gap-2 mt-4 bg-white p-3 rounded border">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 rounded" 
                          disabled
                        />
                        <label className="text-sm font-semibold text-gray-700">
                          {field.label}
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5"/> Certificates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
                <span className="block text-sm font-semibold text-gray-600 mb-2">
                  Character Certificate
                </span>
                <p className="text-xs text-gray-400">Click to upload</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
                <span className="block text-sm font-semibold text-gray-600 mb-2">
                  Health Certificate
                </span>
                <p className="text-xs text-gray-400">Click to upload</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <button 
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition shadow-lg"
              disabled
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}