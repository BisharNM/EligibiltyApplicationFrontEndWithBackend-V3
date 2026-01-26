import React from 'react';
import { Search, ChevronDown, Download } from 'lucide-react';
import FilterTag from './FilterTag';

export default function FilterBar({
  courses,
  filterCourse,
  filterSubCourse,
  filterMedium,
  filterStatus,
  searchQuery,
  availableSubCourses,
  onCourseChange,
  onSubCourseChange,
  onMediumChange,
  onStatusChange,
  onSearchChange,
  onClearAll,
  onExport
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Name, NIC, App ID..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 ring-blue-100 outline-none"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Course Filter */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1">Course</label>
          <select 
            className="w-full px-3 py-2 border rounded-lg appearance-none bg-white pr-8"
            value={filterCourse}
            onChange={(e) => onCourseChange(e.target.value)}
          >
            <option value="ALL">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.code}>{course.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Sub-Course Filter */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1">Sub-Course</label>
          <select 
            className={`w-full px-3 py-2 border rounded-lg appearance-none bg-white pr-8 ${
              availableSubCourses.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
            }`}
            value={filterSubCourse}
            onChange={(e) => onSubCourseChange(e.target.value)}
            disabled={availableSubCourses.length === 0}
          >
            <option value="ALL">
              {availableSubCourses.length === 0 ? 'N/A' : 'All Sub-Courses'}
            </option>
            {availableSubCourses.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Medium Filter */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1">Medium</label>
          <select 
            className="w-full px-3 py-2 border rounded-lg appearance-none bg-white pr-8"
            value={filterMedium}
            onChange={(e) => onMediumChange(e.target.value)}
          >
            <option value="ALL">All Mediums</option>
            <option value="sinhala">Sinhala</option>
            <option value="tamil">Tamil</option>
            <option value="english">English</option>
          </select>
          <ChevronDown className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
          <select 
            className="w-full px-3 py-2 border rounded-lg appearance-none bg-white pr-8"
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Active Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {filterCourse !== 'ALL' && (
            <FilterTag 
              label={`Course: ${courses.find(c => c.code === filterCourse)?.name}`} 
              onRemove={() => onCourseChange('ALL')} 
            />
          )}
          {filterSubCourse !== 'ALL' && (
            <FilterTag 
              label={`Sub: ${availableSubCourses.find(s => s.id === filterSubCourse)?.name}`} 
              onRemove={() => onSubCourseChange('ALL')} 
            />
          )}
          {filterMedium !== 'ALL' && (
            <FilterTag 
              label={`Medium: ${filterMedium}`} 
              onRemove={() => onMediumChange('ALL')} 
            />
          )}
          {filterStatus !== 'ALL' && (
            <FilterTag 
              label={`Status: ${filterStatus}`} 
              onRemove={() => onStatusChange('ALL')} 
            />
          )}
          {searchQuery && (
            <FilterTag 
              label={`Search: "${searchQuery}"`} 
              onRemove={() => onSearchChange('')} 
            />
          )}
        </div>
        
        <div className="flex gap-2 mt-2 md:mt-0">
          <button 
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 border rounded-lg hover:bg-gray-50"
          >
            Clear All
          </button>
          <button 
            onClick={onExport}
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-1.5 rounded-lg hover:bg-slate-700 transition text-sm"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}