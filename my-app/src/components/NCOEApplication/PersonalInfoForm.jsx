import React from 'react';
import { calculateAge } from '../../utils/helpers';
import { COURSES } from '../../constants';

const PersonalInfoForm = ({ formData, onChange, activeTab }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-2">
        <label className="label-text">Full Name</label>
        <input 
          required 
          type="text" 
          name="fullName" 
          value={formData.fullName}
          onChange={onChange} 
          className="input-field" 
          placeholder="As per NIC" 
        />
      </div>
      
      <div>
        <label className="label-text">NIC Number</label>
        <input 
          required 
          type="text" 
          name="nic" 
          value={formData.nic}
          onChange={onChange} 
          className="input-field" 
          placeholder="e.g. 2000xxxxxxxxx" 
        />
      </div>
      
      <div>
        <label className="label-text">Date of Birth</label>
        <input 
          required 
          type="date" 
          name="dob" 
          value={formData.dob}
          onChange={onChange} 
          className="input-field" 
        />
        <p className="text-xs text-gray-500 mt-1">
          Age: <span className="font-bold">{calculateAge(formData.dob)}</span>
        </p>
      </div>
      
      <div className="flex flex-col">
        <label className="label-text">Marital Status</label>
        <div className="flex gap-4 mt-2">
          <label>
            <input 
              type="radio" 
              name="maritalStatus" 
              value="unmarried" 
              checked={formData.maritalStatus === 'unmarried'} 
              onChange={onChange} 
              className="mr-2"
            /> 
            Unmarried
          </label>
          <label>
            <input 
              type="radio" 
              name="maritalStatus" 
              value="married" 
              checked={formData.maritalStatus === 'married'} 
              onChange={onChange} 
              className="mr-2"
            /> 
            Married
          </label>
        </div>
      </div>
      
      {activeTab === COURSES.RELIGION && (
        <div className="flex items-center mt-6 col-span-2">
          <input 
            type="checkbox" 
            name="isClergy" 
            checked={formData.isClergy} 
            onChange={onChange} 
            className="w-5 h-5"
          />
          <label className="ml-2 text-sm font-semibold">
            I am Clergy / Priesthood (Age limit 30)
          </label>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoForm;