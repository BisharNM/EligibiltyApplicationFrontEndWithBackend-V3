import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, Plus, Trash2, Edit, Save, 
  X, FileText, CheckSquare, Circle, Type, UploadCloud, 
  Lock, Settings, Layers, Eye, ArrowLeft, Calendar, User, Info,
  CheckCircle, Upload, Filter, Search, Download, XCircle, CreditCard,
  ChevronDown
} from 'lucide-react';

// ==========================================
// HELPER: Initial Empty Structure for a Sub-Course
// ==========================================
const createNewSubCourse = (id) => ({
  id,
  name: 'New Sub-Course',
  mediums: { sinhala: true, tamil: true, english: false },
  additionalQuals: {
    title: "Additional Qualifications",
    fields: []
  }
});

// ==========================================
// MOCK DATA: COURSES
// ==========================================
const INITIAL_COURSES = [
  {
    id: 1,
    name: "Religion",
    code: "RELIGION",
    hasSubCourses: true,
    mediumConfigType: 'PER_SUB_COURSE',
    qualConfigType: 'PER_SUB_COURSE',
    globalMediums: { sinhala: true, tamil: true, english: true },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: [
      { 
        id: 's1', name: 'Buddhism', 
        mediums: { sinhala: true, tamil: false, english: false },
        additionalQuals: { title: "Additional Qualifications (Buddhism)", fields: [{ id: 1, type: 'radio', label: "Passed Bauddha Dharmacharya?", options: ["Yes", "No"], allowMultiple: false }] }
      },
      { 
        id: 's2', name: 'Islam', 
        mediums: { sinhala: true, tamil: true, english: false },
        additionalQuals: { title: "Additional Qualifications (Islam)", fields: [{ id: 2, type: 'file', label: "Moulavi Certificate", allowMultiple: false }] }
      },
      { 
        id: 's3', name: 'Hinduism', 
        mediums: { sinhala: false, tamil: true, english: false },
        additionalQuals: { title: "Additional Qualifications (Hinduism)", fields: [] }
      },
      { 
        id: 's4', name: 'Christianity', 
        mediums: { sinhala: true, tamil: true, english: true },
        additionalQuals: { title: "Additional Qualifications (Christianity)", fields: [] }
      }
    ]
  },
  {
    id: 2,
    name: "Primary Education",
    code: "PRIMARY",
    hasSubCourses: false,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: true, english: false },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: []
  },
  {
    id: 3,
    name: "Science",
    code: "SCIENCE",
    hasSubCourses: true,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: true, english: true },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: [
      { id: 'sci1', name: 'Biology', mediums: { sinhala: true, tamil: true, english: true }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'sci2', name: 'Physics', mediums: { sinhala: true, tamil: true, english: true }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'sci3', name: 'Chemistry', mediums: { sinhala: true, tamil: true, english: true }, additionalQuals: { title: "Additional Qualifications", fields: [] } }
    ]
  },
  {
    id: 4,
    name: "Mathematics",
    code: "MATHS",
    hasSubCourses: false,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: true, english: true },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: []
  },
  {
    id: 5,
    name: "Art",
    code: "ART",
    hasSubCourses: true,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: false, english: false },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: [
      { id: 'art1', name: 'Visual Arts', mediums: { sinhala: true, tamil: false, english: false }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'art2', name: 'Music', mediums: { sinhala: true, tamil: false, english: false }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'art3', name: 'Dance', mediums: { sinhala: true, tamil: false, english: false }, additionalQuals: { title: "Additional Qualifications", fields: [] } }
    ]
  }
];

// ==========================================
// MOCK DATA: APPLICANTS GENERATOR
// ==========================================
const generateMockApplicants = (courses) => {
  const apps = [];
  const mediums = ['sinhala', 'tamil', 'english'];
  
  // Helper to get random sub-course from a course
  const getRandomSubCourse = (course) => {
    if (course.hasSubCourses && course.subCourses.length > 0) {
      const randomSub = course.subCourses[Math.floor(Math.random() * course.subCourses.length)];
      return { id: randomSub.id, name: randomSub.name };
    }
    return { id: null, name: null };
  };

  for(let i = 1; i <= 50; i++) {
    const course = courses[Math.floor(Math.random() * courses.length)];
    const subCourse = getRandomSubCourse(course);
    
    apps.push({
      id: `APP-${2025000 + i}`,
      fullName: `Student Name ${i}`,
      nic: `${2000 + i}4567890`,
      dob: `200${i % 5}-0${(i % 9) + 1}-${10 + (i % 15)}`,
      gender: i % 2 === 0 ? 'Female' : 'Male',
      address: `No. ${i}, Temple Road, Colombo`,
      courseCode: course.code,
      courseName: course.name,
      subCourseId: subCourse.id,
      subCourseName: subCourse.name,
      medium: mediums[Math.floor(Math.random() * mediums.length)],
      alResults: { 
        year: i % 2 === 0 ? '2023' : '2024', 
        zScore: (1.2 + (i/100)).toFixed(4), 
        subjects: [
          { name: 'Subject 1', grade: ['A', 'B', 'C'][i % 3] }, 
          { name: 'Subject 2', grade: ['A', 'B', 'C'][(i + 1) % 3] }, 
          { name: 'Subject 3', grade: ['A', 'B', 'C'][(i + 2) % 3] }
        ]
      },
      olResults: { 
        math: ['A', 'B', 'C'][i % 3], 
        science: ['A', 'B', 'C'][(i + 1) % 3], 
        english: ['A', 'B', 'C', 'S'][i % 4], 
        lang: 'A' 
      },
      files: {
        charCert: 'character_cert.pdf',
        healthCert: 'health_cert.jpg',
        additional: course.code === 'RELIGION' ? 'dharmacharya.pdf' : null
      },
      status: ['pending', 'approved', 'rejected'][i % 3],
      appliedDate: `2025-01-${10 + (i % 15)}`
    });
  }
  return apps;
};

// ==========================================
// MAIN ADMIN DASHBOARD COMPONENT
// ==========================================
export default function AdminDashboard() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [applicants] = useState(() => generateMockApplicants(INITIAL_COURSES));
  
  const [mainView, setMainView] = useState('DASHBOARD');
  const [courseView, setCourseView] = useState('LIST');
  const [editingCourse, setEditingCourse] = useState(null);

  // Course Handlers
  const handleCreateCourse = () => {
    setEditingCourse({
      id: Date.now(),
      name: "New Course",
      code: "NEW_COURSE",
      hasSubCourses: false,
      mediumConfigType: 'GLOBAL',
      qualConfigType: 'GLOBAL',
      globalMediums: { sinhala: true, tamil: true, english: true },
      globalQuals: { title: "Additional Qualifications", fields: [] },
      subCourses: []
    });
    setCourseView('EDIT');
  };

  const handleEditCourse = (course) => {
    setEditingCourse(JSON.parse(JSON.stringify(course)));
    setCourseView('EDIT');
  };

  const handleSaveCourse = () => {
    const idx = courses.findIndex(c => c.id === editingCourse.id);
    const updated = [...courses];
    if (idx > -1) updated[idx] = editingCourse;
    else updated.push(editingCourse);
    setCourses(updated);
    setCourseView('LIST');
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const renderCourseContent = () => {
    if (courseView === 'LIST') {
      return (
        <CourseListView 
          courses={courses} 
          onEdit={handleEditCourse} 
          onCreate={handleCreateCourse} 
          onDelete={handleDeleteCourse}
        />
      );
    }
    if (courseView === 'EDIT') {
      return (
        <CourseEditor 
          course={editingCourse} 
          setCourse={setEditingCourse} 
          onSave={handleSaveCourse} 
          onCancel={() => setCourseView('LIST')}
          onPreview={() => setCourseView('PREVIEW')} 
        />
      );
    }
    if (courseView === 'PREVIEW') {
      return (
        <StudentApplicationPreview 
          course={editingCourse} 
          onBack={() => setCourseView('EDIT')} 
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 min-h-screen">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard size={24} /> Admin Panel
          </h1>
          <p className="text-xs text-slate-400 mt-1">NCOE Admission Portal</p>
        </div>
        <nav className="p-4 space-y-2">
          <SidebarBtn 
            icon={<LayoutDashboard size={20}/>} 
            label="Dashboard" 
            active={mainView === 'DASHBOARD'} 
            onClick={() => setMainView('DASHBOARD')}
          />
          <SidebarBtn 
            icon={<BookOpen size={20}/>} 
            label="Manage Courses" 
            active={mainView === 'COURSES'} 
            onClick={() => { setMainView('COURSES'); setCourseView('LIST'); }}
          />
          <SidebarBtn 
            icon={<Users size={20}/>} 
            label="Applicants" 
            active={mainView === 'APPLICANTS'} 
            onClick={() => setMainView('APPLICANTS')}
          />
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        {mainView === 'DASHBOARD' && <DashboardHome applicants={applicants} courses={courses} />}
        {mainView === 'COURSES' && renderCourseContent()}
        {mainView === 'APPLICANTS' && <ApplicantManager applicants={applicants} courses={courses} />}
      </main>
    </div>
  );
}

// ==========================================
// SIDEBAR BUTTON COMPONENT
// ==========================================
const SidebarBtn = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-300'}`}
  >
    {icon} <span>{label}</span>
  </button>
);

// ==========================================
// DASHBOARD HOME VIEW
// ==========================================
const DashboardHome = ({ applicants, courses }) => {
  const pendingCount = applicants.filter(a => a.status === 'pending').length;
  const approvedCount = applicants.filter(a => a.status === 'approved').length;
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Total Applicants</h3>
          <p className="text-4xl font-bold text-slate-800 mt-2">{applicants.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Pending Review</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">{pendingCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Approved</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">{approvedCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Active Courses</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{courses.length}</p>
        </div>
      </div>
      
      {/* Recent Applicants */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Recent Applications</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
            <tr>
              <th className="px-6 py-3">App ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Sub-Course</th>
              <th className="px-6 py-3">Medium</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applicants.slice(0, 5).map(app => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-mono text-xs text-gray-500">{app.id}</td>
                <td className="px-6 py-3 font-medium">{app.fullName}</td>
                <td className="px-6 py-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{app.courseCode}</span>
                </td>
                <td className="px-6 py-3 text-sm">
                  {app.subCourseName ? (
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">{app.subCourseName}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-3 capitalize text-sm">{app.medium}</td>
                <td className="px-6 py-3">
                  <StatusBadge status={app.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==========================================
// STATUS BADGE COMPONENT
// ==========================================
const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

// ==========================================
// APPLICANT MANAGER (WITH SUB-COURSE FILTER)
// ==========================================
const ApplicantManager = ({ applicants, courses }) => {
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

  if (selectedApplicant) {
    return <ApplicantDetailView applicant={selectedApplicant} onBack={() => setSelectedApplicant(null)} />;
  }

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="text-blue-600" size={20}/>
            </div>
            <div>
              <span className="block text-xs text-gray-500 font-bold uppercase">Total</span>
              <span className="text-xl font-bold text-slate-800">{stats.total}</span>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="text-yellow-600" size={20}/>
            </div>
            <div>
              <span className="block text-xs text-gray-500 font-bold uppercase">Pending</span>
              <span className="text-xl font-bold text-yellow-600">{stats.pending}</span>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="text-green-600" size={20}/>
            </div>
            <div>
              <span className="block text-xs text-gray-500 font-bold uppercase">Approved</span>
              <span className="text-xl font-bold text-green-600">{stats.approved}</span>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <XCircle className="text-red-600" size={20}/>
            </div>
            <div>
              <span className="block text-xs text-gray-500 font-bold uppercase">Rejected</span>
              <span className="text-xl font-bold text-red-600">{stats.rejected}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Course Filter */}
          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 mb-1">Course</label>
            <select 
              className="w-full px-3 py-2 border rounded-lg appearance-none bg-white pr-8"
              value={filterCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value="ALL">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.code}>{course.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 bottom-2.5 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Sub-Course Filter (Dynamic) */}
          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 mb-1">Sub-Course</label>
            <select 
              className={`w-full px-3 py-2 border rounded-lg appearance-none bg-white pr-8 ${availableSubCourses.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
              value={filterSubCourse}
              onChange={(e) => setFilterSubCourse(e.target.value)}
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
              onChange={(e) => setFilterMedium(e.target.value)}
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
              onChange={(e) => setFilterStatus(e.target.value)}
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
                onRemove={() => handleCourseChange('ALL')} 
              />
            )}
            {filterSubCourse !== 'ALL' && (
              <FilterTag 
                label={`Sub: ${availableSubCourses.find(s => s.id === filterSubCourse)?.name}`} 
                onRemove={() => setFilterSubCourse('ALL')} 
              />
            )}
            {filterMedium !== 'ALL' && (
              <FilterTag 
                label={`Medium: ${filterMedium}`} 
                onRemove={() => setFilterMedium('ALL')} 
              />
            )}
            {filterStatus !== 'ALL' && (
              <FilterTag 
                label={`Status: ${filterStatus}`} 
                onRemove={() => setFilterStatus('ALL')} 
              />
            )}
            {searchQuery && (
              <FilterTag 
                label={`Search: "${searchQuery}"`} 
                onRemove={() => setSearchQuery('')} 
              />
            )}
          </div>
          
          <div className="flex gap-2 mt-2 md:mt-0">
            <button 
              onClick={() => {
                setFilterCourse('ALL');
                setFilterSubCourse('ALL');
                setFilterMedium('ALL');
                setFilterStatus('ALL');
                setSearchQuery('');
              }}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 border rounded-lg hover:bg-gray-50"
            >
              Clear All
            </button>
            <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-1.5 rounded-lg hover:bg-slate-700 transition text-sm">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b">
              <tr>
                <th className="px-6 py-4">App ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">NIC</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Sub-Course</th>
                <th className="px-6 py-4">Medium</th>
                <th className="px-6 py-4 text-center">Z-Score</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{app.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{app.fullName}</td>
                    <td className="px-6 py-4 text-sm">{app.nic}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {app.courseCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {app.subCourseName ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {app.subCourseName}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm capitalize">{app.medium}</td>
                    <td className="px-6 py-4 text-center font-mono text-sm font-bold text-emerald-600">
                      {app.alResults.zScore}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedApplicant(app)}
                        className="text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-all"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center">
                      <Users size={48} className="text-gray-300 mb-3" />
                      <p className="font-medium">No applicants found</p>
                      <p className="text-sm">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        {filteredApplicants.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold">{filteredApplicants.length}</span> applicants
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-white">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// FILTER TAG COMPONENT
// ==========================================
const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
    {label}
    <button onClick={onRemove} className="hover:bg-blue-100 rounded-full p-0.5">
      <X size={12} />
    </button>
  </span>
);

// ==========================================
// CLOCK ICON (Missing from imports)
// ==========================================
const Clock = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// ==========================================
// APPLICANT DETAIL VIEW
// ==========================================
const ApplicantDetailView = ({ applicant, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition">
          <ArrowLeft size={20}/> Back to List
        </button>
        <div className="flex gap-3">
          <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 flex items-center gap-2">
            <XCircle size={18}/> Reject
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center gap-2 shadow-sm">
            <CheckCircle size={18}/> Approve Application
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-gray-200 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {applicant.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{applicant.fullName}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1"><CreditCard size={14}/> {applicant.nic}</span>
                <span className="flex items-center gap-1"><Calendar size={14}/> {applicant.dob}</span>
                <span className="flex items-center gap-1"><User size={14}/> {applicant.gender}</span>
              </div>
              <div className="mt-2">
                <StatusBadge status={applicant.status} />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 uppercase font-bold tracking-wide">Applied Course</div>
            <div className="text-xl font-bold text-blue-700">{applicant.courseCode}</div>
            {applicant.subCourseName && (
              <div className="text-sm text-purple-600 font-medium">{applicant.subCourseName}</div>
            )}
            <div className="text-sm text-gray-600 capitalize">{applicant.medium} Medium</div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FileText size={18} className="text-blue-500"/> G.C.E A/L Results ({applicant.alResults.year})
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600 font-medium">Z-Score</span>
                <span className="text-lg font-bold text-blue-700 bg-white px-3 py-1 rounded shadow-sm">{applicant.alResults.zScore}</span>
              </div>
              <ul className="space-y-2">
                {applicant.alResults.subjects.map((sub, idx) => (
                  <li key={idx} className="flex justify-between text-sm border-b border-blue-100 pb-1 last:border-0">
                    <span className="text-gray-700">{sub.name}</span>
                    <span className="font-bold text-slate-800 bg-white w-6 h-6 flex items-center justify-center rounded-full text-xs border border-blue-200">{sub.grade}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FileText size={18} className="text-green-500"/> G.C.E O/L Results
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Mathematics" grade={applicant.olResults.math} />
              <ResultCard label="Science" grade={applicant.olResults.science} />
              <ResultCard label="English" grade={applicant.olResults.english} />
              <ResultCard label="Language" grade={applicant.olResults.lang} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <Upload size={18} className="text-purple-500"/> Uploaded Documents
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <FileCard name="Character Certificate" fileName={applicant.files.charCert} />
              <FileCard name="Health Certificate" fileName={applicant.files.healthCert} />
              {applicant.files.additional && (
                <div className="mt-2">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-2">Additional Qualifications</div>
                  <FileCard name="Special Qualification" fileName={applicant.files.additional} />
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
              <h4 className="font-bold text-sm text-gray-700 mb-2">System Eligibility Check</h4>
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle size={16} /> All Basic Requirements Met
              </div>
              <p className="text-xs text-gray-500 mt-1 pl-6">
                Age limit, Z-Score, and mandatory subjects have been verified by the system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ label, grade }) => (
  <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
    <span className="text-sm text-gray-600">{label}</span>
    <span className={`font-bold ${['A','B'].includes(grade) ? 'text-green-600' : 'text-slate-700'}`}>{grade}</span>
  </div>
);

const FileCard = ({ name, fileName }) => (
  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer group transition">
    <div className="flex items-center gap-3">
      <div className="bg-purple-100 p-2 rounded text-purple-600">
        <FileText size={18}/>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{fileName}</div>
      </div>
    </div>
    <div className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
      View
    </div>
  </div>
);

// ==========================================
// COURSE LIST VIEW
// ==========================================
const CourseListView = ({ courses, onEdit, onCreate, onDelete }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-slate-800">Course Configuration</h2>
      <button 
        onClick={onCreate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
      >
        <Plus size={18} /> Add New Course
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold text-sm">
          <tr>
            <th className="px-6 py-4">Course Name</th>
            <th className="px-6 py-4">Sub-Courses</th>
            <th className="px-6 py-4">Available Mediums</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {courses.map(course => (
            <tr key={course.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{course.name}</td>
              <td className="px-6 py-4 text-sm">
                {course.hasSubCourses 
                  ? <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">{course.subCourses.length} Sub-courses</span> 
                  : <span className="text-gray-400 text-sm">None</span>
                }
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1">
                  {course.mediumConfigType === 'GLOBAL' ? (
                     <>
                        {course.globalMediums.sinhala && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Si</span>}
                        {course.globalMediums.tamil && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">Ta</span>}
                        {course.globalMediums.english && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">En</span>}
                     </>
                  ) : (
                    <span className="text-xs text-gray-500 italic">Varies per sub-course</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <button onClick={() => onEdit(course)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                <button onClick={() => onDelete(course.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ==========================================
// COURSE EDITOR
// ==========================================
const CourseEditor = ({ course, setCourse, onSave, onCancel, onPreview }) => {
  const [activeSubTab, setActiveSubTab] = useState(course.subCourses[0]?.id || null);

  const updateMain = (k, v) => setCourse(prev => ({ ...prev, [k]: v }));
  
  const addSub = () => {
    const newSub = createNewSubCourse(Date.now());
    setCourse(prev => ({ ...prev, subCourses: [...prev.subCourses, newSub] }));
    setActiveSubTab(newSub.id);
  };

  const deleteSub = (id) => {
    setCourse(prev => ({ ...prev, subCourses: prev.subCourses.filter(s => s.id !== id) }));
    if(activeSubTab === id) setActiveSubTab(null);
  };

  const renameSub = (id, name) => {
    setCourse(prev => ({
      ...prev,
      subCourses: prev.subCourses.map(s => s.id === id ? { ...s, name } : s)
    }));
  };

  const toggleMedium = (medium, subId = null) => {
    setCourse(prev => {
      if (prev.mediumConfigType === 'GLOBAL' || !prev.hasSubCourses) {
        return {
          ...prev,
          globalMediums: { ...prev.globalMediums, [medium]: !prev.globalMediums[medium] }
        };
      } else {
        return {
          ...prev,
          subCourses: prev.subCourses.map(s => s.id === subId ? {
            ...s,
            mediums: { ...s.mediums, [medium]: !s.mediums[medium] }
          } : s)
        };
      }
    });
  };

  const updateQualsData = (target, action, payload) => {
    const { title, fields } = target;
    let newFields = [...fields];

    if (action === 'ADD_FIELD') newFields.push({ id: Date.now(), type: 'text', label: 'New Input', allowMultiple: false });
    if (action === 'REMOVE_FIELD') newFields = newFields.filter(f => f.id !== payload.id);
    if (action === 'UPDATE_FIELD') newFields = newFields.map(f => f.id === payload.id ? { ...f, [payload.key]: payload.val } : f);
    if (action === 'UPDATE_TITLE') return { title: payload.title, fields };

    return { title, fields: newFields };
  };

  const handleQualChange = (action, payload, subId = null) => {
    setCourse(prev => {
      if (prev.qualConfigType === 'GLOBAL' || !prev.hasSubCourses) {
        return { ...prev, globalQuals: updateQualsData(prev.globalQuals, action, payload) };
      } else {
        return {
          ...prev,
          subCourses: prev.subCourses.map(s => s.id === subId ? {
            ...s,
            additionalQuals: updateQualsData(s.additionalQuals, action, payload)
          } : s)
        };
      }
    });
  };

  const getCurrentQuals = () => {
    if (course.qualConfigType === 'GLOBAL' || !course.hasSubCourses) {
      return course.globalQuals;
    }
    const activeSub = course.subCourses.find(s => s.id === activeSubTab);
    return activeSub?.additionalQuals || { title: '', fields: [] };
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-slate-800">
          {course.id ? `Edit: ${course.name}` : 'Create New Course'}
        </h2>
        <div className="flex gap-3">
          <button onClick={onPreview} className="px-4 py-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 flex items-center gap-2 font-semibold">
            <Eye size={18} /> Preview Form
          </button>
          <div className="h-10 w-px bg-gray-300 mx-2"></div>
          <button onClick={onCancel} className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-slate-700 mb-4">Basic Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Course Name</label>
                <input 
                  type="text" 
                  value={course.name} 
                  onChange={(e) => updateMain('name', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Internal Code</label>
                <input 
                  type="text" 
                  value={course.code} 
                  onChange={(e) => updateMain('code', e.target.value)}
                  className="w-full p-2 border rounded-lg bg-gray-50 text-gray-500 font-mono text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={course.hasSubCourses} 
                  onChange={(e) => updateMain('hasSubCourses', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Enable Sub-Courses</span>
              </label>
            </div>
          </div>

          {/* Sub Course Management */}
          {course.hasSubCourses && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                <Layers size={18} /> Sub-Courses
              </h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {course.subCourses.map(sub => (
                  <div key={sub.id} className="flex gap-2">
                    <input 
                      type="text" 
                      value={sub.name} 
                      onChange={(e) => renameSub(sub.id, e.target.value)}
                      className="flex-1 p-2 border rounded-md text-sm"
                    />
                    <button onClick={() => deleteSub(sub.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button onClick={addSub} className="text-sm text-blue-600 font-medium flex items-center gap-1 mt-2">
                  <Plus size={16}/> Add Sub-Course
                </button>
              </div>
            </div>
          )}

          {/* Medium Config */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><Settings size={18}/> Medium Availability</h3>
              {course.hasSubCourses && (
                <div className="bg-gray-100 p-1 rounded-lg flex text-xs">
                  <button 
                    onClick={() => updateMain('mediumConfigType', 'GLOBAL')}
                    className={`px-3 py-1 rounded-md transition ${course.mediumConfigType === 'GLOBAL' ? 'bg-white shadow text-blue-700 font-bold' : 'text-gray-500'}`}
                  >
                    Apply to All
                  </button>
                  <button 
                    onClick={() => updateMain('mediumConfigType', 'PER_SUB_COURSE')}
                    className={`px-3 py-1 rounded-md transition ${course.mediumConfigType === 'PER_SUB_COURSE' ? 'bg-white shadow text-blue-700 font-bold' : 'text-gray-500'}`}
                  >
                    Per Sub-Course
                  </button>
                </div>
              )}
            </div>

            {course.mediumConfigType === 'GLOBAL' || !course.hasSubCourses ? (
              <MediumCheckboxes 
                data={course.globalMediums} 
                onToggle={(m) => toggleMedium(m)} 
                label="All Sub-Courses will have:" 
              />
            ) : (
              <div className="space-y-4">
                {course.subCourses.map(sub => (
                  <MediumCheckboxes 
                    key={sub.id} 
                    data={sub.mediums} 
                    onToggle={(m) => toggleMedium(m, sub.id)} 
                    label={`Mediums for ${sub.name}:`} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Qualification Builder */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200 ring-1 ring-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-blue-800 flex items-center gap-2"><FileText size={18}/> Form Designer</h3>
              {course.hasSubCourses && (
                <div className="bg-blue-50 p-1 rounded-lg flex text-xs">
                  <button 
                    onClick={() => updateMain('qualConfigType', 'GLOBAL')}
                    className={`px-3 py-1 rounded-md transition ${course.qualConfigType === 'GLOBAL' ? 'bg-white shadow text-blue-700 font-bold' : 'text-blue-600'}`}
                  >
                    Global Form
                  </button>
                  <button 
                    onClick={() => updateMain('qualConfigType', 'PER_SUB_COURSE')}
                    className={`px-3 py-1 rounded-md transition ${course.qualConfigType === 'PER_SUB_COURSE' ? 'bg-white shadow text-blue-700 font-bold' : 'text-blue-600'}`}
                  >
                    Per Sub-Course
                  </button>
                </div>
              )}
            </div>

            {course.hasSubCourses && course.qualConfigType === 'PER_SUB_COURSE' && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 border-b">
                {course.subCourses.map(sub => (
                  <button 
                    key={sub.id} 
                    onClick={() => setActiveSubTab(sub.id)}
                    className={`px-3 py-1.5 rounded-t-lg text-sm font-medium border-b-2 transition whitespace-nowrap ${activeSubTab === sub.id ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

            <FieldBuilder 
              title={getCurrentQuals().title}
              fields={getCurrentQuals().fields}
              onUpdateTitle={(t) => handleQualChange('UPDATE_TITLE', { title: t }, activeSubTab)}
              onAddField={() => handleQualChange('ADD_FIELD', null, activeSubTab)}
              onRemoveField={(id) => handleQualChange('REMOVE_FIELD', { id }, activeSubTab)}
              onUpdateField={(id, k, v) => handleQualChange('UPDATE_FIELD', { id, key: k, val: v }, activeSubTab)}
            />
          </div>
        </div>

        {/* Right Column - Locked Fields */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-4 text-gray-500 pb-2 border-b">
              <Lock size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Locked Standard Fields</span>
            </div>
            
            <div className="space-y-3 opacity-60 pointer-events-none select-none">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-xs font-bold text-gray-400 mb-2">Personal Details</div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-100 rounded w-full"></div>
                  <div className="h-8 bg-gray-100 rounded w-2/3"></div>
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-xs font-bold text-gray-400 mb-2">O/L & A/L Results</div>
                <div className="grid grid-cols-3 gap-1">
                  {[1,2,3,4,5,6].map(i => <div key={i} className="h-6 bg-gray-100 rounded"></div>)}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200">
              <p className="font-bold flex items-center gap-1 mb-1"><Info size={12}/> Admin Note:</p>
              Use the Preview button above to verify how your custom fields will appear to students.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// STUDENT APPLICATION PREVIEW
// ==========================================
const StudentApplicationPreview = ({ course, onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState(
    course.hasSubCourses && course.subCourses.length > 0 ? course.subCourses[0].id : null
  );

  const getCurrentMediums = () => {
    if (course.mediumConfigType === 'GLOBAL' || !course.hasSubCourses) return course.globalMediums;
    const sub = course.subCourses.find(s => s.id === activeSubTab);
    return sub ? sub.mediums : {};
  };

  const getCurrentQuals = () => {
    if (course.qualConfigType === 'GLOBAL' || !course.hasSubCourses) return course.globalQuals;
    const sub = course.subCourses.find(s => s.id === activeSubTab);
    return sub ? sub.additionalQuals : { title: '', fields: [] };
  };

  const currentMediums = getCurrentMediums();
  const currentQuals = getCurrentQuals();

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6 bg-slate-800 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-3">
          <Eye size={24} className="text-green-400" />
          <div>
            <h2 className="text-lg font-bold">Student View Preview</h2>
            <p className="text-xs text-slate-300">Reviewing: {course.name}</p>
          </div>
        </div>
        <button onClick={onBack} className="bg-white text-slate-900 px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-slate-100">
          <ArrowLeft size={16} /> Back to Editor
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-blue-900 text-white p-6 text-center">
          <h1 className="text-2xl font-bold uppercase">Ministry of Education</h1>
          <h2 className="text-lg mt-2 text-blue-200">National College of Education Admission - 2025</h2>
        </div>

        <div className="flex bg-gray-200 border-b border-gray-300">
          <div className="flex-1 py-4 text-center font-bold uppercase bg-white text-blue-900 border-t-4 border-blue-900 shadow-sm z-10">
            {course.name}
          </div>
          <div className="flex-1 py-4 text-center font-bold uppercase text-gray-400 border-r border-gray-300">Science</div>
          <div className="flex-1 py-4 text-center font-bold uppercase text-gray-400 border-r border-gray-300">Arts</div>
          <div className="flex-1 py-4 text-center font-bold uppercase text-gray-400">English</div>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Sub-Course / Mediums Selection */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            {course.hasSubCourses && (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Subject / Stream:</label>
                <div className="flex flex-wrap gap-2">
                  {course.subCourses.map(sub => (
                    <button 
                      key={sub.id}
                      onClick={() => setActiveSubTab(sub.id)}
                      className={`px-4 py-1 rounded-full text-xs font-bold border transition ${activeSubTab === sub.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Medium:</label>
              <div className="flex gap-2">
                {['Sinhala', 'Tamil', 'English'].map(med => {
                  if (!currentMediums[med.toLowerCase()]) return null; 
                  return (
                    <button key={med} className="px-4 py-1 rounded-full text-xs font-bold border bg-white text-gray-600 border-gray-300 hover:bg-blue-50">
                      {med} Medium
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="As per NIC" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">NIC Number</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="e.g. 2000xxxxxxxxx" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
          </div>

          {/* A/L Results */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5"/>G.C.E A/L Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                <select className="w-full p-2 border rounded"><option>2023</option><option>2024</option></select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Z-Score</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="e.g. 1.2500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">A/L Medium</label>
                <select className="w-full p-2 border rounded"><option>Sinhala</option><option>Tamil</option><option>English</option></select>
              </div>
            </div>
          </div>

          {/* O/L Results */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5"/>G.C.E O/L Results
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Maths', 'Science', 'English', 'Sinhala/Tamil', 'Religion', 'History'].map(sub => (
                  <div key={sub}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{sub}</label>
                    <select className="w-full p-2 border rounded"><option>A</option><option>B</option><option>C</option><option>S</option></select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Additional Qualifications */}
          {currentQuals.fields.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5"/> {currentQuals.title || "Additional Qualifications"}
              </h3>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuals.fields.map(field => (
                  <div key={field.id} className={field.type === 'radio' || field.type === 'checkbox' ? '' : 'col-span-1 md:col-span-2'}>
                    {field.type === 'text' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                        <input type="text" className="w-full p-2 border rounded focus:ring-2 ring-blue-200 outline-none" placeholder="Type here..." />
                      </div>
                    )}
                    {field.type === 'file' && (
                      <div className="border-2 border-dashed border-blue-300 p-4 rounded-lg bg-white text-center hover:bg-blue-50 transition cursor-pointer">
                        <label className="cursor-pointer block">
                          <span className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</span>
                          <UploadCloud className="mx-auto text-gray-400 mb-2"/>
                          <p className="text-xs text-gray-500">Click to upload {field.allowMultiple ? '(Multiple allowed)' : '(Single file)'}</p>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    )}
                    {field.type === 'radio' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-sm"><input type="radio" name={`radio_${field.id}`} /> Yes</label>
                          <label className="flex items-center gap-2 text-sm"><input type="radio" name={`radio_${field.id}`} /> No</label>
                        </div>
                      </div>
                    )}
                    {field.type === 'checkbox' && (
                      <div className="flex items-center gap-2 mt-4 bg-white p-3 rounded border">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <label className="text-sm font-semibold text-gray-700">{field.label}</label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5"/>Certificates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
                <span className="block text-sm font-semibold text-gray-600 mb-2">Character Certificate</span>
                <p className="text-xs text-gray-400">Click to upload</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
                <span className="block text-sm font-semibold text-gray-600 mb-2">Health Certificate</span>
                <p className="text-xs text-gray-400">Click to upload</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition shadow-lg">
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// FIELD BUILDER COMPONENT
// ==========================================
const FieldBuilder = ({ title, fields, onUpdateTitle, onAddField, onRemoveField, onUpdateField }) => (
  <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
    <div className="mb-4">
      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Section Title (User View)</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => onUpdateTitle(e.target.value)}
        className="w-full p-2 border rounded font-medium text-gray-800 focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="space-y-3">
      {fields.length === 0 && <p className="text-sm text-gray-400 italic text-center py-4">No input fields defined.</p>}
      
      {fields.map((field) => (
        <div key={field.id} className="bg-slate-50 p-3 rounded border border-slate-200 relative group">
          <button onClick={() => onRemoveField(field.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 bg-white p-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="text-[10px] text-gray-400 uppercase font-bold">Label / Question</label>
              <input 
                type="text" 
                value={field.label} 
                onChange={(e) => onUpdateField(field.id, 'label', e.target.value)}
                className="w-full p-1.5 text-sm border rounded"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-bold">Input Type</label>
              <select 
                value={field.type} 
                onChange={(e) => onUpdateField(field.id, 'type', e.target.value)}
                className="w-full p-1.5 text-sm border rounded bg-white"
              >
                <option value="text">Text Box</option>
                <option value="radio">Yes/No Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="file">File Upload</option>
              </select>
            </div>
          </div>
          
          {field.type === 'file' && (
            <div className="mt-2">
              <label className="flex items-center gap-2 text-xs bg-white p-2 rounded border inline-block">
                <input 
                  type="checkbox" 
                  checked={field.allowMultiple} 
                  onChange={(e) => onUpdateField(field.id, 'allowMultiple', e.target.checked)}
                />
                Allow Multiple Files?
              </label>
            </div>
          )}
        </div>
      ))}
      <button onClick={onAddField} className="w-full py-2 bg-blue-50 text-blue-600 rounded border border-dashed border-blue-300 hover:bg-blue-100 flex justify-center items-center gap-2 text-sm font-medium">
        <Plus size={16}/> Add Input Field
      </button>
    </div>
  </div>
);

// ==========================================
// MEDIUM CHECKBOXES COMPONENT
// ==========================================
const MediumCheckboxes = ({ data, onToggle, label }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
    <span className="text-sm font-medium text-gray-700 min-w-[150px]">{label}</span>
    <div className="flex gap-4">
      {['sinhala', 'tamil', 'english'].map(med => (
        <label key={med} className="flex items-center gap-2 cursor-pointer hover:bg-white px-2 py-1 rounded transition">
          <input 
            type="checkbox" 
            checked={data[med]} 
            onChange={() => onToggle(med)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-sm capitalize">{med}</span>
        </label>
      ))}
    </div>
  </div>
);