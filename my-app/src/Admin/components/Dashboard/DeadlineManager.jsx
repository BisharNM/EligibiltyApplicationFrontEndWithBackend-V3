import React, { useEffect, useState } from "react";
import { deadlineApi } from "../../api/deadlineApi";
import { Calendar, Save, Trash2, Loader2 } from "lucide-react";

export default function DeadlineManager() {
  const [closingDate, setClosingDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing deadline on mount
  useEffect(() => {
    loadDeadline();
  }, []);

  const loadDeadline = async () => {
    setLoading(true);
    const data = await deadlineApi.get();
    if (data && data.closingDate) {
      setClosingDate(data.closingDate);
    } else {
      setClosingDate("");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!closingDate) return alert("Please select a valid date.");
    
    setSaving(true);
    try {
      await deadlineApi.save(closingDate);
      alert("Deadline updated successfully!");
    } catch (e) {
      alert("Failed to save deadline.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove the deadline?")) {
      setSaving(true);
      try {
        await deadlineApi.remove();
        setClosingDate("");
        alert("Deadline removed.");
      } catch (e) {
        alert("Failed to delete.");
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm p-4 bg-white rounded-xl border border-gray-200">
        <Loader2 className="animate-spin" size={16} /> Loading Deadline...
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
      
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-red-50 text-red-600 rounded-lg">
          <Calendar size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Application Deadline</h3>
          <p className="text-xs text-gray-500">Set the global closing date for all applications.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          type="date"
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none w-full sm:w-auto"
        />
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition disabled:opacity-50"
          title="Save Deadline"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        </button>

        {closingDate && (
          <button
            onClick={handleDelete}
            disabled={saving}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 p-2 rounded-lg transition"
            title="Remove Deadline"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}