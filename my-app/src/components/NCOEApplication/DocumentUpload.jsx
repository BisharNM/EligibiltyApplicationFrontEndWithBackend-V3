import React from 'react';
import { Upload } from 'lucide-react';
import FileUpload from './shared/FileUpload';

const DocumentUpload = ({ onChange }) => (
  <div className="border-t pt-6">
    <h3 className="section-title">
      <Upload className="w-5 h-5 mr-2"/>
      Certificates
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <FileUpload 
        label="Character Certificate" 
        name="charCert" 
        onChange={onChange} 
        required 
      />
      <FileUpload 
        label="Health Certificate" 
        name="healthCert" 
        onChange={onChange} 
        required 
      />
    </div>
  </div>
);

export default DocumentUpload;