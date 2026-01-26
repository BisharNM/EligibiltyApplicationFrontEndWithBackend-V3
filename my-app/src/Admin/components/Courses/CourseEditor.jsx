import React from "react";

export default function CourseEditor({ course, setCourse, onSave, onCancel, saving }) {
  const addSubCourse = () => {
    setCourse(prev => ({
      ...prev,
      subCourses: [
        ...(prev.subCourses || []),
        {
          subCourseId: null,
          subCourseName: "New Sub Course",
          mediumLanguage: "ST",       // your backend uses "ST/STE/T"
          alRules: [],
          olRules: [],
          qualificationCount: null,
          additionalConfigs: []
        }
      ]
    }));
  };

  const updateSubCourse = (index, key, value) => {
    setCourse(prev => {
      const copy = [...(prev.subCourses || [])];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, subCourses: copy };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-lg border flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {course.courseId ? "Edit Course" : "Create Course"}
        </h2>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border space-y-4">
        <div>
          <label className="text-sm font-semibold">Course Name</label>
          <input
            className="w-full border p-2 rounded"
            value={course.courseName || ""}
            onChange={(e) => setCourse(prev => ({ ...prev, courseName: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Max Age</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={course.maxAge ?? ""}
            onChange={(e) => setCourse(prev => ({ ...prev, maxAge: Number(e.target.value) }))}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Sub Courses</h3>
          <button onClick={addSubCourse} className="px-3 py-1 border rounded">
            + Add Sub Course
          </button>
        </div>

        {(course.subCourses || []).map((sc, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500">Sub Course Name</label>
                <input
                  className="w-full border p-2 rounded"
                  value={sc.subCourseName || ""}
                  onChange={(e) => updateSubCourse(idx, "subCourseName", e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500">Medium Language Code</label>
                <input
                  className="w-full border p-2 rounded"
                  placeholder="S / T / E / ST / STE"
                  value={sc.mediumLanguage || ""}
                  onChange={(e) => updateSubCourse(idx, "mediumLanguage", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}