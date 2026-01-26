import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Application from './components/NCOEApplication/index.jsx'
import AdminDashboard from './Admin/AdminDashboard.jsx';
import Admin2 from './Admin/components/Applicants/ApplicantDetailView.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Application />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin2" element={<Admin2 />} />
    </Routes>
      
    </BrowserRouter>
  )
}

export default App