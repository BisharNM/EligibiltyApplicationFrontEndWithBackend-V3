import React from 'react';
import { ArrowLeft, XCircle, CheckCircle, CreditCard, Calendar, User, FileText, Upload } from 'lucide-react';
import StatusBadge from '../Shared/StatusBadge';
import ResultCard from './ResultCard';
import FileCard from './FileCard';

export default function ApplicantDetailView({ applicant, onBack }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition"
        >
          <ArrowLeft size={20}/> Back to List
        </button>
        <div className="flex gap-3">
          <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 flex items-center gap-2">
            <XCircle size={18}/> Reject
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center gap-2 shadow-sm">
            <CheckCircle size={18}/> Approve Application
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-gray-200 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {applicant.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{applicant.fullName}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1"><CreditCard size={14}/> {applicant.nic}</span>
                <span className="flex items-center gap-1"><Calendar size={14}/> {applicant.dob}</span>
                <span className="flex items-center gap-1"><User size={14}/> {applicant.gender}</span>
              </div>
              <div className="mt-2">
                <StatusBadge status={applicant.status} />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 uppercase font-bold tracking-wide">Applied Course</div>
            <div className="text-xl font-bold text-blue-700">{applicant.courseCode}</div>
            {applicant.subCourseName && (
              <div className="text-sm text-purple-600 font-medium">{applicant.subCourseName}</div>
            )}
            <div className="text-sm text-gray-600 capitalize">{applicant.medium} Medium</div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FileText size={18} className="text-blue-500"/> G.C.E A/L Results ({applicant.alResults.year})
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600 font-medium">Z-Score</span>
                <span className="text-lg font-bold text-blue-700 bg-white px-3 py-1 rounded shadow-sm">
                  {applicant.alResults.zScore}
                </span>
              </div>
              <ul className="space-y-2">
                {applicant.alResults.subjects.map((sub, idx) => (
                  <li key={idx} className="flex justify-between text-sm border-b border-blue-100 pb-1 last:border-0">
                    <span className="text-gray-700">{sub.name}</span>
                    <span className="font-bold text-slate-800 bg-white w-6 h-6 flex items-center justify-center rounded-full text-xs border border-blue-200">
                      {sub.grade}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FileText size={18} className="text-green-500"/> G.C.E O/L Results
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Mathematics" grade={applicant.olResults.math} />
              <ResultCard label="Science" grade={applicant.olResults.science} />
              <ResultCard label="English" grade={applicant.olResults.english} />
              <ResultCard label="Language" grade={applicant.olResults.lang} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <Upload size={18} className="text-purple-500"/> Uploaded Documents
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <FileCard name="Character Certificate" fileName={applicant.files.charCert} />
              <FileCard name="Health Certificate" fileName={applicant.files.healthCert} />
              {applicant.files.additional && (
                <div className="mt-2">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-2">
                    Additional Qualifications
                  </div>
                  <FileCard name="Special Qualification" fileName={applicant.files.additional} />
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
              <h4 className="font-bold text-sm text-gray-700 mb-2">System Eligibility Check</h4>
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle size={16} /> All Basic Requirements Met
              </div>
              <p className="text-xs text-gray-500 mt-1 pl-6">
                Age limit, Z-Score, and mandatory subjects have been verified by the system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}