import React from 'react';
import { Eye, Users } from 'lucide-react';
import StatusBadge from '../Shared/StatusBadge';

export default function ApplicantTable({ applicants, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b">
            <tr>
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
            {applicants.length > 0 ? (
              applicants.map((app) => (
                <tr key={app.id} className="hover:bg-blue-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{app.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{app.fullName}</td>
                  <td className="px-6 py-4 text-sm">{app.nic}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {app.courseCode}
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
                      onClick={() => onViewDetails(app)}
                      className="text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center text-gray-400">
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

      {/* Pagination */}
      {applicants.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold">{applicants.length}</span> applicants
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border rounded hover:bg-white disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-white">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}