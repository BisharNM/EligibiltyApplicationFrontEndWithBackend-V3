import React from 'react';
import { Info } from 'lucide-react';

const InfoPopup = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full animate-bounce">
        <div className="flex items-start mb-4">
          <Info className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default InfoPopup;