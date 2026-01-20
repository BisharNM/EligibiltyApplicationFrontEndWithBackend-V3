import React from 'react';
import { COURSES } from '../../constants';

const CourseSelector = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap bg-gray-200">
      {Object.values(COURSES).map((course) => (
        <button 
          key={course} 
          onClick={() => onTabChange(course)}
          className={`flex-1 py-4 text-xs md:text-sm font-bold uppercase border-r border-gray-300 transition-all
            ${activeTab === course 
              ? 'bg-white text-blue-900 border-t-4 border-t-blue-900' 
              : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          {course}
        </button>
      ))}
    </div>
  );
};

export default CourseSelector;