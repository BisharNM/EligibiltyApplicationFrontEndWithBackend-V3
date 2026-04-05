import React, { useMemo, useState } from "react";
import { Plus, Search, Edit3, Layers, Calendar, X, Trash2 } from "lucide-react";
import DeadlineManager from '../Dashboard/DeadlineManager'; 
import AlYearManager from '../Dashboard/AlYearManager';

function Pill({ children, tone = "gray", className = "" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${tones[tone] || tones.gray} ${className}`}>
      {children}
    </span>
  );
}

export default function CourseListView({ courses = [], onCreate, onEdit, onDelete ,onDeleteAll }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return courses;
    return courses.filter((c) => {
      const name = (c.courseName || "").toLowerCase();
      const id = String(c.courseId ?? "").toLowerCase();
      return name.includes(s) || id.includes(s);
    });
  }, [courses, q]);

  const totalSubCourses = useMemo(() => {
    return (courses || []).reduce((sum, c) => sum + (c.subCourses?.length || 0), 0);
  }, [courses]);

  return (
    <div className="space-y-6">

      {/*  Header Section  */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Course Configuration
            </h2>
            <Pill tone="blue">{courses.length} Courses</Pill>
            <Pill tone="purple">{totalSubCourses} Streams</Pill>
          </div>
          <p className="text-sm text-slate-500">
            Manage intake courses, age limits, and substreams.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search course..."
              className="w-full sm:w-64 pl-10 pr-8 py-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 ring-blue-100 outline-none transition-all"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {courses.length > 0 && onDeleteAll && (
              <button
                onClick={onDeleteAll}
                className="inline-flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl font-bold shadow-sm transition active:scale-95"
                title="Delete All Courses"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Delete All</span>
              </button>
            )}

          {/* Create Button */}
          <button
            onClick={onCreate}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition active:scale-95"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Add Course</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
      <DeadlineManager/>
      <AlYearManager />
     

      {/*  Table Section  */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold text-xs uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 w-5/12">Course Name</th>
                <th className="px-6 py-4 w-2/12">Age Limit</th>
                <th className="px-6 py-4 w-2/12">Structure</th>
                <th className="px-6 py-4 w-3/12 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr
                    key={c.courseId}
                    className="group hover:bg-blue-50/30 transition-colors"
                  >
                    {/* Course Name & ID */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Layers size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate text-base">
                            {c.courseName || "Untitled Course"}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5 group-hover:text-blue-500 transition-colors">
                            #{c.courseId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Max Age */}
                    {/* Max Age */}
                    <td className="px-6 py-4">
                      
                      {(c.ageLimit ?? c.maxAge) != null ? (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Calendar size={14} className="text-slate-400" />
                          {/* Render whichever exists */}
                          {c.ageLimit ?? c.maxAge} Years
                        </div>
                      ) : (
                        <span className="text-sm text-gray-300 italic">No limit</span>
                      )}
                    </td>

                    {/* Sub Courses Count */}
                    <td className="px-6 py-4">
                      {c.subCourses?.length > 0 ? (
                        <Pill tone="purple">{c.subCourses.length} Streams</Pill>
                      ) : (
                        <span className="text-xs font-medium text-gray-400 px-2 py-1 bg-gray-50 rounded">Single</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(c)}
                          className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
                          title="Edit Course"
                        >
                          <Edit3 size={16} />
                        </button>
                         {onDelete && (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation(); 
      
      
      const validId = c.id || c.courseId; 
      
      console.log("Clicking Delete for:", validId); 
      
      onDelete(validId);
    }}
    className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition"
    title="Delete Course"
  >
    <Trash2 size={16} />
  </button>
)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16">
                    <div className="flex flex-col items-center text-center max-w-sm mx-auto">
                      <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-slate-300 mb-4">
                        <Search size={32} />
                      </div>
                      <div className="font-bold text-slate-800 text-lg">
                        No courses found
                      </div>
                      <div className="text-sm text-slate-500 mt-1 mb-6">
                        We couldn't find anything matching "{q}". Try clearing your search filters.
                      </div>
                      <button
                        onClick={() => { setQ(""); onCreate?.(); }}
                        className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition"
                      >
                        Clear Search & Add New
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500 font-medium">
          <div>
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> results
          </div>
          {filtered.length !== courses.length && (
            <div>
              Filtered from {courses.length} total
            </div>
          )}
        </div>
      </div>
    </div>
  );
}