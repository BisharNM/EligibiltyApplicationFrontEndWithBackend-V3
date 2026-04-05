import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Search } from 'lucide-react'; // Import Search Icon

export default function SubjectListEditor({ title, subjects, onAdd, onDelete, onUpdate, onDeleteAll }) {
  const [newItem, setNewItem] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  
  //  Search State
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = () => {
    if (!newItem.trim()) return;
    onAdd([{ name: newItem }]);
    setNewItem("");
  };

  const startEdit = (sub) => {
    setEditingId(sub.id);
    setEditValue(sub.name);
  };

  const saveEdit = () => {
    onUpdate([{ id: editingId, name: editValue }]); 
    setEditingId(null);
  };

  //  Filter Logic
  const filteredSubjects = subjects.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-bold text-gray-700">{title}</h3>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {/*  Search Bar */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search subjects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 border rounded-lg text-sm w-full sm:w-48 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          {/* Delete All Button */}
          {subjects.length > 0 && onDeleteAll && (
            <button 
              onClick={onDeleteAll}
              className="text-xs flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded border border-red-200 hover:border-red-300 transition whitespace-nowrap"
            >
              <Trash2 size={14}/> Delete All
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {/* Add new subject */}
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Add new subject..." 
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button 
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={18}/> Add
          </button>
        </div>

        {/* LIST (Filtered) */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map(sub => (
              <div key={sub.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group hover:bg-blue-50 transition">
                
                {editingId === sub.id ? (
                  <div className="flex gap-2 flex-1 mr-4">
                    <input 
                      className="flex-1 p-1 px-2 border rounded text-sm"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button onClick={saveEdit} className="text-green-600 hover:bg-green-100 p-1 rounded"><Save size={16}/></button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 hover:bg-gray-200 p-1 rounded"><X size={16}/></button>
                  </div>
                ) : (
                  <span className="font-medium text-gray-700">{sub.name}</span>
                )}

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button 
                    onClick={() => startEdit(sub)}
                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    <Edit2 size={16}/>
                  </button>
                  <button 
                    onClick={() => onDelete(sub.id)}
                    className="p-1.5 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-4">
              {searchQuery ? `No matches for "${searchQuery}"` : "No subjects found."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}