import React, { useState, useMemo } from 'react';
import StatsCards from './StatsCards';
import FilterBar from './FilterBar';
import ApplicantTable from './ApplicantTable';
import ApplicantDetailView from './ApplicantDetailView';

export default function ApplicantManager({ applicants, courses }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  
  // Filter States
  const [filterCourse, setFilterCourse] = useState('ALL');
  const [filterSubCourse, setFilterSubCourse] = useState('ALL');
  const [filterMedium, setFilterMedium] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Get available sub-courses based on selected course
  const availableSubCourses = useMemo(() => {
    if (filterCourse === 'ALL') return [];
    const selectedCourse = courses.find(c => c.code === filterCourse);
    if (selectedCourse && selectedCourse.hasSubCourses) {
      return selectedCourse.subCourses;
    }
    return [];
  }, [filterCourse, courses]);

  // Reset sub-course filter when course changes
  const handleCourseChange = (courseCode) => {
    setFilterCourse(courseCode);
    setFilterSubCourse('ALL'); // Reset sub-course when course changes
  };

  // Filter Logic
  const filteredApplicants = useMemo(() => {
    return applicants.filter(app => {
      const matchCourse = filterCourse === 'ALL' || app.courseCode === filterCourse;
      const matchSubCourse = filterSubCourse === 'ALL' || app.subCourseId === filterSubCourse;
      const matchMedium = filterMedium === 'ALL' || app.medium === filterMedium;
      const matchStatus = filterStatus === 'ALL' || app.status === filterStatus;
      const matchSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.nic.includes(searchQuery) || 
                          app.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCourse && matchSubCourse && matchMedium && matchStatus && matchSearch;
    });
  }, [applicants, filterCourse, filterSubCourse, filterMedium, filterStatus, searchQuery]);

  // Statistics based on current filters
  const stats = useMemo(() => {
    return {
      total: filteredApplicants.length,
      pending: filteredApplicants.filter(a => a.status === 'pending').length,
      approved: filteredApplicants.filter(a => a.status === 'approved').length,
      rejected: filteredApplicants.filter(a => a.status === 'rejected').length
    };
  }, [filteredApplicants]);

  // Clear all filters
  const handleClearAll = () => {
    setFilterCourse('ALL');
    setFilterSubCourse('ALL');
    setFilterMedium('ALL');
    setFilterStatus('ALL');
    setSearchQuery('');
  };

  // Export functionality (placeholder)
  const handleExport = () => {
    console.log('Exporting CSV...', filteredApplicants);
    alert('Export functionality would download CSV here');
  };

  // If viewing applicant details
  if (selectedApplicant) {
    return (
      <ApplicantDetailView 
        applicant={selectedApplicant} 
        onBack={() => setSelectedApplicant(null)} 
      />
    );
  }

  // Main applicant list view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Applicant Management</h2>
          <p className="text-sm text-slate-500">Manage and review student applications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Filters Bar */}
      <FilterBar
        courses={courses}
        filterCourse={filterCourse}
        filterSubCourse={filterSubCourse}
        filterMedium={filterMedium}
        filterStatus={filterStatus}
        searchQuery={searchQuery}
        availableSubCourses={availableSubCourses}
        onCourseChange={handleCourseChange}
        onSubCourseChange={setFilterSubCourse}
        onMediumChange={setFilterMedium}
        onStatusChange={setFilterStatus}
        onSearchChange={setSearchQuery}
        onClearAll={handleClearAll}
        onExport={handleExport}
      />

      {/* Data Table */}
      <ApplicantTable 
        applicants={filteredApplicants}
        onViewDetails={setSelectedApplicant}
      />
    </div>
  );
}