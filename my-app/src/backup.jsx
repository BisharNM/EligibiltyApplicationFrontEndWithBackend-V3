import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Upload, FileText, Info } from 'lucide-react';

// --- Constants ---

const COURSES = {
  PRIMARY: 'Primary Education',
  SCIENCE: 'Science',
  MATHS: 'Mathematics',
  SOCIAL_SCIENCE: 'Social Science',
  RELIGION: 'Religion',
  ENGLISH: 'English',
  ART: 'Art'
};

const RELIGION_STREAMS = ['Buddhism', 'Hinduism', 'Islam', 'Catholicism/Christianity'];

const ART_STREAMS = [
  'Art', 'Dance (Oriental)', 'Dance (Bharatha)', 'Music (Oriental)', 
  'Music (Carnatic)', 'Drama and Theatre', 'Western Music'
];

const MEDIUMS = ['Sinhala', 'Tamil', 'English'];

const OL_RELIGIONS = ["Buddhism", "Hinduism", "Islam", "Christianity", "Catholicism"];

// --- A/L Subject Buckets ---
const AL_SUBJECTS_1 = [
  "Biology", "Combined Mathematics", "Engineering Technology", "Bio-system Technology",
  "Sinhala Literature", "Tamil Literature", "English Literature", 
  "Music", "Drama", "Art", "Business Studies", "Sinhala", "Buddhism", "Hinduism","Islam", 
  "Christianity", "Catholicism"
];

const AL_SUBJECTS_2 = [
  "Chemistry", "Accounting", "Business Statistics", "History", 
  "Political Science", "Religion", "Buddhist Civilization", "Hindu Civilization", "Pali", "Sanskrit", "Media Studies", "Science for Technology",
  "Higher Mathematics", "Islamic Civilization", "Arabic", "Islamic Civilization and Arabic", "Christian Civilization"
];

const AL_SUBJECTS_3 = [
  "ICT", "Agriculture", "Economics", "Logic", "Geography", "Physics"
];

// --- O/L Bucket Subject Options ---
const BUCKET_1 = ["Business & Acc. Studies", "Geography", "Civic Education", "Entrepreneurship Studies", "Second Language"];
const BUCKET_2 = ["Art", "Music (Oriental)", "Music (Western)", "Dancing", "English Literature", "Sinhala Literature", "Drama"];
const BUCKET_3 = ["Info. & Comm. Tech (ICT)", "Agriculture", "Home Economics", "Health & Physical Edu.", "Media Studies"];

const calculateAge = (dobString) => {
  if (!dobString) return 0;
  const dob = new Date(dobString);
  const cutoff = new Date('2025-01-01');
  let age = cutoff.getFullYear() - dob.getFullYear();
  const m = cutoff.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && cutoff.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export default function NCOEApplication() {
  // --- State ---
  const [activeTab, setActiveTab] = useState(COURSES.PRIMARY);
  const [subTab, setSubTab] = useState('Sinhala'); 
  const [specificMedium, setSpecificMedium] = useState('Sinhala');
  const [showReligionPopup, setShowReligionPopup] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    nic: '', 
    dob: '',
    gender: 'male',
    maritalStatus: 'unmarried',
    isClergy: false,
    
    // --- A/L DATA ---
    alYear: '',
    zScore: '',
    alMedium: 'Sinhala', 
    alDistrict: '',
    alSubject1: '', alGrade1: 'F',
    alSubject2: '', alGrade2: 'F',
    alSubject3: '', alGrade3: 'F',
    alSubjectGrade: 'A',
    
    // --- O/L DATA ---
    olMedium: 'Sinhala',
    olAttempt: '1',
    olReligionSubject: '', 
    olReligion: 'W',       
    olLang: 'W',
    olHistory: 'W',
    olMath: 'W',
    olScience: 'W',
    olEnglish: 'W',
    olBucket1Sub: '',
    olBucket1Grade: 'W',
    olBucket2Sub: '',
    olBucket2Grade: 'W',
    olBucket3Sub: '',
    olBucket3Grade: 'W',
    olAtt1Passes: 0,
    olAtt1Credits: 0,
    olAtt1Lang: 'W',

    // --- PIRIVENA DATA ---
    isPirivena: false,
    pirivenaSinhala: 'W',
    pirivenaPali: 'W',
    pirivenaSanskrit: 'W',
    pirivenaEnglish: 'W',
    pirivenaMath: 'W',
    pirivenaDhamma: 'W',

    // --- ADD. QUAL. (Buddhism) ---
    examDharmacharya: 'Fail', 
    examPracheena: 'Fail',    
    examDhammaSchool: 'Fail', 

    // --- ADD. QUAL. (Hinduism) ---
    certShaivaSiddhantha: null, 
    certShaivaPulaver: null,    
    certIlangShaiva: null,      

    // --- ADD. QUAL. (Islam) ---
    islamAlimPrelim: 'No', 
    islamAlimFinal: 'No',  
    certMoulavi: null,     

    // --- ADD. QUAL. (Christianity/Catholicism) ---
    christianDenomination: 'Catholic', // 'Catholic' or 'Christian'
    certBishop: null, // 4.8.1.3 Catholic
    certNCC: null,    // 4.8.1.3 Christian
    
    // Catholic Priorities (4.8.2)
    certTheology4Yr: null,
    certPhilosophy: null,
    certDevaDharma: null,
    certNovitiate: null,
    examDahamguru: 'None', // None, 1, 2, 3

    // Christian Priorities (4.8.3)
    certBachelorTheology: null,
    certDiplomaTheology: null,
    certReligiousKnowledge: null, // Dharmacharya

    charCert: null,
    healthCert: null
  });

  const [errors, setErrors] = useState([]);
  const [canApply, setCanApply] = useState(false);
  const [artRankingScore, setArtRankingScore] = useState(0);

  // --- Helper: Calculate O/L Stats ---
  const getOLStats = () => {
    const grades = [
      formData.olReligion, formData.olLang, formData.olHistory, 
      formData.olMath, formData.olScience, formData.olEnglish,
      formData.olBucket1Grade, formData.olBucket2Grade, formData.olBucket3Grade
    ];
    let passes = 0;
    let credits = 0;
    grades.forEach(g => {
      if (['A', 'B', 'C', 'S'].includes(g)) passes++;
      if (['A', 'B', 'C'].includes(g)) credits++;
    });
    return { passes, credits };
  };

  // --- Helper: Calculate Pirivena Stats ---
  const getPirivenaStats = () => {
    const grades = [
      formData.pirivenaSinhala, formData.pirivenaPali, formData.pirivenaSanskrit,
      formData.pirivenaEnglish, formData.pirivenaMath, formData.pirivenaDhamma
    ];
    let passes = 0;
    let credits = 0;
    grades.forEach(g => {
      if (['A', 'B', 'C', 'S'].includes(g)) passes++;
      if (['A', 'B', 'C'].includes(g)) credits++;
    });
    return { passes, credits };
  };

  // --- Tab Logic ---
  const handleTabSwitch = (course) => {
    setActiveTab(course);
    setErrors([]);
    
    if (course === COURSES.RELIGION) {
      setSubTab('Buddhism'); 
      setShowReligionPopup(true);
    } else if (course === COURSES.ART) {
      setSubTab(ART_STREAMS[0]); 
      setSpecificMedium('Sinhala'); 
    } else if (course === COURSES.ENGLISH) {
      setSubTab('English');
    } else {
      setSubTab('Sinhala'); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  // --- Validation ---
  useEffect(() => {
    const validationErrors = [];
    const today = new Date();
    const deadline = new Date('2025-11-28');

    // General
    if (today > deadline) validationErrors.push("Deadline (2025-11-28) passed.");
    if (formData.maritalStatus === 'married') validationErrors.push("Only unmarried applicants eligible.");
    
    // Age
    const age = calculateAge(formData.dob);
    let maxAge = 25;
    if (activeTab === COURSES.RELIGION && formData.isClergy) maxAge = 30;
    if (formData.dob && age > maxAge) validationErrors.push(`Age limit exceeded. Max ${maxAge}.`);

    // A/L Year
    if (formData.alYear && !['2023', '2024'].includes(formData.alYear)) validationErrors.push("Only A/L 2023/2024 accepted.");

    // A/L 3 Passes Validation
    const alGrades = [formData.alGrade1, formData.alGrade2, formData.alGrade3];
    const alPasses = alGrades.filter(g => ['A','B','C','S'].includes(g)).length;
    if (alPasses < 3) {
      validationErrors.push("A/L Requirement: Must have passed (S or higher) in 3 subjects.");
    }

    // --- Course Specific Checks ---

    // SCIENCE
    if (activeTab === COURSES.SCIENCE) {
      const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
      const hasBiology = selectedSubjects.includes("Biology");
      const hasChemistry = selectedSubjects.includes("Chemistry");
      const hasPhysics = selectedSubjects.includes("Physics");

      if (!hasBiology || !hasChemistry || !hasPhysics) {
        validationErrors.push("Science (4.2.1): Must select Biology, Chemistry, and Physics.");
      }

      const creditGrades = ['A', 'B', 'C'];
      if (!creditGrades.includes(formData.olMath) || !creditGrades.includes(formData.olScience)) {
        validationErrors.push("Science (4.2.2): Requires Credit (C) in BOTH Maths and Science.");
      }
    }

    // MATHS
    if (activeTab === COURSES.MATHS) {
      const mathStreamSubjects = ["Combined Mathematics", "Higher Mathematics", "Physics", "Chemistry", "ICT"];
      const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
      const areSubjectsValid = selectedSubjects.every(sub => mathStreamSubjects.includes(sub));

      if (!areSubjectsValid) {
        validationErrors.push("Maths (4.3.1): Subjects must be Combined Maths, Higher Maths, Physics, Chemistry, or ICT.");
      }

      const creditGrades = ['A', 'B', 'C'];
      if (!creditGrades.includes(formData.olMath) || !creditGrades.includes(formData.olScience)) {
        validationErrors.push("Maths (4.3.2): Requires Credit (C) in BOTH Maths and Science.");
      }
    }

    // SOCIAL SCIENCE
    if (activeTab === COURSES.SOCIAL_SCIENCE) {
      const requiredALSubjects = ["History", "Geography", "Political Science", "Economics"];
      const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
      const hasReqSubject = selectedSubjects.some(sub => requiredALSubjects.includes(sub));

      if (!hasReqSubject) {
        validationErrors.push("Social Science (A/L): Must pass 3 subjects including at least one of: History, Geography, Political Science, or Economics.");
      }

      const creditGrades = ['A', 'B', 'C'];
      const hasHistoryCredit = creditGrades.includes(formData.olHistory);
      const isGeoCredit = (formData.olBucket1Sub.includes("Geography") && creditGrades.includes(formData.olBucket1Grade));
      const isCivicCredit = (formData.olBucket1Sub.includes("Civic") && creditGrades.includes(formData.olBucket1Grade));

      if (!hasHistoryCredit && !isGeoCredit && !isCivicCredit) {
        validationErrors.push("Social Science (O/L): Requires Credit (C) in History OR Geography OR Citizenship/Civic Education.");
      }
    }

    // ============================================================
    //  RELIGION VALIDATION
    // ============================================================
    if (activeTab === COURSES.RELIGION) {
      if (['Islam', 'Catholicism/Christianity'].includes(subTab)) {
        if (specificMedium === 'Sinhala' && formData.alMedium !== 'Sinhala') validationErrors.push("Medium Mismatch: A/L must be Sinhala.");
        if (specificMedium === 'Tamil' && formData.alMedium !== 'Tamil') validationErrors.push("Medium Mismatch: A/L must be Tamil.");
      }

      // --- BUDDHISM (4.5) ---
      if (subTab === 'Buddhism') {
        const requiredBudSubjects = ["Buddhism", "Buddhist Civilization", "Pali", "Sanskrit", "Sinhala"];
        const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
        const countMatched = selectedSubjects.filter(sub => requiredBudSubjects.includes(sub)).length;
        
        if (countMatched < 2) validationErrors.push("Buddhism (4.5.1): A/L must include at least two (02) of: Buddhism, Buddhist Civilization, Pali, Sanskrit, Sinhala.");

        const passedOLReligion = ['A', 'B', 'C', 'S'].includes(formData.olReligion);
        if (!formData.isPirivena && !passedOLReligion) validationErrors.push("Buddhism (4.5.2): Requires Ordinary Pass (S) in O/L Buddhism OR Pirivena Final Examination.");

        const hasAdditionalQual = formData.examDharmacharya === 'Pass' || formData.examPracheena === 'Pass' || formData.examDhammaSchool === 'Pass';
        if (!hasAdditionalQual) validationErrors.push("Buddhism (4.5.3-5): Must pass one additional exam (Bauddha Dharmacharya / Pracheena / Dhamma School Final).");
      }

      // --- HINDUISM (4.6) ---
      if (subTab === 'Hinduism') {
        const requiredHinduSubjects = ["Hinduism", "Hindu Civilization", "Sanskrit"];
        const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
        const hasReqSubject = selectedSubjects.some(sub => requiredHinduSubjects.includes(sub));

        if (!hasReqSubject) validationErrors.push("Hinduism (4.6.1): A/L must include at least one of: Hinduism, Hindu Civilization, or Sanskrit.");

        const passedOLHinduism = formData.olReligionSubject === 'Hinduism' && ['A', 'B', 'C', 'S'].includes(formData.olReligion);
        if (!passedOLHinduism) validationErrors.push("Hinduism (4.6.2): Requires Ordinary Pass (S) in O/L Hinduism.");

        const hasCert = formData.certShaivaSiddhantha || formData.certShaivaPulaver || formData.certIlangShaiva;
        if (!hasCert) validationErrors.push("Hinduism (4.6.3-5): Must upload at least one valid certificate.");
      }

      // --- ISLAM (4.7) ---
      if (subTab === 'Islam') {
        const requiredIslamSubjects = ["Islam", "Islamic Civilization", "Arabic", "Islamic Civilization and Arabic"];
        const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
        const hasReqSubject = selectedSubjects.some(sub => requiredIslamSubjects.includes(sub));

        if (!hasReqSubject) validationErrors.push("Islam (4.7.1): A/L must include at least one of: Islam, Islamic Civilization, or Arabic.");

        const passedOLIslam = formData.olReligionSubject === 'Islam' && ['A', 'B', 'C', 'S'].includes(formData.olReligion);
        if (!passedOLIslam) validationErrors.push("Islam (4.7.2): Requires Ordinary Pass (S) in O/L Islam.");

        const passedBothAlim = formData.islamAlimPrelim === 'Yes' && formData.islamAlimFinal === 'Yes';
        const hasMoulaviCert = !!formData.certMoulavi;

        if (!passedBothAlim && !hasMoulaviCert) validationErrors.push("Islam (4.7.3-5): Must pass BOTH Al-Alim Exams (Prelim & Final) OR upload a Moulavi Certificate.");
      }

      // --- CHRISTIANITY / CATHOLICISM (4.8) ---
      if (subTab === 'Catholicism/Christianity') {
        
        // 4.8.1.1: A/L 3 Passes (Already covered by general check `alPasses < 3`)
        
        // 4.8.1.2 O/L Check: Ordinary Pass (S) in Christianity / Catholicism
        const isChrisSub = ['Christianity', 'Catholicism'].includes(formData.olReligionSubject);
        const passedOLRel = isChrisSub && ['A', 'B', 'C', 'S'].includes(formData.olReligion);

        if (!passedOLRel) {
          validationErrors.push("Catholicism/Christianity (4.8.1.2): Requires Ordinary Pass (S) in O/L Christianity or Catholicism.");
        }

        // 4.8.1.3 Identity Check
        if (formData.christianDenomination === 'Catholic' && !formData.certBishop) {
          validationErrors.push("Catholicism (4.8.1.3): Must upload Bishop's Certificate.");
        }
        if (formData.christianDenomination === 'Christian' && !formData.certNCC) {
          validationErrors.push("Christianity (4.8.1.3): Must upload National Christian Council Certificate.");
        }
      }
    }

    // SHARED MEDIUM CHECKS
    if ([COURSES.SCIENCE, COURSES.MATHS, COURSES.PRIMARY, COURSES.SOCIAL_SCIENCE].includes(activeTab)) {
      if (subTab === 'Sinhala' && formData.alMedium !== 'Sinhala') validationErrors.push("Medium Mismatch: A/L must be Sinhala.");
      if (subTab === 'Tamil' && formData.alMedium !== 'Tamil') validationErrors.push("Medium Mismatch: A/L must be Tamil.");
      
      if (subTab === 'English') {
        const hasEngC = ['A', 'B', 'C'].includes(formData.olEnglish);
        const hasLitS = formData.olBucket2Sub.includes("Literature") && ['A', 'B', 'C', 'S'].includes(formData.olBucket2Grade);
        if (!hasEngC && !hasLitS) validationErrors.push("English Medium: Requires O/L English (C) OR Lit (S).");
      }
    }

    // ART
    if (activeTab === COURSES.ART) {
      if (specificMedium === 'Sinhala' && formData.alMedium !== 'Sinhala') validationErrors.push("Medium Mismatch: A/L must be Sinhala.");
      if (specificMedium === 'Tamil' && formData.alMedium !== 'Tamil') validationErrors.push("Medium Mismatch: A/L must be Tamil.");
      if (specificMedium === 'English') {
        const hasEngC = ['A', 'B', 'C'].includes(formData.olEnglish);
        const hasLitS = formData.olBucket2Sub.includes("Literature") && ['A', 'B', 'C', 'S'].includes(formData.olBucket2Grade);
        if (!hasEngC && !hasLitS) validationErrors.push("English Medium: Requires O/L English (C) OR Lit (S).");
      }
      
      let gradeScore = 0;
      if (formData.alSubjectGrade === 'A') gradeScore = 15;
      else if (formData.alSubjectGrade === 'B') gradeScore = 10;
      else if (formData.alSubjectGrade === 'C') gradeScore = 5;
      else if (formData.alSubjectGrade === 'S') gradeScore = 1;
      setArtRankingScore(gradeScore); 
    }

    // ENGLISH
    if (activeTab === COURSES.ENGLISH) {
       const hasEngC = ['A', 'B', 'C'].includes(formData.olEnglish);
       const hasLitS = formData.olBucket2Sub.includes("Literature") && ['A', 'B', 'C', 'S'].includes(formData.olBucket2Grade);
       if (!hasEngC && !hasLitS) validationErrors.push("English Course: Requires O/L English (C) OR Lit (S).");
    }

    // --- O/L Validation (Standard vs Pirivena) ---
    const isPirivenaMode = activeTab === COURSES.RELIGION && subTab === 'Buddhism' && formData.isPirivena;
    
    if (isPirivenaMode) {
      const { passes, credits } = getPirivenaStats();
      const hasMath = ['A', 'B', 'C', 'S'].includes(formData.pirivenaMath);
      const hasSinhala = ['A', 'B', 'C', 'S'].includes(formData.pirivenaSinhala);

      if (passes < 6 || credits < 3 || !hasMath || !hasSinhala) {
        validationErrors.push("Pirivena Exam: Need 6 Passes, 3 Credits, including Mathematics & Sinhala.");
      }
    } else {
      // Standard O/L
      const { passes, credits } = getOLStats();
      const hasMath = ['A', 'B', 'C', 'S'].includes(formData.olMath);
      const hasLang = ['A', 'B', 'C', 'S'].includes(formData.olLang);
      
      if (formData.olAttempt === '1') {
        if (passes < 6 || credits < 3 || !hasMath || !hasLang) {
          validationErrors.push("O/L (1st Att) Fail: Need 6 Passes, 3 Credits, Math & Medium Language.");
        }
      } else {
        const att1Passes = parseInt(formData.olAtt1Passes) || 0;
        const att1Credits = parseInt(formData.olAtt1Credits) || 0;
        const att1Lang = ['A', 'B', 'C', 'S'].includes(formData.olAtt1Lang);
        if (!(passes >= 6 && credits >= 3 && hasMath && hasLang) || !(att1Passes >= 5 && att1Credits >= 3 && att1Lang)) {
          validationErrors.push("O/L (2nd Att) Fail: Check Current results or 1st Attempt prerequisites.");
        }
      }
    }

    setErrors(validationErrors);
    setCanApply(validationErrors.length === 0);

  }, [formData, activeTab, subTab, specificMedium]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(canApply) alert("Application Submitted Successfully! (Simulated)");
    else alert("Please fix errors.");
  };

  const GradeSelect = ({ name, value, onChange, label }) => (
    <div className="flex flex-col">
      {label && <label className="text-xs font-semibold text-gray-600 mb-1">{label}</label>}
      <select name={name} value={value} onChange={onChange} className="border p-2 rounded text-sm w-full">
        <option value="F">Fail / Absent</option>
        <option value="S">S (Pass)</option>
        <option value="C">C (Credit)</option>
        <option value="B">B (Very Good)</option>
        <option value="A">A (Distinction)</option>
      </select>
    </div>
  );

  const QualSelect = ({ name, value, onChange, label }) => (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <select name={name} value={value} onChange={onChange} className="border p-2 rounded text-sm w-full">
        <option value="Fail">Fail / Not Taken</option>
        <option value="Pass">Pass</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans relative">
      
      {/* Religion Warning Popup */}
      {showReligionPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full animate-bounce">
            <div className="flex items-start mb-4">
              <Info className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Eligibility Warning</h3>
                <p className="text-sm text-gray-600 mt-2">You can only apply for the religion you belong to.</p>
              </div>
            </div>
            <button onClick={() => setShowReligionPopup(false)} className="w-full bg-blue-900 text-white py-2 rounded">I Understand</button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        
        <div className="bg-blue-900 text-white p-6 text-center">
          <h1 className="text-2xl font-bold uppercase">Ministry of Education</h1>
          <h2 className="text-lg mt-2 text-blue-200">National College of Education Admission - 2025</h2>
        </div>

        {/* Main Tabs */}
        <div className="flex flex-wrap bg-gray-200">
          {Object.values(COURSES).map((course) => (
            <button key={course} onClick={() => handleTabSwitch(course)}
              className={`flex-1 py-4 text-xs md:text-sm font-bold uppercase border-r border-gray-300 ${activeTab === course ? 'bg-white text-blue-900 border-t-4 border-t-blue-900' : 'text-gray-500 hover:bg-gray-100'}`}>
              {course}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* --- Dynamic Sub-Tabs --- */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            
            {/* PRIMARY, SCIENCE, MATHS & SOCIAL SCIENCE (Shared Mediums) */}
            {([COURSES.SCIENCE, COURSES.MATHS, COURSES.PRIMARY, COURSES.SOCIAL_SCIENCE].includes(activeTab)) && (
              <>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Medium:</label>
                <div className="flex gap-2">
                  {MEDIUMS
                    // Filter: If Primary, remove English.
                    .filter(med => activeTab === COURSES.PRIMARY ? med !== 'English' : true)
                    .map(med => (
                    <button type="button" key={med} onClick={() => setSubTab(med)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${subTab === med ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
                      {med} Medium
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ART */}
            {activeTab === COURSES.ART && (
              <>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Select Art Stream:</label>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {ART_STREAMS.map(stream => (
                    <button type="button" key={stream} onClick={() => setSubTab(stream)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${subTab === stream ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
                      {stream}
                    </button>
                   ))}
                 </div>
                 <label className="block text-sm font-bold text-gray-700 mb-2 border-t border-blue-200 pt-2">Select Medium:</label>
                 <div className="flex gap-2">
                   {MEDIUMS.map(med => (
                     <button type="button" key={med} onClick={() => setSpecificMedium(med)}
                       className={`px-3 py-1 rounded-full text-xs font-bold border ${specificMedium === med ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}>
                       {med} Medium
                     </button>
                   ))}
                 </div>
              </>
            )}

            {/* RELIGION */}
            {activeTab === COURSES.RELIGION && (
              <>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Religion Subject:</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {RELIGION_STREAMS.map(rel => (
                    <button type="button" key={rel} onClick={() => setSubTab(rel)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${subTab === rel ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
                      {rel}
                    </button>
                  ))}
                </div>
                {['Islam', 'Catholicism/Christianity'].includes(subTab) && (
                   <div className="mt-3 pt-3 border-t border-blue-200">
                     <label className="block text-xs font-bold text-gray-600 mb-2">Select Medium:</label>
                     <div className="flex gap-2">
                       {['Sinhala', 'Tamil'].map(med => (
                         <button type="button" key={med} onClick={() => setSpecificMedium(med)}
                           className={`px-3 py-1 text-xs border rounded ${specificMedium === med ? 'bg-green-600 text-white' : 'bg-white'}`}>
                           {med} Medium
                         </button>
                       ))}
                     </div>
                   </div>
                )}
              </>
            )}

            {activeTab === COURSES.ENGLISH && (
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">English Medium</span>
            )}
          </div>

          {/* Section 1: Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="label-text">Full Name</label>
              <input required type="text" name="fullName" onChange={handleInputChange} className="input-field" placeholder="As per NIC" />
            </div>
            <div>
              <label className="label-text">NIC Number</label>
              <input required type="text" name="nic" onChange={handleInputChange} className="input-field" placeholder="e.g. 2000xxxxxxxxx" />
            </div>
            <div>
              <label className="label-text">Date of Birth</label>
              <input required type="date" name="dob" onChange={handleInputChange} className="input-field" />
              <p className="text-xs text-gray-500 mt-1">Age: <span className="font-bold">{calculateAge(formData.dob)}</span></p>
            </div>
            <div className="flex flex-col">
               <label className="label-text">Marital Status</label>
               <div className="flex gap-4 mt-2">
                 <label><input type="radio" name="maritalStatus" value="unmarried" checked={formData.maritalStatus === 'unmarried'} onChange={handleInputChange} className="mr-2"/> Unmarried</label>
                 <label><input type="radio" name="maritalStatus" value="married" checked={formData.maritalStatus === 'married'} onChange={handleInputChange} className="mr-2"/> Married</label>
               </div>
            </div>
            {activeTab === COURSES.RELIGION && (
              <div className="flex items-center mt-6 col-span-2">
                 <input type="checkbox" name="isClergy" checked={formData.isClergy} onChange={handleInputChange} className="w-5 h-5"/>
                 <label className="ml-2 text-sm font-semibold">I am Clergy / Priesthood (Age limit 30)</label>
              </div>
            )}
          </div>

          {/* Section 2: A/L Results */}
          <div className="border-t pt-6">
            <h3 className="section-title"><FileText className="w-5 h-5 mr-2"/>G.C.E A/L Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="label-text">Year</label>
                <select name="alYear" onChange={handleInputChange} className="input-field">
                  <option value="">Select</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              <div>
                <label className="label-text">Z-Score</label>
                <input required type="number" step="0.0001" name="zScore" onChange={handleInputChange} className="input-field" placeholder="e.g. 1.2500" />
              </div>
              <div>
                <label className="label-text">A/L Medium</label>
                <select name="alMedium" value={formData.alMedium} onChange={handleInputChange} className="input-field">
                  {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* 3 Subjects Input with Dropdowns */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-bold text-gray-700 mb-3">Passed Subjects & Grades</label>
              <div className="grid grid-cols-1 gap-3">
                
                {/* Subject 1 */}
                <div className="flex gap-2 items-center">
                   <div className="w-2/3">
                     <select name="alSubject1" onChange={handleInputChange} className="input-field mt-0">
                        <option value="">-- Select Subject 1 --</option>
                        {AL_SUBJECTS_1.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                   </div>
                   <div className="w-1/3">
                     <GradeSelect name="alGrade1" value={formData.alGrade1} onChange={handleInputChange} />
                   </div>
                </div>

                {/* Subject 2 */}
                <div className="flex gap-2 items-center">
                   <div className="w-2/3">
                     <select name="alSubject2" onChange={handleInputChange} className="input-field mt-0">
                        <option value="">-- Select Subject 2 --</option>
                        {AL_SUBJECTS_2.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                   </div>
                   <div className="w-1/3">
                     <GradeSelect name="alGrade2" value={formData.alGrade2} onChange={handleInputChange} />
                   </div>
                </div>

                {/* Subject 3 */}
                <div className="flex gap-2 items-center">
                   <div className="w-2/3">
                     <select name="alSubject3" onChange={handleInputChange} className="input-field mt-0">
                        <option value="">-- Select Subject 3 --</option>
                        {AL_SUBJECTS_3.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                   </div>
                   <div className="w-1/3">
                     <GradeSelect name="alGrade3" value={formData.alGrade3} onChange={handleInputChange} />
                   </div>
                </div>

              </div>
            </div>

            {activeTab === COURSES.ART && (
               <div className="bg-yellow-50 border border-yellow-200 p-4 mt-4 rounded-lg">
                 <h4 className="text-sm font-bold text-yellow-800 mb-2">Art Ranking Details</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="label-text">District</label>
                     <select name="alDistrict" onChange={handleInputChange} className="input-field">
                        <option value="">Select District</option>
                        <option value="Colombo">Colombo</option>
                        {/* Districts... */}
                     </select>
                   </div>
                   <GradeSelect name="alSubjectGrade" value={formData.alSubjectGrade} onChange={handleInputChange} label={`Grade for ${subTab}`} />
                 </div>
               </div>
            )}
          </div>

          {/* Section 3: O/L Results */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="section-title"><CheckCircle className="w-5 h-5 mr-2"/>G.C.E O/L</h3>
               {activeTab === COURSES.RELIGION && subTab === 'Buddhism' && (
                 <label className="flex items-center text-sm font-bold text-purple-700">
                   <input type="checkbox" name="isPirivena" checked={formData.isPirivena} onChange={handleInputChange} className="mr-2"/> 
                   Use Pirivena Results
                 </label>
               )}
            </div>

            {/* --- PIRIVENA TABLE (Buddhism Only) --- */}
            {formData.isPirivena && activeTab === COURSES.RELIGION && subTab === 'Buddhism' ? (
              <div className="bg-purple-50 p-4 rounded-lg">
                 <h4 className="text-sm font-bold text-purple-900 mb-4 border-b border-purple-200 pb-2">
                   Preliminary Pirivena Final Examination
                 </h4>
                 
                 <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700 border border-purple-200">
                    <thead className="text-xs text-purple-900 uppercase bg-purple-100 border-b border-purple-200">
                      <tr>
                        <th className="px-4 py-2 w-1/2">Subject</th>
                        <th className="px-4 py-2 w-1/2">Result</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-b"><td className="px-4 py-2 font-medium">(i) Sinhala</td><td className="px-4 py-2"><GradeSelect name="pirivenaSinhala" value={formData.pirivenaSinhala} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">(ii) Pali</td><td className="px-4 py-2"><GradeSelect name="pirivenaPali" value={formData.pirivenaPali} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">(iii) Sanskrit</td><td className="px-4 py-2"><GradeSelect name="pirivenaSanskrit" value={formData.pirivenaSanskrit} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">(iv) English</td><td className="px-4 py-2"><GradeSelect name="pirivenaEnglish" value={formData.pirivenaEnglish} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">(v) Mathematics</td><td className="px-4 py-2"><GradeSelect name="pirivenaMath" value={formData.pirivenaMath} onChange={handleInputChange} /></td></tr>
                      <tr><td className="px-4 py-2 font-medium">(vi) Thripitaka Dhamma</td><td className="px-4 py-2"><GradeSelect name="pirivenaDhamma" value={formData.pirivenaDhamma} onChange={handleInputChange} /></td></tr>
                    </tbody>
                  </table>
                 </div>

                 <div className="mt-4 p-2 bg-purple-100 text-xs text-purple-900 rounded flex gap-4">
                     <span>Total Passes: <b>{getPirivenaStats().passes}</b></span>
                     <span>Total Credits: <b>{getPirivenaStats().credits}</b></span>
                </div>
              </div>
            ) : (
              // --- STANDARD O/L TABLE ---
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4 w-full md:w-1/2">
                  <label className="label-text">Medium of O/L Examination</label>
                  <select name="olMedium" value={formData.olMedium} onChange={handleInputChange} className="input-field">
                    {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="flex gap-4 mb-4">
                  <label><input type="radio" name="olAttempt" value="1" checked={formData.olAttempt === '1'} onChange={handleInputChange} className="mr-1"/> 1st Att</label>
                  <label><input type="radio" name="olAttempt" value="2" checked={formData.olAttempt === '2'} onChange={handleInputChange} className="mr-1"/> 2nd Att</label>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                      <tr>
                        <th className="px-4 py-2 w-1/2">Subject</th>
                        <th className="px-4 py-2 w-1/2">Result / Grade</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      
                      {/* --- RELIGION ROW (Updated) --- */}
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium">
                          <select name="olReligionSubject" onChange={handleInputChange} value={formData.olReligionSubject} className="border p-1 rounded w-full bg-white">
                            <option value="">-- Select Religion Subject --</option>
                            {OL_RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <GradeSelect name="olReligion" value={formData.olReligion} onChange={handleInputChange} />
                        </td>
                      </tr>

                      <tr className="border-b"><td className="px-4 py-2 font-medium">Medium Language</td><td className="px-4 py-2"><GradeSelect name="olLang" value={formData.olLang} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">History</td><td className="px-4 py-2"><GradeSelect name="olHistory" value={formData.olHistory} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">Mathematics</td><td className="px-4 py-2"><GradeSelect name="olMath" value={formData.olMath} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">Science</td><td className="px-4 py-2"><GradeSelect name="olScience" value={formData.olScience} onChange={handleInputChange} /></td></tr>
                      <tr className="border-b"><td className="px-4 py-2 font-medium">English</td><td className="px-4 py-2"><GradeSelect name="olEnglish" value={formData.olEnglish} onChange={handleInputChange} /></td></tr>

                      <tr className="border-b bg-gray-50">
                        <td className="px-4 py-2">
                           <select name="olBucket1Sub" onChange={handleInputChange} className="border p-1 rounded w-full bg-white">
                              <option value="">-- Basket 1 --</option>
                              {BUCKET_1.map(s => <option key={s} value={s}>{s}</option>)}
                           </select>
                        </td>
                        <td className="px-4 py-2"><GradeSelect name="olBucket1Grade" value={formData.olBucket1Grade} onChange={handleInputChange} /></td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="px-4 py-2">
                           <select name="olBucket2Sub" onChange={handleInputChange} className="border p-1 rounded w-full bg-white">
                              <option value="">-- Basket 2 --</option>
                              {BUCKET_2.map(s => <option key={s} value={s}>{s}</option>)}
                           </select>
                        </td>
                        <td className="px-4 py-2"><GradeSelect name="olBucket2Grade" value={formData.olBucket2Grade} onChange={handleInputChange} /></td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2">
                           <select name="olBucket3Sub" onChange={handleInputChange} className="border p-1 rounded w-full bg-white">
                              <option value="">-- Basket 3 --</option>
                              {BUCKET_3.map(s => <option key={s} value={s}>{s}</option>)}
                           </select>
                        </td>
                        <td className="px-4 py-2"><GradeSelect name="olBucket3Grade" value={formData.olBucket3Grade} onChange={handleInputChange} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-2 bg-blue-50 text-xs text-blue-800 rounded flex gap-4">
                     <span>Total Passes: <b>{getOLStats().passes}</b></span>
                     <span>Total Credits: <b>{getOLStats().credits}</b></span>
                </div>
                
                {formData.olAttempt === '2' && (
                  <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded">
                    <h4 className="text-xs font-bold text-red-800 mb-2">1st Attempt Results Summary</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div><label className="label-text">1st Att. Passes</label><input type="number" name="olAtt1Passes" onChange={handleInputChange} className="input-field"/></div>
                      <div><label className="label-text">1st Att. Credits</label><input type="number" name="olAtt1Credits" onChange={handleInputChange} className="input-field"/></div>
                      <GradeSelect name="olAtt1Lang" value={formData.olAtt1Lang} onChange={handleInputChange} label="1st Att. Lang" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* --- NEW SECTION: Additional Qualifications (Buddhism Only) --- */}
          {activeTab === COURSES.RELIGION && subTab === 'Buddhism' && (
            <div className="border-t pt-6">
              <h3 className="section-title text-orange-800"><FileText className="w-5 h-5 mr-2"/>Additional Qualifications (Buddhism)</h3>
              <p className="text-xs text-gray-500 mb-4 ml-1">Must pass at least one of the following examinations (4.5.3 - 4.5.5).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-orange-50 p-4 rounded-lg border border-orange-200">
                <QualSelect 
                  label="Bauddha Dharmacharya Examination" 
                  name="examDharmacharya" 
                  value={formData.examDharmacharya} 
                  onChange={handleInputChange} 
                />
                <QualSelect 
                  label="Pracheena / Preliminary Examination" 
                  name="examPracheena" 
                  value={formData.examPracheena} 
                  onChange={handleInputChange} 
                />
                <QualSelect 
                  label="Dhamma School Final Examination" 
                  name="examDhammaSchool" 
                  value={formData.examDhammaSchool} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          )}

          {/* --- NEW SECTION: Additional Qualifications (Hinduism Only) --- */}
          {activeTab === COURSES.RELIGION && subTab === 'Hinduism' && (
            <div className="border-t pt-6">
              <h3 className="section-title text-pink-800"><FileText className="w-5 h-5 mr-2"/>Additional Qualifications (Hinduism)</h3>
              <p className="text-xs text-gray-500 mb-4 ml-1">Upload at least one of the following certificates (4.6.3 - 4.6.5).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-pink-50 p-4 rounded-lg border border-pink-200">
                <div className="border-2 border-dashed border-pink-300 p-4 rounded-lg text-center hover:bg-white transition">
                  <label className="cursor-pointer block">
                    <span className="block text-xs font-semibold text-pink-800 mb-2">Shaiva Siddhantha Pandithar</span>
                    <input type="file" name="certShaivaSiddhantha" onChange={handleInputChange} className="text-[10px]" />
                  </label>
                </div>
                
                <div className="border-2 border-dashed border-pink-300 p-4 rounded-lg text-center hover:bg-white transition">
                  <label className="cursor-pointer block">
                    <span className="block text-xs font-semibold text-pink-800 mb-2">Shaiva Pulaver Certificate</span>
                    <input type="file" name="certShaivaPulaver" onChange={handleInputChange} className="text-[10px]" />
                  </label>
                </div>

                <div className="border-2 border-dashed border-pink-300 p-4 rounded-lg text-center hover:bg-white transition">
                  <label className="cursor-pointer block">
                    <span className="block text-xs font-semibold text-pink-800 mb-2">Ilang Shaiva Pulaver Certificate</span>
                    <input type="file" name="certIlangShaiva" onChange={handleInputChange} className="text-[10px]" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* --- NEW SECTION: Additional Qualifications (Islam Only) --- */}
          {activeTab === COURSES.RELIGION && subTab === 'Islam' && (
            <div className="border-t pt-6">
              <h3 className="section-title text-green-800"><FileText className="w-5 h-5 mr-2"/>Additional Qualifications (Islam)</h3>
              <p className="text-xs text-gray-500 mb-4 ml-1">Requirement: Pass both Al-Alim Exams (Prelim & Final) OR upload Moulavi Certificate.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-green-50 p-4 rounded-lg border border-green-200">
                
                {/* 4.7.4 Check */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-green-900 mb-2">Passed Al-Alim Preliminary Exam?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center text-xs"><input type="radio" name="islamAlimPrelim" value="Yes" checked={formData.islamAlimPrelim === 'Yes'} onChange={handleInputChange} className="mr-1"/> Yes</label>
                    <label className="flex items-center text-xs"><input type="radio" name="islamAlimPrelim" value="No" checked={formData.islamAlimPrelim === 'No'} onChange={handleInputChange} className="mr-1"/> No</label>
                  </div>
                </div>

                {/* 4.7.3 Check */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-green-900 mb-2">Passed Al-Alim Final Exam?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center text-xs"><input type="radio" name="islamAlimFinal" value="Yes" checked={formData.islamAlimFinal === 'Yes'} onChange={handleInputChange} className="mr-1"/> Yes</label>
                    <label className="flex items-center text-xs"><input type="radio" name="islamAlimFinal" value="No" checked={formData.islamAlimFinal === 'No'} onChange={handleInputChange} className="mr-1"/> No</label>
                  </div>
                </div>

                {/* 4.7.5 Certificate */}
                <div className="border-2 border-dashed border-green-300 p-4 rounded-lg text-center hover:bg-white transition">
                  <label className="cursor-pointer block">
                    <span className="block text-xs font-semibold text-green-800 mb-2">Moulavi Certificate</span>
                    <input type="file" name="certMoulavi" onChange={handleInputChange} className="text-[10px]" />
                  </label>
                </div>

              </div>
            </div>
          )}

          {/* --- NEW SECTION: Additional Qualifications (Christianity/Catholicism Only) --- */}
          {activeTab === COURSES.RELIGION && subTab === 'Catholicism/Christianity' && (
            <div className="border-t pt-6">
              <h3 className="section-title text-blue-800"><FileText className="w-5 h-5 mr-2"/>Additional Qualifications (Christianity / Catholicism)</h3>
              
              <div className="mb-4 mt-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Denomination:</label>
                <div className="flex gap-4">
                  <label className="flex items-center"><input type="radio" name="christianDenomination" value="Catholic" checked={formData.christianDenomination === 'Catholic'} onChange={handleInputChange} className="mr-2"/> Catholic</label>
                  <label className="flex items-center"><input type="radio" name="christianDenomination" value="Christian" checked={formData.christianDenomination === 'Christian'} onChange={handleInputChange} className="mr-2"/> Christian</label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-4">
                
                {/* Identity Certificates (Required) */}
                <div className="border-2 border-dashed border-blue-300 p-4 rounded-lg bg-white">
                  <label className="cursor-pointer block text-center">
                    <span className="block text-xs font-bold text-red-600 mb-1">
                      {formData.christianDenomination === 'Catholic' ? "Bishop's Certificate (Required)" : "National Christian Council Certificate (Required)"}
                    </span>
                    <input type="file" name={formData.christianDenomination === 'Catholic' ? "certBishop" : "certNCC"} onChange={handleInputChange} className="text-xs" />
                  </label>
                </div>

                {/* Priority Qualifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.christianDenomination === 'Catholic' ? (
                    <>
                      <div className="p-2 border rounded bg-white">
                        <label className="text-xs font-semibold block mb-1">4-Year Theology Course (National Seminary)</label>
                        <input type="file" name="certTheology4Yr" onChange={handleInputChange} className="text-[10px] w-full"/>
                      </div>
                      <div className="p-2 border rounded bg-white">
                        <label className="text-xs font-semibold block mb-1">Philosophy Course (National Seminary)</label>
                        <input type="file" name="certPhilosophy" onChange={handleInputChange} className="text-[10px] w-full"/>
                      </div>
                      <div className="p-2 border rounded bg-white">
                        <label className="text-xs font-semibold block mb-1">Deva Dharma Nikethanaya (3 Year)</label>
                        <input type="file" name="certDevaDharma" onChange={handleInputChange} className="text-[10px] w-full"/>
                      </div>
                      <div className="p-2 border rounded bg-white">
                        <label className="text-xs font-semibold block mb-1">Novitiate Certificate (Clergy)</label>
                        <input type="file" name="certNovitiate" onChange={handleInputChange} className="text-[10px] w-full"/>
                      </div>
                      <div className="p-2 border rounded bg-white col-span-2">
                        <label className="text-xs font-semibold block mb-1">Catholic Dharma Guru Exam</label>
                        <select name="examDahamguru" value={formData.examDahamguru} onChange={handleInputChange} className="border p-1 rounded text-xs w-full">
                          <option value="None">None</option>
                          <option value="1">Dahamguru 1 (Preliminary)</option>
                          <option value="2">Dahamguru 2 (Medium)</option>
                          <option value="3">Dahamguru 3 (Final)</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 border rounded bg-white">
                        <label className="text-xs font-semibold block mb-1">Bachelor of Theology (Pilimatalawa)</label>
                        <input type="file" name="certBachelorTheology" onChange={handleInputChange} className="text-[10px] w-full"/>
                      </div>
                      <div className="p-2 border rounded bg-white">
                        <label className="text-xs font-semibold block mb-1">Diploma in Theology (Pilimatalawa)</label>
                        <input type="file" name="certDiplomaTheology" onChange={handleInputChange} className="text-[10px] w-full"/>
                      </div>
                      <div className="p-2 border rounded bg-white col-span-2">
                        <label className="text-xs font-semibold block mb-1">Religious Knowledge (Dharmacharya - NCC)</label>
                        <input type="file" name="certReligiousKnowledge" onChange={handleInputChange} className="text-[10px] w-full"/>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Document Uploads */}
          <div className="border-t pt-6">
            <h3 className="section-title"><Upload className="w-5 h-5 mr-2"/>Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
                <label className="cursor-pointer block">
                  <span className="block text-sm font-semibold text-gray-600 mb-2">Character Certificate</span>
                  <input required type="file" name="charCert" onChange={handleInputChange} className="text-xs" />
                </label>
              </div>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
                <label className="cursor-pointer block">
                  <span className="block text-sm font-semibold text-gray-600 mb-2">Health Certificate</span>
                  <input required type="file" name="healthCert" onChange={handleInputChange} className="text-xs" />
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            {errors.length > 0 ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex items-center mb-2"><AlertCircle className="w-5 h-5 text-red-500 mr-2" /><p className="font-bold text-red-700">Not Eligible</p></div>
                <ul className="list-disc list-inside text-sm text-red-600">{errors.map((err, idx) => <li key={idx}>{err}</li>)}</ul>
              </div>
            ) : (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /><p className="font-bold text-green-700">Eligible!</p></div>
            )}
            <button type="submit" disabled={!canApply} className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg ${canApply ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-500'}`}>Submit Application</button>
          </div>

        </form>
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; margin-top: 0.25rem; font-size: 0.875rem; }
        .input-field:focus { outline: none; border-color: #1e3a8a; box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.2); }
        .label-text { font-size: 0.875rem; font-weight: 600; color: #374151; }
        .section-title { font-size: 1.125rem; font-weight: 700; color: #1e3a8a; display: flex; align-items: center; }
      `}</style>
    </div>
  );
}