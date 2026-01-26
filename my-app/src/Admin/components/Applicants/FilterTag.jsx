import React from 'react';
import { X } from 'lucide-react';

export default function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:bg-blue-100 rounded-full p-0.5">
        <X size={12} />
      </button>
    </span>
  );
}