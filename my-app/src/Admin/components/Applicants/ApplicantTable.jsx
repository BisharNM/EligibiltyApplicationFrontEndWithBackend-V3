import React, { useState, useEffect } from 'react';
import { Eye, Users, ChevronLeft, ChevronRight,Trash2 } from 'lucide-react';
import StatusBadge from '../Shared/StatusBadge';

export default function ApplicantTable({ applicants, onViewDetails,onDelete  }) {
  //  1. Pagination State 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  //  2. Reset Page On Filter Change 
  // If the user filters data then go back to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [applicants]);

  //  3. Calculation Logic 
  const totalPages = Math.ceil(applicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Get only the items for the current page
  const currentApplicants = applicants.slice(startIndex, endIndex);

 
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b">
            <tr>
              <th className="px-6 py-4">#</th> {/* Added Row Number */}
              <th className="px-6 py-4">App ID</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">NIC</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Sub-Course</th>
              <th className="px-6 py-4">Medium</th>
              <th className="px-6 py-4 text-center">Z-Score</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentApplicants.length > 0 ? (
              currentApplicants.map((app, index) => (
                <tr key={app.id} className="hover:bg-blue-50 transition-colors group">
                  {/* Calculate absolute row number */}
                  <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{app.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{app.fullName}</td>
                  <td className="px-6 py-4 text-sm">{app.nic}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {app.courseName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {app.subCourseName ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {app.subCourseName}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">{app.medium}</td>
                  <td className="px-6 py-4 text-center font-mono text-sm font-bold text-emerald-600">
                    {app.alResults.zScore}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onViewDetails(app.id)} 
                      className="text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-all"
                    >
                      <Eye size={18} />
                    </button>
                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to delete applicant ${app.displayId}? This cannot be undone.`)) {
                            onDelete(app.id);
                          }
                        }}
                        className="text-red-500 bg-red-50 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-all"
                        title="Delete Applicant"
                      >
                        <Trash2 size={18} />
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center">
                    <Users size={48} className="text-gray-300 mb-3" />
                    <p className="font-medium">No applicants found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*  Pagination Controls  */}
      {applicants.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold">{startIndex + 1}</span> to{' '}
            <span className="font-bold">{Math.min(endIndex, applicants.length)}</span> of{' '}
            <span className="font-bold">{applicants.length}</span> applicants
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition bg-white"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition bg-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}