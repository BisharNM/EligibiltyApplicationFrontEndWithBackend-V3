import React, { useState, useEffect } from 'react';
import { subjectApi } from '../../api/subjectApi';
import SubjectListEditor from './SubjectListEditor';
import { Layers, Loader2 } from 'lucide-react';

export default function SubjectConfigManager() {
  const [sub1, setSub1] = useState([]);
  const [sub2, setSub2] = useState([]);
  const [sub3, setSub3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  
const handleDeleteAll = async (bucket) => {
  if (!window.confirm(`WARNING: This will delete ALL subjects in Bucket ${bucket}.\nAre you sure?`)) return;
  
  try {
    if (bucket === 1) await subjectApi.deleteAllSubject1();
    if (bucket === 2) await subjectApi.deleteAllSubject2();
    if (bucket === 3) await subjectApi.deleteAllSubject3();
    loadAll(); 
    alert("All subjects deleted.");
  } catch (e) {
    alert("Failed to delete all subjects.");
  }
};

  // Load Data
  const loadAll = async () => {
    setLoading(true);
    try {
      const [d1, d2, d3] = await Promise.all([
        subjectApi.getSubject1(),
        subjectApi.getSubject2(),
        subjectApi.getSubject3()
      ]);
      setSub1(d1);
      setSub2(d2);
      setSub3(d3);
    } catch (e) {
      console.error(e);
      alert("Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Generic Handlers
  const handleSave = async (bucket, data) => {
    try {
      if (bucket === 1) await subjectApi.saveSubject1(data);
      if (bucket === 2) await subjectApi.saveSubject2(data);
      if (bucket === 3) await subjectApi.saveSubject3(data);
      loadAll(); 
    } catch (e) { alert("Save failed"); }
  };

  const handleUpdate = async (bucket, data) => {

    
    
    try {
        if (bucket === 1) await adminHttp.put(`/api/v1/alsubejct/Subject1`, data);
       
       
        handleSave(bucket, data); 
    } catch(e) {}
  };

  const handleDelete = async (bucket, id) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      if (bucket === 1) await subjectApi.deleteSubject1(id);
      if (bucket === 2) await subjectApi.deleteSubject2(id);
      if (bucket === 3) await subjectApi.deleteSubject3(id);
      loadAll();
    } catch (e) { alert("Delete failed"); }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-blue-600"/></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <Layers size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">A/L Subject Configuration</h2>
          <p className="text-sm text-slate-500">Manage the 3 subject buckets for A/L exams.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[1, 2, 3].map(num => (
          <button
            key={num}
            onClick={() => setActiveTab(num)}
            className={`px-6 py-3 font-bold text-sm border-b-2 transition ${
              activeTab === num 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Subject Bucket {num}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 1 && (
          <SubjectListEditor 
            title="Bucket 1 (Main Subjects)" 
            subjects={sub1} 
            onAdd={(d) => handleSave(1, d)} 
            onUpdate={(d) => handleSave(1, d)} 
            onDelete={(id) => handleDelete(1, id)} 
             onDeleteAll={() => handleDeleteAll(1)} 
          />
        )}
        {activeTab === 2 && (
          <SubjectListEditor 
            title="Bucket 2 (Tech / Civilization)" 
            subjects={sub2} 
            onAdd={(d) => handleSave(2, d)} 
            onUpdate={(d) => handleSave(2, d)}
            onDelete={(id) => handleDelete(2, id)} 
             onDeleteAll={() => handleDeleteAll(1)} 
          />
        )}
        {activeTab === 3 && (
          <SubjectListEditor 
            title="Bucket 3 (General / Languages)" 
            subjects={sub3} 
            onAdd={(d) => handleSave(3, d)} 
            onUpdate={(d) => handleSave(3, d)}
            onDelete={(id) => handleDelete(3, id)} 
             onDeleteAll={() => handleDeleteAll(1)} 
          />
        )}
      </div>
    </div>
  );
}