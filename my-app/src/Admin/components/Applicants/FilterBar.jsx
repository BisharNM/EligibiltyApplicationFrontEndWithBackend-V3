import React, { useMemo } from 'react';
import { Search, ChevronDown, Download, X, Filter, ArrowUpDown } from 'lucide-react';

// Sub-component for individual Filter Tags
const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-semibold shadow-sm animate-in fade-in zoom-in duration-200">
    {label}
    <button 
      onClick={onRemove} 
      className="hover:bg-blue-200 rounded-full p-0.5 text-blue-600 transition-colors"
    >
      <X size={12} />
    </button>
  </span>
);

export default function FilterBar({
  courses = [],
  filterCourse,
  filterSubCourse,
  filterMedium,
  filterStatus,
  searchQuery,
  availableSubCourses = [],
  onCourseChange,
  onSubCourseChange,
  onMediumChange,
  onStatusChange,
  onSearchChange,
  onClearAll,
  onExport,
  sortZ = "NONE",
  onSortZChange
}) {

  //  Unique Logic 
  const uniqueCourses = useMemo(() => {
    return [...new Map(courses.map(item => [item.courseName, item])).values()];
  }, [courses]);

  const uniqueSubCourses = useMemo(() => {
    return [...new Map(availableSubCourses.map(item => [item.subCourseName, item])).values()];
  }, [availableSubCourses]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Header / Title */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Filter className="w-4 h-4 text-blue-500" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Filter & Sort</span>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Top Row: Search + Sort */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Search Bar (Spans 3 cols on large screens) */}
          <div className="lg:col-span-3 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by Applicant Name, NIC, or ID..." 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Sort Z-Score */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none cursor-pointer transition-all text-sm font-medium text-gray-700"
              value={sortZ}
              onChange={(e) => onSortZChange(e.target.value)}
            >
              <option value="NONE">Sort Z-Score</option>
              <option value="DESC">Highest First</option>
              <option value="ASC">Lowest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Course Filter */}
          <div className="relative group">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Course</label>
            <div className="relative">
              <select 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg appearance-none bg-gray-50/50 hover:bg-white focus:bg-white pr-8 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all cursor-pointer"
                value={filterCourse} 
                onChange={(e) => onCourseChange(e.target.value)}
              >
                <option value="ALL">All Courses</option>
                {uniqueCourses.map(c => (
                  <option key={c.courseId} value={c.courseName}>{c.courseName}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600" size={16} />
            </div>
          </div>

          {/* Sub-Course Filter */}
          <div className="relative group">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Sub-Course</label>
            <div className="relative">
              <select
                className={`w-full px-3 py-2 border border-gray-200 rounded-lg appearance-none pr-8 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all ${
                  availableSubCourses.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50/50 hover:bg-white cursor-pointer'
                }`}
                value={filterSubCourse}
                onChange={(e) => onSubCourseChange(e.target.value)}
                disabled={availableSubCourses.length === 0}
              >
                <option value="ALL">
                  {availableSubCourses.length === 0 ? 'N/A' : 'All Sub-Courses'}
                </option>
                {uniqueSubCourses.map(sc => (
                  <option key={sc.subCourseId} value={sc.subCourseName}>{sc.subCourseName}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Medium Filter */}
          <div className="relative group">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Medium</label>
            <div className="relative">
              <select 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg appearance-none bg-gray-50/50 hover:bg-white focus:bg-white pr-8 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all cursor-pointer"
                value={filterMedium} 
                onChange={(e) => onMediumChange(e.target.value)}
              >
                <option value="ALL">All Mediums</option>
                <option value="sinhala">Sinhala</option>
                <option value="tamil">Tamil</option>
                <option value="english">English</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600" size={16} />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative group">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Status</label>
            <div className="relative">
              <select 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg appearance-none bg-gray-50/50 hover:bg-white focus:bg-white pr-8 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all cursor-pointer"
                value={filterStatus}
                onChange={(e) => onStatusChange(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600" size={16} />
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-4">
          
          {/* Active Tags */}
          <div className="flex flex-wrap gap-2 flex-1">
            {filterCourse !== 'ALL' && <FilterTag label={`Course: ${filterCourse}`} onRemove={() => onCourseChange('ALL')} />}
            {filterSubCourse !== 'ALL' && <FilterTag label={`Sub: ${filterSubCourse}`} onRemove={() => onSubCourseChange('ALL')} />}
            {filterMedium !== 'ALL' && <FilterTag label={`Medium: ${filterMedium}`} onRemove={() => onMediumChange('ALL')} />}
            {filterStatus !== 'ALL' && <FilterTag label={`Status: ${filterStatus}`} onRemove={() => onStatusChange('ALL')} />}
            {searchQuery && <FilterTag label={`Search: "${searchQuery}"`} onRemove={() => onSearchChange('')} />}
            {sortZ !== 'NONE' && <FilterTag label={`Sort: ${sortZ === 'DESC' ? 'High Z' : 'Low Z'}`} onRemove={() => onSortZChange('NONE')} />}
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={onClearAll}
              className="flex-1 md:flex-none text-sm font-medium text-gray-500 hover:text-red-600 px-4 py-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-100 transition-colors"
            >
              Reset Filters
            </button>
            <button 
              onClick={onExport}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-700 active:scale-95 transition-all text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Download size={16} /> Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}