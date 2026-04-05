import React, { useState, useEffect } from 'react';
import { olBucketApi } from '../../api/olBucketApi'; 
import SubjectListEditor from './SubjectListEditor'; 
import { Grid, Loader2 } from 'lucide-react'; 

export default function OLBucketConfigManager() {
  const [bucket1, setBucket1] = useState([]);
  const [bucket2, setBucket2] = useState([]);
  const [bucket3, setBucket3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  // Load Data
  const loadAll = async () => {
    setLoading(true);
    try {
      const [d1, d2, d3] = await Promise.all([
        olBucketApi.getSubject1(),
        olBucketApi.getSubject2(),
        olBucketApi.getSubject3()
      ]);
      setBucket1(d1);
      setBucket2(d2);
      setBucket3(d3);
    } catch (e) {
      console.error(e);
      alert("Failed to load O/L buckets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Generic Handlers
  const handleSave = async (bucketNum, data) => {
    try {
      if (bucketNum === 1) await olBucketApi.saveSubject1(data);
      if (bucketNum === 2) await olBucketApi.saveSubject2(data);
      if (bucketNum === 3) await olBucketApi.saveSubject3(data);
      loadAll(); 
    } catch (e) { alert("Save failed"); }
  };

  const handleUpdate = async (bucketNum, data) => {
    // Reusing save logic since backend update takes list too
    
    handleSave(bucketNum, data); 
  };

  const handleDelete = async (bucketNum, id) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      if (bucketNum === 1) await olBucketApi.deleteSubject1(id);
      if (bucketNum === 2) await olBucketApi.deleteSubject2(id);
      if (bucketNum === 3) await olBucketApi.deleteSubject3(id);
      loadAll();
    } catch (e) { alert("Delete failed"); }
  };

  const handleDeleteAll = async (bucketNum) => {
    if (!window.confirm(`WARNING: This will delete ALL subjects in O/L Bucket ${bucketNum}.\nAre you sure?`)) return;
    
    try {
      if (bucketNum === 1) await olBucketApi.deleteAllSubject1();
      if (bucketNum === 2) await olBucketApi.deleteAllSubject2();
      if (bucketNum === 3) await olBucketApi.deleteAllSubject3();
      loadAll(); 
      alert(`Bucket ${bucketNum} cleared.`);
    } catch (e) {
      alert("Failed to delete all subjects.");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-green-600"/></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
          <Grid size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">O/L Bucket Configuration</h2>
          <p className="text-sm text-slate-500">Manage the 3 category subject buckets for O/L exams.</p>
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
                ? 'border-green-600 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Category Bucket {num}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 1 && (
          <SubjectListEditor 
            title="Bucket 1 (Commerce / Arts)" 
            subjects={bucket1} 
            onAdd={(d) => handleSave(1, d)} 
            onUpdate={(d) => handleUpdate(1, d)}
            onDelete={(id) => handleDelete(1, id)} 
            onDeleteAll={() => handleDeleteAll(1)}
          />
        )}
        {activeTab === 2 && (
          <SubjectListEditor 
            title="Bucket 2 (Aesthetic / Literature)" 
            subjects={bucket2} 
            onAdd={(d) => handleSave(2, d)} 
            onUpdate={(d) => handleUpdate(2, d)}
            onDelete={(id) => handleDelete(2, id)} 
            onDeleteAll={() => handleDeleteAll(2)}
          />
        )}
        {activeTab === 3 && (
          <SubjectListEditor 
            title="Bucket 3 (Technical / Other)" 
            subjects={bucket3} 
            onAdd={(d) => handleSave(3, d)} 
            onUpdate={(d) => handleUpdate(3, d)}
            onDelete={(id) => handleDelete(3, id)} 
            onDeleteAll={() => handleDeleteAll(3)}
          />
        )}
      </div>
    </div>
  );
}