import React, { useEffect, useState } from "react";
import { alYearApi } from "../../api/alYearApi";
import { Calendar, Save, Loader2 } from "lucide-react";

export default function AlYearManager() {
  const [year1, setYear1] = useState("");
  const [year2, setYear2] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadYears();
  }, []);

  const loadYears = async () => {
    setLoading(true);
    const data = await alYearApi.get();
    if (data) {
      setYear1(data.firstAlYear || "");
      setYear2(data.secondAlYear || "");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!year1 || !year2) return alert("Please enter both years.");
    
    setSaving(true);
    try {
      await alYearApi.save(year1, year2);
      alert("A/L Years Updated!");
    } catch ( e) {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm p-4 bg-white rounded-xl border border-gray-200">
        <Loader2 className="animate-spin" size={16} /> Loading Years...
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between mt-4">
      
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
          <Calendar size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Valid A/L Years</h3>
          <p className="text-xs text-gray-500">Set the two accepted exam years.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          type="text"
          value={year1}
          onChange={(e) => setYear1(e.target.value)}
          placeholder="Year 1 (e.g. 2023)"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32 focus:ring-2 focus:ring-blue-100 outline-none"
        />
        <span className="text-gray-400">/</span>
        <input
          type="text"
          value={year2}
          onChange={(e) => setYear2(e.target.value)}
          placeholder="Year 2 (e.g. 2024)"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32 focus:ring-2 focus:ring-blue-100 outline-none"
        />
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition disabled:opacity-50 ml-2"
          title="Save Years"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        </button>
      </div>
    </div>
  );
}