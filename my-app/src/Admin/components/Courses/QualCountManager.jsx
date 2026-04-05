import React from 'react';
import { BookOpen, Award, CheckCircle } from 'lucide-react';

export default function QualCountManager({ counts, onChange }) {
  const data = counts || { alSubjectCount: 3, olSubjectCount: 6, olCreditsNeeded: 3 };

  const update = (key, val) => {
    // Ensure value is non-negative
    const num = Math.max(0, parseInt(val) || 0);
    onChange({ ...data, [key]: num });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <NumberInputCard
        label="Required A/L Passes"
        value={data.alSubjectCount}
        onChange={(val) => update('alSubjectCount', val)}
        icon={<BookOpen size={18} className="text-blue-500" />}
        color="blue"
        desc="Min subjects to pass"
      />

      <NumberInputCard
        label="Required O/L Passes"
        value={data.olSubjectCount}
        onChange={(val) => update('olSubjectCount', val)}
        icon={<CheckCircle size={18} className="text-green-500" />}
        color="green"
        desc="Total subjects passed"
      />

      <NumberInputCard
        label="Required O/L Credits"
        value={data.olCreditsNeeded || 3}
        onChange={(val) => update('olCreditsNeeded', val)}
        icon={<Award size={18} className="text-orange-500" />}
        color="orange"
        desc="Min credit (C) passes"
      />

    </div>
  );
}

//  Sub-Component for consistent styling 
const NumberInputCard = ({ label, value, onChange, icon, color, desc }) => {
  const colors = {
    blue: "focus:ring-blue-500 border-gray-300",
    green: "focus:ring-green-500 border-gray-300",
    orange: "focus:ring-orange-500 border-gray-300"
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-lg bg-${color}-50`}>
          {icon}
        </div>
        <span className="text-sm font-bold text-gray-700">{label}</span>
      </div>
      
      <div className="relative">
        <input 
          type="number" 
          min="0"
          className={`w-full px-3 py-2 text-lg font-bold text-gray-800 bg-gray-50 rounded-lg border ${colors[color]} focus:ring-2 focus:bg-white outline-none transition-all text-center`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 select-none pointer-events-none">
          COUNT
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 font-medium mt-2 text-center uppercase tracking-wide">
        {desc}
      </p>
    </div>
  );
};