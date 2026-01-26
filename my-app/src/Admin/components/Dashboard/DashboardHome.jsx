import React from 'react';
import StatsCard from './StatsCard';
import RecentApplicationsTable from './RecentApplicationsTable';

export default function DashboardHome({ applicants, courses }) {
  const pendingCount = applicants.filter(a => a.status === 'pending').length;
  const approvedCount = applicants.filter(a => a.status === 'approved').length;
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Applicants" value={applicants.length} />
        <StatsCard title="Pending Review" value={pendingCount} valueColor="text-orange-600" />
        <StatsCard title="Approved" value={approvedCount} valueColor="text-green-600" />
        <StatsCard title="Active Courses" value={courses.length} valueColor="text-blue-600" />
      </div>
      
      <RecentApplicationsTable applicants={applicants} />
    </div>
  );
}