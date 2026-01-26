import React from "react";

export default function CourseListView({ courses, onCreate, onEdit }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Course Configuration</h2>
          <p className="text-sm text-slate-500">Create/Edit courses from database</p>
        </div>
        <button
          onClick={onCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Add Course
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-500 font-semibold text-sm">
            <tr>
              <th className="px-6 py-4">Course Name</th>
              <th className="px-6 py-4">Max Age</th>
              <th className="px-6 py-4">Sub Courses</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((c) => (
              <tr key={c.courseId} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{c.courseName}</td>
                <td className="px-6 py-4">{c.maxAge ?? "-"}</td>
                <td className="px-6 py-4">
                  {c.subCourses?.length ?? 0}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(c)}
                    className="px-3 py-1 border rounded text-blue-700 hover:bg-blue-50"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td className="px-6 py-6 text-gray-400" colSpan={4}>
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}