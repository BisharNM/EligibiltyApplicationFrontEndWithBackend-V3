import React, { useEffect, useState } from "react";
import { deadlineApi } from "../../api/deadlineApi";

export default function DeadlineManager() {
  const [closingDate, setClosingDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const d = await deadlineApi.get(); // Optional<Deadline> => may be null
        if (!alive) return;
        setClosingDate(d?.closingDate || "");
      } catch (e) {
        console.error(e);
        alert("Failed to load deadline.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const save = async () => {
    if (!closingDate) return alert("Select a closing date.");
    try {
      setSaving(true);
      await deadlineApi.save(closingDate); // POST
      alert("Deadline saved!");
    } catch (e) {
      console.error(e);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    try {
      await deadlineApi.remove();
      setClosingDate("");
      alert("Deadline deleted.");
    } catch (e) {
      console.error(e);
      alert("Delete failed.");
    }
  };

  if (loading) return <div className="bg-white p-4 rounded-xl border">Loading deadline...</div>;

  return (
    <div className="bg-white p-4 rounded-xl border">
      <h3 className="font-bold mb-3">Deadline</h3>

      <label className="block text-xs font-bold text-gray-500 mb-1">Closing Date</label>
      <input
        type="date"
        value={closingDate}
        onChange={(e) => setClosingDate(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <div className="flex gap-2 mt-3">
        <button
          onClick={save}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={remove}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}