import React, { useState } from "react";
import { courseApi } from "../../api/courseApi";
import CourseListView from "./CourseListView";
import CourseEditor from "./CourseEditor";

export default function CourseManager({ courses, setCourses }) {
  const [view, setView] = useState("LIST"); // LIST | EDIT
  const [editingCourse, setEditingCourse] = useState(null);
  const [saving, setSaving] = useState(false);

  const refreshCourses = async () => {
    const data = await courseApi.getAll();
    setCourses(data || []);
  };

  const onCreate = () => {
    // match backend fields: courseId, courseName, maxAge, subCourses...
    setEditingCourse({
      courseId: null,
      courseName: "New Course",
      maxAge: 25,
      subCourses: []
    });
    setView("EDIT");
  };

  const onEdit = (course) => {
    // deep clone
    setEditingCourse(JSON.parse(JSON.stringify(course)));
    setView("EDIT");
  };

  const onSave = async () => {
    if (!editingCourse) return;
    try {
      setSaving(true);

      if (editingCourse.courseId) {
        await courseApi.update(editingCourse); // PUT
      } else {
        await courseApi.create(editingCourse); // POST
      }

      await refreshCourses();
      setView("LIST");
      setEditingCourse(null);
    } catch (e) {
      console.error(e);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    setView("LIST");
    setEditingCourse(null);
  };

  if (view === "EDIT") {
    return (
      <CourseEditor
        course={editingCourse}
        setCourse={setEditingCourse}
        onSave={onSave}
        onCancel={onCancel}
        saving={saving}
      />
    );
  }

  return (
    <CourseListView
      courses={courses}
      onCreate={onCreate}
      onEdit={onEdit}
    />
  );
}