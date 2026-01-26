import React from 'react';
import { User, Calendar, CreditCard, Heart } from 'lucide-react';
import { calculateAge } from '../../utils/helpers';
import { COURSES } from '../../constants';

const PersonalInfoForm = ({ formData, onChange, activeTab }) => {
  const age = calculateAge(formData.dob);
  const isAgeValid = age >= 17 && (activeTab === COURSES.RELIGION && formData.isClergy ? age <= 30 : age <= 25);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      
      {/* Header */}
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <User className="w-5 h-5 text-blue-700" />
        </div>
        <h3 className="text-lg font-bold text-blue-900">Personal Information</h3>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Row 1: Full Name */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <input 
              required 
              type="text" 
              name="fullName" 
              value={formData.fullName}
              onChange={onChange} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 pl-3 border" 
              placeholder="As appearing in NIC" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* NIC Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-gray-400" /> NIC Number
            </label>
            <input 
              required 
              type="text" 
              name="nic" 
              value={formData.nic}
              onChange={onChange} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border" 
              placeholder="e.g. 2000xxxxxxxxx" 
            />
          </div>

          {/* Date of Birth & Age */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" /> Date of Birth
            </label>
            <div className="flex gap-2">
              <input 
                required 
                type="date" 
                name="dob" 
                value={formData.dob}
                onChange={onChange} 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border" 
              />
              <div className={`flex flex-col justify-center items-center px-4 rounded-md border ${
                formData.dob ? (isAgeValid ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700') : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                <span className="text-xs font-bold uppercase">Age</span>
                <span className="text-lg font-bold leading-none">{age}</span>
              </div>
            </div>
          </div>

          {/* Marital Status (Toggle Group) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-gray-400" /> Marital Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className={`cursor-pointer text-center p-2.5 rounded-md border text-sm font-medium transition-colors ${
                formData.maritalStatus === 'unmarried' 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                <input 
                  type="radio" 
                  name="maritalStatus" 
                  value="unmarried" 
                  checked={formData.maritalStatus === 'unmarried'} 
                  onChange={onChange} 
                  className="hidden"
                /> 
                Unmarried
              </label>

              <label className={`cursor-pointer text-center p-2.5 rounded-md border text-sm font-medium transition-colors ${
                formData.maritalStatus === 'married' 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                <input 
                  type="radio" 
                  name="maritalStatus" 
                  value="married" 
                  checked={formData.maritalStatus === 'married'} 
                  onChange={onChange} 
                  className="hidden"
                /> 
                Married
              </label>
            </div>
          </div>

        </div>

        {/* Clergy Option (Conditional) */}
        {activeTab === COURSES.RELIGION && (
          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center">
            <input 
              type="checkbox" 
              id="isClergy"
              name="isClergy" 
              checked={formData.isClergy} 
              onChange={onChange} 
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
            />
            <div className="ml-3">
              <label htmlFor="isClergy" className="text-sm font-bold text-purple-900 cursor-pointer">
                I am a member of the Clergy / Priesthood
              </label>
              <p className="text-xs text-purple-700 mt-0.5">
                Selecting this extends the age limit to 30 years.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PersonalInfoForm;