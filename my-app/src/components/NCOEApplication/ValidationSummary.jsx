import React from 'react';
import { AlertCircle, CheckCircle, Send, XCircle, AlertTriangle } from 'lucide-react';

export default function ValidationSummary({ errors, canApply, isSubmitting }) {
  
  return (
    <div className="mt-8 border-t-2 border-gray-100 pt-6">
      
      {/* 
           Not Eligible (Show Requirements Messages)
          */}
      {!canApply && errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-sm animate-fade-in">
          
          <div className="flex items-start mb-4">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-red-900">Eligibility Criteria Not Met</h4>
              <p className="text-sm text-red-700 mt-1">
                You cannot submit this application because the following requirements are missing:
              </p>
            </div>
          </div>

          {/* The Requirement Messages List */}
          <ul className="bg-white rounded-lg border border-red-100 divide-y divide-red-50">
            {errors.map((errorMsg, idx) => (
              <li key={idx} className="p-3 flex items-start text-sm text-red-800">
                <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-medium leading-relaxed">
                  {errorMsg}
                </span>
              </li>
              
            ))}
          </ul>
          
          

        </div>
      )}

      {/* 
          Eligible (Show Success Message)
          */}
      {canApply && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 shadow-sm flex items-center animate-fade-in">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-green-900">You are Eligible!</h4>
            <p className="text-sm text-green-700">
              All academic and document requirements have been met.
            </p>
          </div>
        </div>
      )}

      {/* 
          Submit Button (Controlled by Eligibility)
          */}
      <button 
        type="submit" 
        disabled={!canApply || isSubmitting} 
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center transition-all duration-200
          ${canApply 
            ? 'bg-blue-900 text-white hover:bg-blue-800 hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
          }`}
      >
        {isSubmitting ? (
          <span className="flex items-center">
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             Processing...
          </span>
        ) : (
          <>
            {!canApply ? (
              <>Fix Requirements Above to Submit</>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Application
              </>
            )}
          </>
        )}
      </button>

    </div>
  );
}