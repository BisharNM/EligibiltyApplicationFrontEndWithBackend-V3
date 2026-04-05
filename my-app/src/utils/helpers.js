export const calculateAge = (dobString,referenceDateString) => {
  if (!dobString) return 0;
  const dob = new Date(dobString);
   const cutoff = referenceDateString ? new Date(referenceDateString) : new Date();
  
  let age = cutoff.getFullYear() - dob.getFullYear();
  const m = cutoff.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && cutoff.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const getOLStats = (formData) => {
  const grades = [
    formData.olReligion, 
    formData.olLang, 
    formData.olHistory, 
    formData.olMath, 
    formData.olScience, 
    formData.olEnglish,
    formData.olBucket1Grade, 
    formData.olBucket2Grade, 
    formData.olBucket3Grade
  ];
  
  let passes = 0;
  let credits = 0;
  
  grades.forEach(g => {
    if (['A', 'B', 'C', 'S'].includes(g)) passes++;
    if (['A', 'B', 'C'].includes(g)) credits++;
  });
  
  return { passes, credits };
};

export const getPirivenaStats = (formData) => {
  const grades = [
    formData.pirivenaSinhala, 
    formData.pirivenaPali, 
    formData.pirivenaSanskrit,
    formData.pirivenaEnglish, 
    formData.pirivenaMath, 
    formData.pirivenaDhamma
  ];
  
  let passes = 0;
  let credits = 0;
  
  grades.forEach(g => {
    if (['A', 'B', 'C', 'S'].includes(g)) passes++;
    if (['A', 'B', 'C'].includes(g)) credits++;
  });
  
  return { passes, credits };
};

export const calculateArtRankingScore = (grade) => {
  const scoreMap = {
    'A': 15,
    'B': 10,
    'C': 5,
    'S': 1,
    'F': 0
  };
  return scoreMap[grade] || 0;
};



export const parseMediums = (code) => {
  if (!code) return [];
  const mediums = [];
  const upperCode = code.toUpperCase();
  
  if (upperCode.includes('S')) mediums.push('Sinhala');
  if (upperCode.includes('T')) mediums.push('Tamil');
  if (upperCode.includes('E')) mediums.push('English');
  
  return mediums;
};