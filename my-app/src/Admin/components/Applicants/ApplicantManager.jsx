import React, { useMemo, useState } from "react";
import StatsCards from "./StatsCards";
import FilterBar from "./FilterBar";
import ApplicantTable from "./ApplicantTable";
import ApplicantDetailView from "./ApplicantDetailView";
import { applicantApi } from "../../api/applicantApi";
import { Trash2, AlertTriangle } from 'lucide-react';

const toNumber = (v) => {
  if (v === null || v === undefined) return null;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

export default function ApplicantManager({ applicants, courses ,setApplicants }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
 const [filterMedium, setFilterMedium] = useState('ALL');
  const [filterCourse, setFilterCourse] = useState("ALL");       
  const [filterSubCourse, setFilterSubCourse] = useState("ALL"); 
  const [filterStatus, setFilterStatus] = useState("ALL");       
  const [searchQuery, setSearchQuery] = useState("");
   const [sortZ, setSortZ] = useState("NONE"); 
   const [loadingDetail, setLoadingDetail] = useState(false);

  // Sub-course dropdown options based on selected course
  const availableSubCourses = useMemo(() => {
    if (filterCourse === "ALL") return [];

    
    const c = courses.find(x => x.courseName === filterCourse);
    return c?.subCourses || [];
  }, [filterCourse, courses]);

  const filteredApplicants = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return applicants.filter(app => {
      const matchCourse =
        filterCourse === "ALL" || app.courseName === filterCourse;

      const matchSubCourse =
        filterSubCourse === "ALL" || app.subCourseName === filterSubCourse;

      const matchMedium =
        filterMedium === "ALL" || (app.medium || "").toLowerCase() === filterMedium.toLowerCase();

      const matchStatus =
        filterStatus === "ALL" || (app.status || "").toLowerCase() === filterStatus.toLowerCase();

      const matchSearch =
        !q ||
        (app.fullName || "").toLowerCase().includes(q) ||
        (app.nic || "").toLowerCase().includes(q) ||
        (app.displayId || "").toLowerCase().includes(q);

      return matchCourse && matchSubCourse && matchMedium && matchStatus && matchSearch;
    });
    
  }, [applicants, filterCourse, filterSubCourse, filterMedium, filterStatus, searchQuery]);

  const sortedApplicants = useMemo(() => {
    const list = [...filteredApplicants];

    if (sortZ === "NONE") return list;

    list.sort((a, b) => {
      // Prefer app.zScore 
      const az = toNumber(a.zScore ?? a.alResults?.zScore);
      const bz = toNumber(b.zScore ?? b.alResults?.zScore);

      // nulls go to bottom
      if (az == null && bz == null) return 0;
      if (az == null) return 1;
      if (bz == null) return -1;

      const diff = az - bz;
      return sortZ === "ASC" ? diff : -diff;
    });

    return list;
  }, [filteredApplicants, sortZ]);

 const stats = useMemo(() => ({
    total: applicants.length,
    pending: applicants.filter(a => a.status === "pending").length,
    approved: applicants.filter(a => a.status === "approved").length,
    rejected: applicants.filter(a => a.status === "rejected").length
  }), [applicants]);

  // Handler for Card Click
  const handleStatClick = (statusValue) => {
    setFilterStatus(statusValue);
  };

  const handleCourseChange = (courseName) => {
    setFilterCourse(courseName);
    setFilterSubCourse("ALL"); 
  };
  const handleViewDetails = async (applicantId) => {
    try {
      setLoadingDetail(true);
      const full = await applicantApi.getOne(applicantId);
      setSelectedApplicant(full); 
    } catch (e) {
      console.error(e);
      alert("Failed to load applicant details");
    } finally {
      setLoadingDetail(false);
    }
  };
   //  Delete Handler 
  const handleDeleteApplicant = async (id) => {
    try {
      await applicantApi.delete(id);
      
      
      if (setApplicants) {
         setApplicants(prev => prev.filter(app => app.id !== id));
      } else {
       
         window.location.reload(); 
      }
      
      alert("Applicant deleted successfully.");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete applicant.");
    }
  };
  //  Bulk Delete Handler 
  const handleBulkDelete = async () => {
    const targetStatus = filterStatus; 
    
    

    try {
      // 1. Call API
      
      await applicantApi.deleteByStatus(targetStatus.toUpperCase()); 
      
      // 2. Update State 
      if (targetStatus === 'ALL') {
        setApplicants([]);
      } else {
        // Filter out the deleted items from the current list
        // Compare using lowercase to be safe
        setApplicants(prev => prev.filter(app => 
           (app.status || "").toLowerCase() !== targetStatus.toLowerCase()
        ));
      }
      
      alert(`Success: All ${targetStatus} applicants deleted.`);
      alert("Deleted.");
window.location.reload();

    } catch (e) {
      console.error("Delete Error:", e);
      // Even if it fails, refresh the list to see the truth
      
      alert("Delete reported an error, but check if data is gone.");
      
window.location.reload();
    }
};


  if (loadingDetail) return <div className="p-6">Loading applicant details...</div>;


  if (selectedApplicant) {
    return (
      <ApplicantDetailView
        applicant={selectedApplicant}
        onBack={() => setSelectedApplicant(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Applicant Management</h2>
        

      <StatsCards stats={stats} activeFilter={filterStatus} // Pass current filter to highlight active card
        onFilterClick={handleStatClick} 
        />

      <FilterBar
        courses={courses}
        availableSubCourses={availableSubCourses}
        filterCourse={filterCourse}
        filterSubCourse={filterSubCourse}
        filterMedium={filterMedium}
        filterStatus={filterStatus}
        searchQuery={searchQuery}
         sortZ={sortZ}
        onSortZChange={setSortZ}

        
        onCourseChange={handleCourseChange}
        onSubCourseChange={setFilterSubCourse}
        onMediumChange={setFilterMedium}
        onStatusChange={setFilterStatus}
        onSearchChange={setSearchQuery}
        onClearAll={() => {
          setFilterCourse("ALL");
          setFilterSubCourse("ALL");
          setFilterMedium("ALL");
          setFilterStatus("ALL");
          setSearchQuery("");
          setSortZ("NONE");
        }}
      />
      <button 
          onClick={handleBulkDelete}
          className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-200 transition"
        >
          <Trash2 size={18} />
          {filterStatus === 'ALL' ? 'Delete Database' : `Delete All ${filterStatus}`}
        </button>

       <ApplicantTable applicants={sortedApplicants} onViewDetails={handleViewDetails} 
        onDelete={handleDeleteApplicant}  />
    </div>
  );
}