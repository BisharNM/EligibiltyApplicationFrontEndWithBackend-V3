



import React from 'react';
import { COURSES } from '../../../constants';
import BuddhismQualifications from './BuddhismQualifications';
import HinduismQualifications from './HinduismQualifications';
import IslamQualifications from './IslamQualifications';
import ChristianityQualifications from './ChristianityQualifications';
import WesternMusicQualifications from './MusicQualifications';
import HealthPEQualifications from './HealthPEQualifications';
import ICTQualifications from './ICTQualifications'; 
import SecondLangQualifications from './SecondLangQualifications';

const AdditionalQualifications = ({ activeTab, subTab, formData, onChange }) => {
  
  // 1. Check for Western Music (Under Art Tab)
  if (activeTab === COURSES.ART && subTab === 'Western Music') {
    return <WesternMusicQualifications formData={formData} onChange={onChange} />;
  }
   // 1. Check for Health & PE (NEW)
  if (activeTab === COURSES.HEALTH_PE) {
    return <HealthPEQualifications formData={formData} onChange={onChange} />;
  }
    if (activeTab === COURSES.ICT) {
    return <ICTQualifications formData={formData} onChange={onChange} />;
  }
  // 2. Check for Religion Tab
  if (activeTab === COURSES.RELIGION) {
    return (
      <>
        {subTab === 'Buddhism' && <BuddhismQualifications formData={formData} onChange={onChange} />}
        {subTab === 'Hinduism' && <HinduismQualifications formData={formData} onChange={onChange} />}
        {subTab === 'Islam' && <IslamQualifications formData={formData} onChange={onChange} />}
        {subTab === 'Catholicism/Christianity' && <ChristianityQualifications formData={formData} onChange={onChange} />}
      </>
    );
  }
  if (activeTab === COURSES.SECOND_LANG) {
  return <SecondLangQualifications formData={formData} onChange={onChange} subTab={subTab} />;
}

  // 3. Default: Return nothing if no additional qualifications are needed
 return null;
};

export default AdditionalQualifications;