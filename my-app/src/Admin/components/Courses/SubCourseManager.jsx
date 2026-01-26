import React from 'react';
import { Plus, Trash2, Layers } from 'lucide-react';

export default function SubCourseManager({ subCourses, onAdd, onDelete, onRename }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
        <Layers size={18} /> Sub-Courses
      </h3>
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        {subCourses.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-2">No sub-courses added yet</p>
        ) : (
          subCourses.map(sub => (
            <div key={sub.id} className="flex gap-2">
              <input 
                type="text" 
                value={sub.name} 
                onChange={(e) => onRename(sub.id, e.target.value)}
                className="flex-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Sub-course name"
              />
              <button 
                onClick={() => onDelete(sub.id)} 
                className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                title="Delete sub-course"
              >
                <Trash2 size={16}/>
              </button>
            </div>
          ))
        )}
        <button 
          onClick={onAdd} 
          className="text-sm text-blue-600 font-medium flex items-center gap-1 mt-2 hover:text-blue-700 transition"
        >
          <Plus size={16}/> Add Sub-Course
        </button>
      </div>
    </div>
  );
}