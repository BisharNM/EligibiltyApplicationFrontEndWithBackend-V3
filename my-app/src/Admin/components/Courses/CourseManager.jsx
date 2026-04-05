import React, { useState } from "react";
import { courseApi } from "../../api/courseApi";
import CourseListView from "./CourseListView";
import CourseEditor from "./CourseEditor";

export default function CourseManager({ courses, setCourses }) {
  const [view, setView] = useState("LIST"); 
  const [editingCourse, setEditingCourse] = useState(null);
  const [saving, setSaving] = useState(false);

  const refreshCourses = async () => {
    const data = await courseApi.getAll();
    setCourses(data || []);
  };

   const handleDeleteAllCourses = async () => {
    const confirmMessage = "WARNING: This will delete ALL courses and their sub-courses permanently.\n\nAre you sure you want to proceed?";
    
    if (window.confirm(confirmMessage)) {
      try {
        await courseApi.deleteAll();
        await refreshCourses(); 
        alert("All courses deleted successfully.");
      } catch (error) {
        console.error(error);
        alert("Failed to delete all courses. Ensure no students are linked if DB constraints exist.");
      }
    }
  };
   const handleDeleteCourse = async (id) => {
     console.log("Delete Requested for ID:", id); 
    if (window.confirm("Are you sure you want to delete this course? All associated applications might be affected.")) {
      try {
        await courseApi.delete(id);
        alert("Course deleted successfully.");
        
        // Refresh the list to remove the item from UI
        await refreshCourses(); 
        
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete course. It might be linked to existing students.");
      }
    }
  };


  const onCreate = () => {
    // match backend fields courseId, courseName, maxAge, subCourses
    setEditingCourse({
      courseId: null,
      courseName: "New Course",
      maxAge: 25,
      subCourses: []
    });
    setView("EDIT");
  };

  const onEdit = (course) => {
    
    setEditingCourse(JSON.parse(JSON.stringify(course)));
    setView("EDIT");
  };

  const onSave = async () => {
    if (!editingCourse) return;
    try {
      setSaving(true);

      if (editingCourse.courseId) {
        await courseApi.update(editingCourse); 
      } else {
        await courseApi.create(editingCourse); 
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
       onDelete={handleDeleteCourse}
       onDeleteAll={handleDeleteAllCourses} 
    />
  );
}