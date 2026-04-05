import React, { useState } from 'react'; 
import { 
  ArrowLeft, XCircle, CheckCircle, CreditCard, Calendar, 
  User, FileText, Upload, Download, Check, X, Globe 
} from 'lucide-react';
import { applicantApi } from "../../api/applicantApi";


function StatusBadge({ status }) {
  const styles = {
    APPROVED: "bg-green-100 text-green-700 border-green-200",
    REJECTED: "bg-red-100 text-red-700 border-red-200",
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };
  const activeStyle = styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${activeStyle}`}>
      {status || "PENDING"}
    </span>
  );
}

function ResultCard({ label, grade }) {
  const isPass = ["A", "B", "C", "S"].includes(grade);
  return (
    <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
      <span className="text-sm text-gray-600 font-medium truncate pr-2" title={label}>
        {label || "hihih-"}
      </span>
      <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-md border ${
        isPass ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
      }`}>
        {grade ?? "-"}
      </span>
    </div>
  );
}

function FileCard({ name, type, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer group transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="bg-purple-100 p-2 rounded-lg text-purple-600 group-hover:bg-white group-hover:text-blue-600 transition-colors">
          {type === 'PDF' ? <FileText size={18}/> : <Upload size={18}/>}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{name}</div>
          <div className="text-[10px] text-gray-400 uppercase font-bold">Click to view</div>
        </div>
      </div>
      <div className="text-gray-300 group-hover:text-blue-600 transition-colors">
        <Download size={16} />
      </div>
    </div>
  );
}

//  Main Component 

export default function ApplicantDetailView({ applicant, onBack }) {
  
  
  const [currentStatus, setCurrentStatus] = useState(applicant?.status || "PENDING");
  const [isUpdating, setIsUpdating] = useState(false);

  //  Safety check
  if (!applicant) return null;

  //  Single ID declaration (using stuId from your backend/mapper)
  const id = applicant.id || applicant.stuId; 

  //  Actions 
  const handleStatusChange = async (newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;

    setIsUpdating(true);
    try {
      // Call API
      await applicantApi.updateStatus(id, newStatus);
      
      // Update UI State immediately
      setCurrentStatus(newStatus); 
      
    } catch (error) {
      console.error("Status update failed", error);
      alert("Failed to update status. Check console.");
    } finally {
      setIsUpdating(false);
    }
  };

  const openPdf = (url) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm"
        >
          <ArrowLeft size={18}/> Back
        </button>
        
        <div className="flex gap-3">
          {/* Reject Button */}
          <button 
            onClick={() => handleStatusChange("REJECTED")}
            disabled={isUpdating || currentStatus === "REJECTED"}
            className={`border border-red-200 text-red-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition
              ${currentStatus === "REJECTED" ? "bg-red-50 opacity-50 cursor-not-allowed" : "bg-white hover:bg-red-50"}`}
          >
            <XCircle size={18}/> {currentStatus === "REJECTED" ? "Rejected" : "Reject"}
          </button>

          {/* Approve Button */}
          <button 
            onClick={() => handleStatusChange("APPROVED")}
            disabled={isUpdating || currentStatus === "APPROVED"}
            className={`text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm transition
              ${currentStatus === "APPROVED" ? "bg-green-700 opacity-50 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            <CheckCircle size={18}/> {currentStatus === "APPROVED" ? "Approved" : "Approve"}
          </button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-sm">
              {applicant.fullName?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{applicant.fullName}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                  <CreditCard size={14} className="text-blue-500"/> {applicant.NICNumber}
                </span>
                <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                  <Calendar size={14} className="text-blue-500"/> {applicant.DOB}
                </span>
                <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                  <User size={14} className="text-blue-500"/> {applicant.Gender === true? 'male':'female'} • {applicant.isMarried ? "Married" : "Unmarried"}
                </span>
              </div>
              <div className="mt-3">
                
                <StatusBadge status={currentStatus} />
              </div>
            </div>
          </div>
          
          <div className="text-left md:text-right bg-white p-3 rounded-lg border border-gray-200 shadow-sm w-full md:w-auto">
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Applied Course</div>
            <div className="text-xl font-bold text-blue-700 mt-1">{applicant.courseName}</div>
            {applicant.subCourseName && (
              <div className="text-sm text-purple-600 font-medium">{applicant.subCourseName}</div>
            )}
            <div className="text-xs text-gray-500 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">
              Course Medium: {applicant.selectedMedium}
            </div>
          </div>
        </div>

        {/* 3. Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Results */}
          <div className="space-y-8">
            
            {/* A/L Section */}
            <div>
              <h3 className="text-base font-bold text-gray-800 border-b pb-2 flex items-center gap-2 mb-4">
                <FileText size={18} className="text-blue-500"/> G.C.E A/L Results <span className="text-gray-400 font-normal text-sm">({applicant.alResults?.year})</span>
              </h3>
              
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-blue-800 font-bold uppercase tracking-wide block mb-1">Z-Score</span>
                  <span className="text-xl font-bold text-blue-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-blue-100 inline-block">
                    {applicant.ZScore|| "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-blue-800 font-bold uppercase tracking-wide block mb-1">A/L Medium</span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-blue-100">
                    <Globe size={14} className="text-blue-400"/>
                    {applicant.ALMedium || "Sinhala"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
               
                <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
      <span className="text-sm text-gray-600 font-medium truncate pr-2" title={applicant.ALSubject1}>
        {applicant.ALSubject1 }
      </span>
      <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-md border ${
        applicant.ALSubject1Grade ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
      }`}>
        {applicant.ALSubject1Grade ?? "-"}
      </span>
    </div>
    <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
      <span className="text-sm text-gray-600 font-medium truncate pr-2" title={applicant.ALSubject2}>
        {applicant.ALSubject2 }
      </span>
      <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-md border ${
        applicant.ALSubject2Grade ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
      }`}>
        {applicant.ALSubject2Grade ?? "-"}
      </span>
    </div>
    <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
      <span className="text-sm text-gray-600 font-medium truncate pr-2" title={applicant.ALSubject3}>
        {applicant.ALSubject3 }
      </span>
      <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-md border ${
        applicant.ALSubject3Grade ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
      }`}>
        {applicant.ALSubject3Grade ?? "-"}
      </span>
    </div>
              </div>
            </div>

            {/* O/L Section */}
            <div>
              <h3 className="text-base font-bold text-gray-800 border-b pb-2 flex items-center gap-2 mb-4">
                <FileText size={18} className="text-green-500"/> G.C.E O/L Results
              </h3>

              <div className="bg-green-50/50 p-3 rounded-lg border border-green-100 mb-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-green-800">O/L Medium:</span>
                    <span className="font-bold text-slate-700">{applicant.olResults?.medium || "Sinhala"}</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ResultCard label="First Language" grade={applicant.OLMediumGrade} />
                <ResultCard label="Mathematics" grade={applicant.mathematics} />
                <ResultCard label="Science" grade={applicant.science} />
                <ResultCard label="English" grade={applicant.english} />
                <ResultCard label="History" grade={applicant.history} />
                <ResultCard label={applicant.Religion} grade={applicant.ReligionGrade} />
                <ResultCard label={applicant.bucket1} grade={applicant.bucket1Grade} />
                 <ResultCard label={applicant.bucket2} grade={applicant.bucket2Grade} />
                  <ResultCard label={applicant.bucket3} grade={applicant.bucket3Grade} />
                
                {/* Bucket Subjects (Handle dynamically if mapped) */}
                {applicant.olResults?.bucket1 && <ResultCard label={applicant.olResults.bucket1} grade={applicant.olResults.bucket1Grade} />}
              </div>
            </div>
          </div>

          {/* Right Column: Documents & Extras */}
          <div className="space-y-8">
            
            {/* Documents */}
            <div>
              <h3 className="text-base font-bold text-gray-800 border-b pb-2 flex items-center gap-2 mb-4">
                <Upload size={18} className="text-purple-500"/> Uploaded Documents
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <FileCard 
                  name="Character Certificate" 
                  type="PDF" 
                  onClick={() => openPdf(applicantApi.charPdfUrl(id))} 
                />
                <FileCard 
                  name="Health Certificate" 
                  type="PDF" 
                  onClick={() => openPdf(applicantApi.healthPdfUrl(id))} 
                />
              </div>
            </div>

            {/* Additional Qualifications */}
            <div>
              <h3 className="text-base font-bold text-gray-800 border-b pb-2 flex items-center gap-2 mb-4">
                <CheckCircle size={18} className="text-orange-500"/> Additional Qualifications
              </h3>
              
              {(!applicant.additionalQualifications || applicant.additionalQualifications.length === 0) ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-sm text-gray-500 italic">
                  No additional qualifications provided.
                </div>
              ) : (
                <div className="space-y-3">
                  {applicant.additionalQualifications.map((q) => (
                    <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-sm text-gray-800">{q.labelName}</span>
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase">{q.valueType}</span>
                      </div>

                      {q.valueType === "TEXT" && (
                        <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">{q.valueText || "-"}</div>
                      )}

                      {q.valueType === "BOOLEAN" && (
                        <div className={`flex items-center gap-2 text-sm font-bold ${q.valueBool ? 'text-green-600' : 'text-red-500'}`}>
                          {q.valueBool ? <Check size={16}/> : <X size={16}/>}
                          {q.valueBool ? "Yes" : "No"}
                        </div>
                      )}

                      {q.valueType === "FILE" && (
                        <button
                          onClick={() => openPdf(applicantApi.additionalPdfUrl(id, q.id))}
                          className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                        >
                          <Download size={14} /> Download Attachment
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* System Check */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm text-green-800 mb-1">System Eligibility Check</h4>
              <p className="text-xs text-green-700">
                Age limit, Z-Score, and mandatory subjects appear to meet requirements based on automated rules.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}