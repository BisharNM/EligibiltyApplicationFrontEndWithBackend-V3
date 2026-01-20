import React from 'react';
import { FileText, X, UploadCloud } from 'lucide-react';

const HealthPEQualifications = ({ formData, onChange }) => {
  
  // Handler to add a new file to the array
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      
      // Create a new array with existing files + new file
      const updatedList = [...(formData.healthPECertificates || []), newFile];
      
      // Simulate standard onChange event for the parent component
      onChange({
        target: {
          name: 'healthPECertificates',
          value: updatedList,
          type: 'file-list' // Custom type indicator if needed
        }
      });
    }
  };

  // Handler to remove a file by index
  const removeFile = (indexToRemove) => {
    const updatedList = formData.healthPECertificates.filter((_, index) => index !== indexToRemove);
    
    onChange({
      target: {
        name: 'healthPECertificates',
        value: updatedList,
        type: 'file-list'
      }
    });
  };

  return (
    <div className="border-t pt-6">
      <h3 className="section-title text-teal-800">
        <FileText className="w-5 h-5 mr-2"/>
        Sports & Physical Education Certificates
      </h3>
      <p className="text-xs text-gray-500 mb-4 ml-1">
        Upload International, National, or Provincial level sports certificates. You can upload multiple files.
      </p>
      
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
        
        {/* Upload Button */}
        <div className="flex items-center justify-center w-full mb-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-teal-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-teal-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 text-teal-500 mb-2"/>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> a certificate</p>
              <p className="text-xs text-gray-500">PDF, JPG, or PNG</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              // Remove 'multiple' attribute here to force adding one by one for better state control, 
              // or keep it and loop through files in the handler.
            />
          </label>
        </div>

        {/* File List */}
        <div className="space-y-2">
          {formData.healthPECertificates && formData.healthPECertificates.length > 0 ? (
            formData.healthPECertificates.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-teal-200 rounded-md shadow-sm">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-teal-600 mr-2"/>
                  <span className="text-sm font-medium text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-400 ml-2">({(file.size / 1024).toFixed(0)} KB)</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4"/>
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center italic">No certificates uploaded yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default HealthPEQualifications;