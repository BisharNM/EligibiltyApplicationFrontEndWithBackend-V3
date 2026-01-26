import React from 'react';

export default function CourseSelector({ courses, activeId, onSelect }) {
  return (
    <div className="flex flex-wrap bg-gray-200">
      {courses.map((course) => (
        <button 
          key={course.courseId} 
          onClick={() => onSelect(course.courseId)}
          type="button"
          className={`flex-1 py-4 text-xs md:text-sm font-bold uppercase border-r border-gray-300 transition-colors
            ${activeId === course.courseId 
              ? 'bg-white text-blue-900 border-t-4 border-t-blue-900 shadow-sm' 
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          {course.courseName}
        </button>
      ))}
    </div>
  );
}