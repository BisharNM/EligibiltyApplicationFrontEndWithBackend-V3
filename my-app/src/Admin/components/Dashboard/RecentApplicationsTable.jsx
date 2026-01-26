import React from 'react';
import StatusBadge from '../Shared/StatusBadge';

export default function RecentApplicationsTable({ applicants }) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-800">Recent Applications</h3>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
          <tr>
            <th className="px-6 py-3">App ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Course</th>
            <th className="px-6 py-3">Sub-Course</th>
            <th className="px-6 py-3">Medium</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {applicants.slice(0, 5).map(app => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-6 py-3 font-mono text-xs text-gray-500">{app.id}</td>
              <td className="px-6 py-3 font-medium">{app.fullName}</td>
              <td className="px-6 py-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                  {app.courseCode}
                </span>
              </td>
              <td className="px-6 py-3 text-sm">
                {app.subCourseName ? (
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                    {app.subCourseName}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-3 capitalize text-sm">{app.medium}</td>
              <td className="px-6 py-3">
                <StatusBadge status={app.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}