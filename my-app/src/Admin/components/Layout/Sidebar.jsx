import React from 'react';
import { LayoutDashboard, BookOpen, Users ,Layers ,Grid} from 'lucide-react';
import SidebarButton from './SidebarButton';

export default function Sidebar({ activeView, onViewChange }) {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <LayoutDashboard size={24} /> Admin Panel
        </h1>
        <p className="text-xs text-slate-400 mt-1">NCOE Admission Portal</p>
      </div>
      
      <nav className="p-4 space-y-2">
        <SidebarButton 
          icon={<LayoutDashboard size={20}/>} 
          label="Dashboard" 
          active={activeView === 'DASHBOARD'} 
          onClick={() => onViewChange('DASHBOARD')}
        />
        <SidebarButton 
          icon={<BookOpen size={20}/>} 
          label="Manage Courses" 
          active={activeView === 'COURSES'} 
          onClick={() => onViewChange('COURSES')}
        />
        <SidebarButton 
          icon={<Users size={20}/>} 
          label="Applicants" 
          active={activeView === 'APPLICANTS'} 
          onClick={() => onViewChange('APPLICANTS')}
        />
        <SidebarButton 
  icon={<Layers size={20}/>} 
  label="A/L Subjects" 
  active={activeView === 'SUBJECTS'} 
  onClick={() => onViewChange('SUBJECTS')}
/>

<SidebarButton 
  icon={<Grid size={20}/>} 
  label="O/L Buckets" 
  active={activeView === 'OL_BUCKETS'} 
  onClick={() => onViewChange('OL_BUCKETS')}
/>
      </nav>
    </aside>
  );
}