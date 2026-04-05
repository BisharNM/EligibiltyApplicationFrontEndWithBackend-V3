import { COURSES ,ENTRE_MAIN_SUBJECTS, ENTRE_THIRD_SUBJECTS} from '../constants';
import { calculateAge, getOLStats, getPirivenaStats } from './helpers';

export const validateForm = (formData, activeTab, subTab, specificMedium) => {
  const validationErrors = [];
  const today = new Date();
  const deadline = new Date('2025-11-28');

  // General validations
  if (today > deadline) {
    validationErrors.push("Deadline (2025-11-28) passed.");
  }
  
  if (formData.maritalStatus === 'married') {
    validationErrors.push("Only unmarried applicants eligible.");
  }

  
  // Age validation
  const age = calculateAge(formData.dob);
  let maxAge = 25;
  if (activeTab === COURSES.RELIGION && formData.isClergy) maxAge = 30;
  if (formData.dob && age > maxAge) {
    validationErrors.push(`Age limit exceeded. Max ${maxAge}.`);
  }

  // A/L Year
  if (formData.alYear && !['2023', '2024'].includes(formData.alYear)) {
    validationErrors.push("Only A/L 2023/2024 accepted.");
  }

  // A/L 3 Passes
  const alGrades = [formData.alGrade1, formData.alGrade2, formData.alGrade3];
  const alPasses = alGrades.filter(g => ['A','B','C','S'].includes(g)).length;
  if (alPasses < 3) {
    validationErrors.push("A/L Requirement: Must have passed (S or higher) in 3 subjects.");
  }

  // Course specific validations
  validateCourseSpecific(validationErrors, formData, activeTab, subTab);
  
  // O/L Validation
  validateOLevel(validationErrors, formData, activeTab, subTab);

  //  Run Global English Medium Check 
  validateEnglishMediumGeneral(validationErrors, formData, activeTab, subTab, specificMedium);
  return validationErrors;
};



//  Checks the English Medium Condition 
const validateEnglishMediumGeneral = (errors, formData, activeTab, subTab, specificMedium) => {
  // Define which grades count
  const creditGrades = ['A', 'B', 'C'];
  const passGrades = ['A', 'B', 'C', 'S'];

  
  let isEnglishMedium = false;

  // Case A: Courses where 'subTab' determines the medium (Science, Maths, Primary, Social Sci, Health PE)
  if ([COURSES.SCIENCE, COURSES.MATHS, COURSES.PRIMARY, COURSES.SOCIAL_SCIENCE, COURSES.HEALTH_PE].includes(activeTab)) {
    if (subTab === 'English') isEnglishMedium = true;
  }

  // Case B: Courses where 'specificMedium' determines the medium (Art, Religion)
  if ([COURSES.ART, COURSES.RELIGION].includes(activeTab)) {
    if (specificMedium === 'English') isEnglishMedium = true;
  }

  
  if (activeTab === COURSES.LANGUAGE_LIT) return;

  // If English Medium is selected, check the condition
  if (isEnglishMedium) {
    const hasEngCredit = creditGrades.includes(formData.olEnglish);
    
    // Check if English Literature is passed in any of the buckets
    let hasLitPass = false;
    if (formData.olBucket1Sub.includes('English Literature') && passGrades.includes(formData.olBucket1Grade)) hasLitPass = true;
    if (formData.olBucket2Sub.includes('English Literature') && passGrades.includes(formData.olBucket2Grade)) hasLitPass = true;
    if (formData.olBucket3Sub.includes('English Literature') && passGrades.includes(formData.olBucket3Grade)) hasLitPass = true;

    if (!hasEngCredit && !hasLitPass) {
      errors.push("English Medium Requirement: You must have a Credit Pass (C) in O/L English OR an Ordinary Pass (S) in O/L English Literature.");
    }
  }
};

const validateCourseSpecific = (errors, formData, activeTab, subTab) => {
  switch(activeTab) {
    case COURSES.SCIENCE:
      validateScience(errors, formData);
      break;
    case COURSES.LANGUAGE_LIT:
      validateLanguageLit(errors, formData, subTab);
      break;
    case COURSES.MATHS:
      validateMaths(errors, formData);
      break;
    case COURSES.SOCIAL_SCIENCE:
      validateSocialScience(errors, formData);
      break;
    case COURSES.RELIGION:
      validateReligion(errors, formData, subTab);
      break;
    case COURSES.ART:
      validateArt(errors, formData, subTab);
      break;
    case COURSES.ENGLISH:
      validateEnglish(errors, formData);
      break;
    case COURSES.HEALTH_PE:
      validateHealthPE(errors, formData);
      break;
    case COURSES.FOOD_TECH: 
      validateFoodTech(errors, formData);
      break;
    case COURSES.AGRI_TECH: 
      validateAgriTech(errors, formData);
      break; 
    case COURSES.DESIGN_TECH:
       validateDesignTech(errors, formData); 
       break;
    case COURSES.ENG_TECH: 
       validateEngTech(errors, formData); 
       break; 
    case COURSES.ICT: 
      validateICT(errors, formData); 
      break;
     case COURSES.SECOND_LANG: 
      validateSecondLang(errors, formData, subTab); 
      break;
      case COURSES.SPECIAL_EDU: 
      
      break; 
    case COURSES.ENTRE_FIN: 
      validateEntreFin(errors, formData); 
      break; 
    case COURSES.COUNSELLING: 
      validateCounselling(errors, formData); 
      break;

  }
};



const validateCounselling = (errors, formData) => {
  const creditGrades = ['A', 'B', 'C'];

  //  A/L - Any 3 subjects 

  // O/L - Credit in Math AND Medium Language
  const hasMathCredit = creditGrades.includes(formData.olMath);
  const hasLangCredit = creditGrades.includes(formData.olLang);

  if (!hasMathCredit || !hasLangCredit) {
    errors.push("Counselling (4.30.2): Requires Credit (C) in BOTH O/L Mathematics and Medium Language (Sinhala/Tamil).");
  }
};

const validateEntreFin = (errors, formData) => {
  const selectedALSubjects = [
    formData.alSubject1, 
    formData.alSubject2, 
    formData.alSubject3
  ];

  //   Requirements 
  // Count how many selected subjects are from the Main Commerce list
  const mainCount = selectedALSubjects.filter(sub => ENTRE_MAIN_SUBJECTS.includes(sub)).length;
  
  // Count how many are from the Approved Third Subject list
  const thirdCount = selectedALSubjects.filter(sub => 
    ENTRE_THIRD_SUBJECTS.some(reqSub => sub.includes(reqSub))
  ).length;

  // Condition 1: All 3 are Main Commerce subjects
  const cond1 = mainCount === 3;

  // Condition 2: 2 Main Commerce + 1 Approved Third Subject
  const cond2 = mainCount === 2 && thirdCount >= 1;

  if (!cond1 && !cond2) {
    errors.push("Entrepreneurship (4.28.1): A/L must be 3 Commerce subjects OR 2 Commerce + 1 approved 3rd subject.");
  }

  //  O/L Requirements 
  // Credit (C) in Business & Accounting Studies OR Entrepreneurship Studies
  const creditGrades = ['A', 'B', 'C'];
  const targetSubjects = ['Business & Acc. Studies', 'Business & Accounting Studies', 'Entrepreneurship Studies'];

  let hasBizCredit = false;

  // Check all 3 buckets
  if (targetSubjects.some(s => formData.olBucket1Sub.includes(s)) && creditGrades.includes(formData.olBucket1Grade)) hasBizCredit = true;
  else if (targetSubjects.some(s => formData.olBucket2Sub.includes(s)) && creditGrades.includes(formData.olBucket2Grade)) hasBizCredit = true;
  else if (targetSubjects.some(s => formData.olBucket3Sub.includes(s)) && creditGrades.includes(formData.olBucket3Grade)) hasBizCredit = true;

  if (!hasBizCredit) {
    errors.push("Entrepreneurship (4.28.2): Requires Credit (C) in O/L Business & Accounting Studies OR Entrepreneurship Studies.");
  }
};
const validateSecondLang = (errors, formData, subTab) => {
  const creditGrades = ['A', 'B', 'C'];
  const passGrades = ['A', 'B', 'C', 'S'];

  //   Second National Language (Sinhala) 
  if (subTab === 'Second National Language (Sinhala)') {
    
    //  A/L Credit in Sinhala
    const hasALSinhalaCredit = 
      (formData.alSubject1 === 'Sinhala' && creditGrades.includes(formData.alGrade1)) ||
      (formData.alSubject2 === 'Sinhala' && creditGrades.includes(formData.alGrade2)) ||
      (formData.alSubject3 === 'Sinhala' && creditGrades.includes(formData.alGrade3));
    
    if (!hasALSinhalaCredit) {
      errors.push("Second Lang (Sinhala) 4.25.1: Requires Credit (C) in A/L Sinhala.");
    }

    //  O/L Credit in Sinhala Lang & Lit
    
    
    let hasOLSinhalaCredit = false;
    
    // Check main lang 
    if (formData.olLang === 'A' || formData.olLang === 'B' || formData.olLang === 'C') {
       //
    }

    // Check Buckets for "Sinhala" or "Second Language (Sinhala)"
    const sinSubjects = ['Sinhala'];
    
    if (sinSubjects.some(s => formData.olMedium.includes(s)) && creditGrades.includes(formData.olLang)) hasOLSinhalaCredit = true;
    
    if (!hasOLSinhalaCredit) {
      errors.push("Second Lang (Sinhala) 4.25.2: Requires Credit (C) in O/L Sinhala Language & Literature.");
    }

    //  O/L Second Language (Tamil) Pass OR Advanced Course (Tamil)
   
    
    let hasOLTamil2ndPass = false;
    // Check buckets for Tamil (Second Language)
    const tam2Subjects = ['Second Language (Tamil)', 'Tamil Language'];
    if (tam2Subjects.some(s => formData.olBucket1Sub.includes(s)) && passGrades.includes(formData.olBucket1Grade)) hasOLTamil2ndPass = true;
    if (tam2Subjects.some(s => formData.olBucket2Sub.includes(s)) && passGrades.includes(formData.olBucket2Grade)) hasOLTamil2ndPass = true;
    if (tam2Subjects.some(s => formData.olBucket3Sub.includes(s)) && passGrades.includes(formData.olBucket3Grade)) hasOLTamil2ndPass = true;

    if (!hasOLTamil2ndPass && formData.officialLangCourse !== 'Yes') {
      errors.push("Second Lang (Sinhala) 4.25.3: Requires O/L Second Language (Tamil) Pass OR Dept. Advanced Course.");
    }
  }

  //   Second National Language (Tamil) 
  if (subTab === 'Second National Language (Tamil)') {
    
    //  A/L Credit in Tamil
    const hasALTamilCredit = 
      (formData.alSubject1 === 'Tamil' && creditGrades.includes(formData.alGrade1)) ||
      (formData.alSubject2 === 'Tamil' && creditGrades.includes(formData.alGrade2)) ||
      (formData.alSubject3 === 'Tamil' && creditGrades.includes(formData.alGrade3));
    
    if (!hasALTamilCredit) {
      errors.push("Second Lang (Tamil) 4.26.1: Requires Credit (C) in A/L Tamil.");
    }

    // O/L Credit in Tamil Lang & Lit
    let hasOLTamilCredit = false;
    const tamSubjects = ['Tamil', 'Second Language (Tamil)', 'Tamil Language and Literature'];
    
    if (tamSubjects.some(s => formData.olMedium.includes(s)) && creditGrades.includes(formData.olLang)) hasOLTamilCredit = true;
  
    if (!hasOLTamilCredit) {
      errors.push("Second Lang (Tamil) 4.26.2: Requires Credit (C) in O/L Tamil Language & Literature.");
    }

    //  O/L Second Language (Sinhala) Pass OR Advanced Course (Sinhala)
    let hasOLSinhala2ndPass = false;
    const sin2Subjects = ['Second Language (Sinhala)', 'Sinhala Language'];
    if (sin2Subjects.some(s => formData.olBucket1Sub.includes(s)) && passGrades.includes(formData.olBucket1Grade)) hasOLSinhala2ndPass = true;
    if (sin2Subjects.some(s => formData.olBucket2Sub.includes(s)) && passGrades.includes(formData.olBucket2Grade)) hasOLSinhala2ndPass = true;
    if (sin2Subjects.some(s => formData.olBucket3Sub.includes(s)) && passGrades.includes(formData.olBucket3Grade)) hasOLSinhala2ndPass = true;

    if (!hasOLSinhala2ndPass && formData.officialLangCourse !== 'Yes') {
      errors.push("Second Lang (Tamil) 4.26.3: Requires O/L Second Language (Sinhala) Pass OR Dept. Advanced Course.");
    }
  }
};
const validateLanguageLit = (errors, formData, subTab) => {
  const creditGrades = ['A', 'B', 'C'];
  const passGrades = ['A', 'B', 'C', 'S'];
  const veryGoodGrades = ['A', 'B'];

  //  1.  Sinhala Language & Literature (4.9) 
  if (subTab === 'Sinhala Language & Literature') {
    //  3 subjects passed + Sinhala (Credit)
    // Check if user selected "Sinhala" as one of their 3 subjects and got C+
    const hasALSinhalaCredit = 
      (formData.alSubject1 === 'Sinhala' && creditGrades.includes(formData.alGrade1)) ||
      (formData.alSubject2 === 'Sinhala' && creditGrades.includes(formData.alGrade2)) ||
      (formData.alSubject3 === 'Sinhala' && creditGrades.includes(formData.alGrade3));
    
    if (!hasALSinhalaCredit) {
      errors.push("Sinhala Lit (4.9.1): Requires Credit (C) or higher in A/L Sinhala Language.");
    }

    //  O/L: Credit in Sinhala Lang & Lit
    // 'olLang' represents the main language subject (Sinhala for Sinhala medium students)
    if (!creditGrades.includes(formData.olLang)) {
      errors.push("Sinhala Lit (4.9.2): Requires Credit (C) in O/L Sinhala Language & Literature.");
    }
  }

  //  2. Tamil Language & Literature (4.10) 
  if (subTab === 'Tamil Language & Literature') {
    // A/L: 3 subjects passed + Tamil (Credit)
    const hasALTamilCredit = 
      (formData.alSubject1 === 'Tamil' && creditGrades.includes(formData.alGrade1)) ||
      (formData.alSubject2 === 'Tamil' && creditGrades.includes(formData.alGrade2)) ||
      (formData.alSubject3 === 'Tamil' && creditGrades.includes(formData.alGrade3));
    
    if (!hasALTamilCredit) {
      errors.push("Tamil Lit (4.10.1): Requires Credit (C) or higher in A/L Tamil Language.");
    }

    //  O/L: Credit in Tamil Lang & Lit
    if (!creditGrades.includes(formData.olLang)) {
      errors.push("Tamil Lit (4.10.2): Requires Credit (C) in O/L Tamil Language & Literature.");
    }
  }

  //   English Language & Literature (4.11) 
  if (subTab === 'English Language & Literature') {
    
    // Check global A/L 3 passes (S or better)
    const alGrades = [formData.alGrade1, formData.alGrade2, formData.alGrade3];
    const alPasses = alGrades.filter(g => passGrades.includes(g)).length;
    const has3ALPasses = alPasses >= 3;

    //  Check if English (Subject 73) was taken in A/L
    const hasALEnglishSub = [formData.alSubject1, formData.alSubject2, formData.alSubject3].includes("English"); 

    //  Get O/L Lit Grade (Usually in Bucket 2)
    const olLitGrade = formData.olBucket2Sub.includes("Literature") ? formData.olBucket2Grade : 'F';

    //  Path 1 (4.11.1) 
    // A/L 3 subs including English (73) AND (O/L Eng Credit OR O/L Lit Pass)
    const path1 = has3ALPasses && hasALEnglishSub && (creditGrades.includes(formData.olEnglish) || passGrades.includes(olLitGrade));
    
    //  Path 2 (4.11.2) 
    // A/L any 3 subs AND (O/L Lit Credit AND O/L Eng Pass)
    const path2 = has3ALPasses && creditGrades.includes(olLitGrade) && passGrades.includes(formData.olEnglish);

    //  Path 3 (4.11.3) 
    // A/L any 3 subs + General English (Pass) AND O/L Eng Very Good (B)
    const path3 = has3ALPasses && passGrades.includes(formData.alGenEnglishGrade) && veryGoodGrades.includes(formData.olEnglish);

    if (!path1 && !path2 && !path3) {
      errors.push("English Lit (4.11): Eligibility not met. You need either:");
      errors.push("1. A/L English (Sub 73) + O/L Eng(C)/Lit(S)");
      errors.push("2. Any A/L + O/L Lit(C) + Eng(S)");
      errors.push("3. Any A/L + A/L Gen. Eng(S) + O/L Eng(B)");
    }
  }
};

const validateICT = (errors, formData) => {
  const creditGrades = ['A', 'B', 'C'];
  const passGrades = ['A', 'B', 'C', 'S'];
  const veryGoodGrades = ['A', 'B'];
  const distinction = ['A'];

  //  A/L ICT Grade
  let alICTGrade = 'F';
  if (formData.alSubject1.includes('Information')) alICTGrade = formData.alGrade1;
  else if (formData.alSubject2.includes('Information')) alICTGrade = formData.alGrade2;
  else if (formData.alSubject3.includes('Information')) alICTGrade = formData.alGrade3;

  //  O/L English Requirement (Common to all paths: Eng(C) OR Lit(S))
  const olLitGrade = formData.olBucket2Sub.includes("English Literature") ? formData.olBucket2Grade : 'F';
  const hasEngReq = creditGrades.includes(formData.olEnglish) || passGrades.includes(olLitGrade);

  if (!hasEngReq) {
    errors.push("ICT: Requires O/L English (Credit) OR O/L Eng Lit (Pass).");
    return; // All paths require this
  }

  //  O/L ICT Grade (Check buckets)
  let olICTGrade = 'F';
  if (formData.olBucket1Sub.includes('ICT')) olICTGrade = formData.olBucket1Grade;
  else if (formData.olBucket2Sub.includes('ICT')) olICTGrade = formData.olBucket2Grade;
  else if (formData.olBucket3Sub.includes('ICT')) olICTGrade = formData.olBucket3Grade;

  //  PATHWAY 1 (4.24.1) 
  // A/L ICT (Credit)
  const path1 = creditGrades.includes(alICTGrade);

  //  PATHWAY 2 (4.24.2) 
  // A/L ICT (Pass) + O/L ICT (Credit)
  const path2 = passGrades.includes(alICTGrade) && creditGrades.includes(olICTGrade);

  //  PATHWAY 3 (4.24.3) - Physical Science Stream 
  // A/L 3 subjects (Physics/Maths usually implied by stream name, checking generic pass )
  // + O/L ICT (Very Good/B)
  const path3 = veryGoodGrades.includes(olICTGrade); 
  

  //  PATHWAY 4 (4.24.4) - Bio Stream 
  // A/L 3 subjects + O/L ICT (Very Good/B)
  // Same O/L requirement as Path 3
  const path4 = veryGoodGrades.includes(olICTGrade);

  //  PATHWAY 5 (4.24.5) - Arts/Commerce/Tech/Other 
  // A/L 3 subjects + O/L ICT (Distinction/A)
  const path5 = distinction.includes(olICTGrade);

  if (!path1 && !path2 && !path3 && !path4 && !path5) {
    errors.push("ICT: Eligibility not met. Check 4.24 (A/L ICT grade OR O/L ICT grade requirements).");
  }
};
//   Validation Function For Engineering 
const validateEngTech = (errors, formData) => {
  const selectedALSubjects = [
    formData.alSubject1, 
    formData.alSubject2, 
    formData.alSubject3
  ];

  // Path 1 (4.23.1): Engineering Tech + Science for Tech + (Any 3rd subject from Tech Stream)
  const path1 = 
    selectedALSubjects.includes('Engineering Technology') && 
    selectedALSubjects.includes('Science for Technology');

  // Path 2 (4.23.2): Hard Technology Subjects
  // Must include ONE of: Civil Tech, Mechanical Tech, or Electrical/Electronic/IT
  const hardTechSubjects = [
    'Civil Technology',
    'Mechanical Technology',
    'Electrical, Electronic and Information Technology'
  ];
  const path2 = selectedALSubjects.some(sub => hardTechSubjects.includes(sub));

  if (!path1 && !path2) {
    errors.push("Design & Eng. Tech: A/L Eligibility not met. Check clauses 4.23.1 (Eng Tech + Sci for Tech) or 4.23.2 (Hard Tech subject).");
  }

  // 4.23.3: O/L Passing
  
};
//   Validation Function For Design Tech 
const validateDesignTech = (errors, formData) => {
  const creditGrades = ['A', 'B', 'C'];

  

  // 4.22.2: O/L - Credit in "Crafts and Arts"
  // This implies checking if any Aesthetic/Art subject was taken and passed with Credit.
  const aestheticSubjects = [
    'Art', 
    'Music (Oriental)', 
    'Music (Western)', 
    'Music (Carnatic)',
    'Dance', 
    'Dance (Oriental)',
    'Dance (Bharatha)',
    'Drama',
    'Drama and Theatre'
  ];

  let hasArtCredit = false;

  // Check Bucket 1
  if (aestheticSubjects.some(sub => formData.olBucket1Sub.includes(sub)) && creditGrades.includes(formData.olBucket1Grade)) hasArtCredit = true;
  // Check Bucket 2
  else if (aestheticSubjects.some(sub => formData.olBucket2Sub.includes(sub)) && creditGrades.includes(formData.olBucket2Grade)) hasArtCredit = true;
  // Check Bucket 3
  else if (aestheticSubjects.some(sub => formData.olBucket3Sub.includes(sub)) && creditGrades.includes(formData.olBucket3Grade)) hasArtCredit = true;

  if (!hasArtCredit) {
    errors.push("Design & Artistic Product Tech (4.22.2): Requires Credit (C) in O/L Art, Music, Dance, or Drama.");
  }
};
const validateFoodTech = (errors, formData) => {
  const selectedALSubjects = [
    formData.alSubject1, 
    formData.alSubject2, 
    formData.alSubject3
  ];

  // Condition - Must include 'Home Economics'
  if (!selectedALSubjects.includes('Home Economics')) {
    errors.push("Food & Consumer Tech (4.14): A/L subjects must include 'Home Economics'.");
  }

  
};

const validateScience = (errors, formData) => {
  const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
  const hasBiology = selectedSubjects.includes("Biology");
  const hasChemistry = selectedSubjects.includes("Chemistry");
  const hasPhysics = selectedSubjects.includes("Physics");

  if (!hasBiology || !hasChemistry || !hasPhysics) {
    errors.push("Science (4.2.1): Must select Biology, Chemistry, and Physics.");
  }

  const creditGrades = ['A', 'B', 'C'];
  if (!creditGrades.includes(formData.olMath) || !creditGrades.includes(formData.olScience)) {
    errors.push("Science (4.2.2): Requires Credit (C) in BOTH Maths and Science.");
  }
};

// Validation Function For Agriculture Technology 
const validateAgriTech = (errors, formData) => {
  const selectedALSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
  
  //  A/L Requirements (One of 3 paths) 

  // Path 1 (4.21.1) Biology Stream -> Agricultural Science + Biology + Chemistry
  const path1 = 
    selectedALSubjects.includes('Agricultural Science') && 
    selectedALSubjects.includes('Biology') && 
    selectedALSubjects.includes('Chemistry');

  // Path 2 (4.21.2)  Tech Stream -> Bio-System Tech + Science for Tech + Agricultural Science
  const path2 = 
    selectedALSubjects.includes('Bio-system Technology') && 
    selectedALSubjects.includes('Science for Technology') && 
    selectedALSubjects.includes('Agricultural Science');

  // Path 3 (4.21.3)  Arts Stream -> Any 3 subjects but MUST include ONE of the specific Agri subjects
  const artsAgriSubjects = [
    'Agricultural Science', 
    'Agro-Technology', 
    'Bio-Resource Technology', 
    'Food Technology'
  ];
  const path3 = selectedALSubjects.some(sub => artsAgriSubjects.includes(sub));

  if (!path1 && !path2 && !path3) {
    errors.push("Agriculture Tech (A/L): Requirements not met. Must satisfy Path 1 (Bio Stream), Path 2 (Tech Stream), or Path 3 (Arts Stream with Agri subject).");
  }

  //  O/L Requirements (4.21.4) 
  
  // 1. Credit in Science
  const creditGrades = ['A', 'B', 'C'];
  if (!creditGrades.includes(formData.olScience)) {
    errors.push("Agriculture Tech (O/L): Requires Credit (C) in Science.");
  }

  // Credit in (Agri & Food Tech OR Aquatic Life Resources)
  const agriSubjects = [
    'Agricultural and Food Technology',
    'Aquatic Life Resources Technology'
  ];

  let hasAgriCredit = false;

  // Check Bucket 1
  if (agriSubjects.includes(formData.olBucket1Sub) && creditGrades.includes(formData.olBucket1Grade)) hasAgriCredit = true;
  // Check Bucket 2
  else if (agriSubjects.includes(formData.olBucket2Sub) && creditGrades.includes(formData.olBucket2Grade)) hasAgriCredit = true;
  // Check Bucket 3
  else if (agriSubjects.includes(formData.olBucket3Sub) && creditGrades.includes(formData.olBucket3Grade)) hasAgriCredit = true;

  if (!hasAgriCredit) {
    errors.push("Agriculture Tech (O/L): Requires Credit (C) in Agricultural & Food Tech OR Aquatic Life Resources Tech.");
  }
};


const validateMaths = (errors, formData) => {
  const mathStreamSubjects = ["Combined Mathematics", "Higher Mathematics", "Physics", "Chemistry", "ICT"];
  const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
  const areSubjectsValid = selectedSubjects.every(sub => mathStreamSubjects.includes(sub));

  if (!areSubjectsValid) {
    errors.push("Maths (4.3.1): Subjects must be Combined Maths, Higher Maths, Physics, Chemistry, or ICT.");
  }

  const creditGrades = ['A', 'B', 'C'];
  if (!creditGrades.includes(formData.olMath) || !creditGrades.includes(formData.olScience)) {
    errors.push("Maths (4.3.2): Requires Credit (C) in BOTH Maths and Science.");
  }
};

const validateSocialScience = (errors, formData) => {
  const requiredALSubjects = ["History", "Geography", "Political Science", "Economics"];
  const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
  const hasReqSubject = selectedSubjects.some(sub => requiredALSubjects.includes(sub));

  if (!hasReqSubject) {
    errors.push("Social Science (A/L): Must pass 3 subjects including at least one of: History, Geography, Political Science, or Economics.");
  }

  const creditGrades = ['A', 'B', 'C'];
  const hasHistoryCredit = creditGrades.includes(formData.olHistory);
  const isGeoCredit = (formData.olBucket1Sub.includes("Geography") && creditGrades.includes(formData.olBucket1Grade));
  const isCivicCredit = (formData.olBucket1Sub.includes("Civic") && creditGrades.includes(formData.olBucket1Grade));

  if (!hasHistoryCredit && !isGeoCredit && !isCivicCredit) {
    errors.push("Social Science (O/L): Requires Credit (C) in History OR Geography OR Citizenship/Civic Education.");
  }
};

const validateReligion = (errors, formData, subTab) => {
  if (subTab === 'Buddhism') {
    validateBuddhism(errors, formData);
  } else if (subTab === 'Hinduism') {
    validateHinduism(errors, formData);
  } else if (subTab === 'Islam') {
    validateIslam(errors, formData);
  } else if (subTab === 'Catholicism/Christianity') {
    validateChristianity(errors, formData);
  }
};

const validateBuddhism = (errors, formData) => {
  const requiredBudSubjects = ["Buddhism", "Buddhist Civilization", "Pali", "Sanskrit", "Sinhala"];
  const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
  const countMatched = selectedSubjects.filter(sub => requiredBudSubjects.includes(sub)).length;
  
  if (countMatched < 2) {
    errors.push("Buddhism (4.5.1): A/L must include at least two (02) of: Buddhism, Buddhist Civilization, Pali, Sanskrit, Sinhala.");
  }

  const passedOLReligion = ['A', 'B', 'C', 'S'].includes(formData.olReligion);
  if (!formData.isPirivena && !passedOLReligion) {
    errors.push("Buddhism (4.5.2): Requires Ordinary Pass (S) in O/L Buddhism OR Pirivena Final Examination.");
  }

  const hasAdditionalQual = formData.examDharmacharya === 'Pass' || 
                            formData.examPracheena === 'Pass' || 
                            formData.examDhammaSchool === 'Pass';
  if (!hasAdditionalQual) {
    errors.push("Buddhism (4.5.3-5): Must pass one additional exam (Bauddha Dharmacharya / Pracheena / Dhamma School Final).");
  }
};

const validateHinduism = (errors, formData) => {
  const requiredHinduSubjects = ["Hinduism", "Hindu Civilization", "Sanskrit"];
  const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
  const hasReqSubject = selectedSubjects.some(sub => requiredHinduSubjects.includes(sub));

  if (!hasReqSubject) {
    errors.push("Hinduism (4.6.1): A/L must include at least one of: Hinduism, Hindu Civilization, or Sanskrit.");
  }

  const passedOLHinduism = formData.olReligionSubject === 'Hinduism' && 
                           ['A', 'B', 'C', 'S'].includes(formData.olReligion);
  if (!passedOLHinduism) {
    errors.push("Hinduism (4.6.2): Requires Ordinary Pass (S) in O/L Hinduism.");
  }

  const hasCert = formData.certShaivaSiddhantha || 
                  formData.certShaivaPulaver || 
                  formData.certIlangShaiva;
  if (!hasCert) {
    errors.push("Hinduism (4.6.3-5): Must upload at least one valid certificate.");
  }
};

const validateIslam = (errors, formData) => {
  const requiredIslamSubjects = ["Islam", "Islamic Civilization", "Arabic", "Islamic Civilization and Arabic"];
  const selectedSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];
  const hasReqSubject = selectedSubjects.some(sub => requiredIslamSubjects.includes(sub));

  if (!hasReqSubject) {
    errors.push("Islam (4.7.1): A/L must include at least one of: Islam, Islamic Civilization, or Arabic.");
  }

  const passedOLIslam = formData.olReligionSubject === 'Islam' && 
                        ['A', 'B', 'C', 'S'].includes(formData.olReligion);
  if (!passedOLIslam) {
    errors.push("Islam (4.7.2): Requires Ordinary Pass (S) in O/L Islam.");
  }

  const passedBothAlim = formData.islamAlimPrelim === 'Yes' && 
                         formData.islamAlimFinal === 'Yes';
  const hasMoulaviCert = !!formData.certMoulavi;

  if (!passedBothAlim && !hasMoulaviCert) {
    errors.push("Islam (4.7.3-5): Must pass BOTH Al-Alim Exams (Prelim & Final) OR upload a Moulavi Certificate.");
  }
};

const validateChristianity = (errors, formData) => {
  const isChrisSub = ['Christianity', 'Catholicism'].includes(formData.olReligionSubject);
  const passedOLRel = isChrisSub && ['A', 'B', 'C', 'S'].includes(formData.olReligion);

  if (!passedOLRel) {
    errors.push("Catholicism/Christianity (4.8.1.2): Requires Ordinary Pass (S) in O/L Christianity or Catholicism.");
  }

  if (formData.christianDenomination === 'Catholic' && !formData.certBishop) {
    errors.push("Catholicism (4.8.1.3): Must upload Bishop's Certificate.");
  }
  if (formData.christianDenomination === 'Christian' && !formData.certNCC) {
    errors.push("Christianity (4.8.1.3): Must upload National Christian Council Certificate.");
  }
};

const validateArt = (errors, formData, subTab) => {
  const creditGrades = ['A', 'B', 'C'];
  const passGrades = ['A', 'B', 'C', 'S'];
  
  
  const selectedALSubjects = [formData.alSubject1, formData.alSubject2, formData.alSubject3];

  //  1. ART (Drawing) 
  if (subTab === 'Art') {
    // 4.12.1: A/L Check (Must include 'Art')
    if (!selectedALSubjects.includes('Art')) {
      errors.push("Art Course (4.12.1): A/L subjects must include 'Art'.");
    }

    // 4.12.2: O/L Check (Credit in Art)
    const hasOLArtCredit = 
      (formData.olBucket1Sub === 'Art' && creditGrades.includes(formData.olBucket1Grade)) ||
      (formData.olBucket2Sub === 'Art' && creditGrades.includes(formData.olBucket2Grade)) ||
      (formData.olBucket3Sub === 'Art' && creditGrades.includes(formData.olBucket3Grade));

    if (!hasOLArtCredit) {
      errors.push("Art Course (4.12.2): Should have passed G.C.E. (O/L) with a minimum of a Credit (C) pass in Art.");
    }
  }
  
  //  Dance (Oriental) 
  else if (subTab === 'Dance (Oriental)') {
    
    // 4.13.1: A/L Check (Must include 'Dancing' or 'Dance (Oriental)')
    
    const hasALDancing = selectedALSubjects.some(sub => sub.includes('Dance (Oriental)') || sub.includes('Dance (Oriental)'));
    
    if (!hasALDancing) {
      errors.push("Dance (Oriental) (4.13.1): A/L subjects must include Dance (Oriental).");
    }

    // 4.13.2: O/L Check (Credit in Dancing (Oriental))
    const hasOLDanceCredit = 
      (formData.olBucket1Sub.includes('Dance (Oriental)') && creditGrades.includes(formData.olBucket1Grade)) ||
      (formData.olBucket2Sub.includes('Dance (Oriental)') && creditGrades.includes(formData.olBucket2Grade)) ||
      (formData.olBucket3Sub.includes('Dance (Oriental)') && creditGrades.includes(formData.olBucket3Grade));

    if (!hasOLDanceCredit) {
      errors.push("Dance (Oriental) (4.13.2): Requires Credit (C) in O/L Dancing (Oriental).");
    }
  }
  else if (subTab === 'Dance (Bharatha)') {
    
    // 4.13.1: A/L Check (Must include 'Dancing' or 'Dance (Oriental)')
    
    const hasALDancing = selectedALSubjects.some(sub => sub.includes('Dance ((Bharatha)') || sub.includes('Dance (Bharatha)'));
    
    if (!hasALDancing) {
      errors.push("Dance (Bharatha) (4.13.1): A/L subjects must include Dance (Bharatha).");
    }

    // 4.13.2: O/L Check (Credit in Dancing (Oriental))
    const hasOLDanceCredit = 
      (formData.olBucket1Sub.includes('Dance (Bharatha)') && creditGrades.includes(formData.olBucket1Grade)) ||
      (formData.olBucket2Sub.includes('Dance (Bharatha)') && creditGrades.includes(formData.olBucket2Grade)) ||
      (formData.olBucket3Sub.includes('Dance (Bharatha)') && creditGrades.includes(formData.olBucket3Grade));

    if (!hasOLDanceCredit) {
      errors.push("Dance (Bharatha) (4.13.2): Requires Credit (C) in O/L Dance (Bharatha).");
    }
  }
   else if (subTab === 'Music (Oriental)') {
    
    // 4.13.1: A/L Check (Must include 'Dancing' or 'Dance (Oriental)')
    
    const hasALDancing = selectedALSubjects.some(sub => sub.includes('Music (Oriental)') || sub.includes('Music (Oriental)'));
    
    if (!hasALDancing) {
      errors.push("Music (Oriental) (4.13.1): A/L subjects must include Music (Oriental).");
    }

    
    const hasOLDanceCredit = 
      (formData.olBucket1Sub.includes('Music (Oriental)') && creditGrades.includes(formData.olBucket1Grade)) ||
      (formData.olBucket2Sub.includes('Music (Oriental)') && creditGrades.includes(formData.olBucket2Grade)) ||
      (formData.olBucket3Sub.includes('Music (Oriental)') && creditGrades.includes(formData.olBucket3Grade));

    if (!hasOLDanceCredit) {
      errors.push("Music (Oriental) (4.13.2): Requires Credit (C) in O/L Music (Oriental).");
    }
  }
  else if (subTab === 'Music (Carnatic)') {
    
   
    
    const hasALDancing = selectedALSubjects.some(sub => sub.includes('Music (Carnatic)') || sub.includes('Music (Carnatic)'));
    
    if (!hasALDancing) {
      errors.push("Music (Carnatic) (4.13.1): A/L subjects must include Music (Carnatic).");
    }

    // 4.13.2: O/L Check (Credit in Music ))
    const hasOLDanceCredit = 
      (formData.olBucket1Sub.includes('Music (Carnatic)') && creditGrades.includes(formData.olBucket1Grade)) ||
      (formData.olBucket2Sub.includes('Music (Carnatic)') && creditGrades.includes(formData.olBucket2Grade)) ||
      (formData.olBucket3Sub.includes('Music (Carnatic)') && creditGrades.includes(formData.olBucket3Grade));

    if (!hasOLDanceCredit) {
      errors.push("Music (Carnatic) (4.13.2): Requires Credit (C) in O/L Music (Carnatic).");
    }
  }
  else if (subTab === 'Drama and Theatre') {
    
    
    const hasALDancing = selectedALSubjects.some(sub => sub.includes('Drama and Theatre') || sub.includes('Drama and Theatre'));
    
    if (!hasALDancing) {
      errors.push("Drama and Theatre (4.13.1): A/L subjects must include Drama and Theatre.");
    }

    // 4.13.2: O/L Check (Credit in Drama and Theatre)
    const hasOLDanceCredit = 
      (formData.olBucket1Sub.includes('Drama and Theatre') && creditGrades.includes(formData.olBucket1Grade)) ||
      (formData.olBucket2Sub.includes('Drama and Theatre') && creditGrades.includes(formData.olBucket2Grade)) ||
      (formData.olBucket3Sub.includes('Drama and Theatre') && creditGrades.includes(formData.olBucket3Grade));

    if (!hasOLDanceCredit) {
      errors.push("Drama and Theatre (4.13.2): Requires Credit (C) in O/L Drama and Theatre.");
    }
  }
    //  Western Music (4.17) 
  if (subTab === 'Western Music') {
    
    s
    let olMusicGrade = 'F';
    if (formData.olBucket1Sub.includes('Western Music')) olMusicGrade = formData.olBucket1Grade;
    else if (formData.olBucket2Sub.includes('Western Music')) olMusicGrade = formData.olBucket2Grade;
    else if (formData.olBucket3Sub.includes('Western Music')) olMusicGrade = formData.olBucket3Grade;

    // 2. Check English Requirement (Common to all 4 paths)
    // Req: O/L English >= C  OR  O/L English Lit >= S
    
   
    let olLitGrade = 'F';
    if (formData.olBucket1Sub.includes('English Literature')) olLitGrade = formData.olBucket1Grade;
    else if (formData.olBucket2Sub.includes('English Literature')) olLitGrade = formData.olBucket2Grade;
    else if (formData.olBucket3Sub.includes('English Literature')) olLitGrade = formData.olBucket3Grade;

    const hasEnglishReq = creditGrades.includes(formData.olEnglish) || passGrades.includes(olLitGrade);

    if (!hasEnglishReq) {
      errors.push("Western Music: Requires O/L English (Credit) OR O/L English Literature (Pass).");
      return; 
    }

    //  CHECK THE 4 PATHWAYS 

    // Pathway 1 (4.17.1): A/L Western Music + O/L Music (Credit)
    const path1 = selectedALSubjects.includes('Western Music') && creditGrades.includes(olMusicGrade);

    // Pathway 2 (4.17.2): Any 3 A/L + O/L Music (Pass) + Grade 5 Cert
    const path2 = passGrades.includes(olMusicGrade) && formData.westernMusicGrade5 === 'Yes';

    // Pathway 3 (4.17.3): Any 3 A/L + O/L Music (Pass) + A/L Additional Music
    const path3 = passGrades.includes(olMusicGrade) && formData.alAdditionalWesternMusic === 'Yes';

    // Pathway 4 (4.17.4): Any 3 A/L + O/L Music (Distinction 'A')
    const path4 = olMusicGrade === 'A';

    if (!path1 && !path2 && !path3 && !path4) {
      errors.push("Western Music: Eligibility not met. Must satisfy one of:");
      errors.push("1. A/L Music + O/L Music(C)");
      errors.push("2. O/L Music(S) + Grade 5 Certificate");
      errors.push("3. O/L Music(S) + A/L Additional Music");
      errors.push("4. O/L Music(A)");
    }
  }
};
const validateHealthPE = (errors, formData) => {
  // A/L Requirement: Usually 3 passes
  
  // checking standard General validation is often enough unless gazette specifies otherwise.
  
  // Check if at least one certificate is uploaded
  if (!formData.healthPECertificates || formData.healthPECertificates.length === 0) {
    errors.push("Health & PE: Please upload at least one sports/activity certificate.");
  }
};

const validateEnglish = (errors, formData) => {
  const hasEngC = ['A', 'B', 'C'].includes(formData.olEnglish);
  const hasLitS = formData.olBucket2Sub.includes("Literature") && 
                  ['A', 'B', 'C', 'S'].includes(formData.olBucket2Grade);
  if (!hasEngC && !hasLitS) {
    errors.push("English Course: Requires O/L English (C) OR Lit (S).");
  }
};

const validateOLevel = (errors, formData, activeTab, subTab) => {
  const isPirivenaMode = activeTab === COURSES.RELIGION && 
                         subTab === 'Buddhism' && 
                         formData.isPirivena;
  
  if (isPirivenaMode) {
    const { passes, credits } = getPirivenaStats(formData);
    const hasMath = ['A', 'B', 'C', 'S'].includes(formData.pirivenaMath);
    const hasSinhala = ['A', 'B', 'C', 'S'].includes(formData.pirivenaSinhala);

    if (passes < 6 || credits < 3 || !hasMath || !hasSinhala) {
      errors.push("Pirivena Exam: Need 6 Passes, 3 Credits, including Mathematics & Sinhala.");
    }
  } else {
    const { passes, credits } = getOLStats(formData);
    const hasMath = ['A', 'B', 'C', 'S'].includes(formData.olMath);
    const hasLang = ['A', 'B', 'C', 'S'].includes(formData.olLang);
    
    if (formData.olAttempt === '1') {
      if (passes < 6 || credits < 3 || !hasMath || !hasLang) {
        errors.push("O/L (1st Att) Fail: Need 6 Passes, 3 Credits, Math & Medium Language.");
      }
    } else {
      const att1Passes = parseInt(formData.olAtt1Passes) || 0;
      const att1Credits = parseInt(formData.olAtt1Credits) || 0;
      const att1Lang = ['A', 'B', 'C', 'S'].includes(formData.olAtt1Lang);
      
      if (!(passes >= 6 && credits >= 3 && hasMath && hasLang) || 
          !(att1Passes >= 5 && att1Credits >= 3 && att1Lang)) {
        errors.push("O/L (2nd Att) Fail: Check Current results or 1st Attempt prerequisites.");
      }
    }
  }
};