

export const COURSES = {
  PRIMARY: 'Primary Education',
  SCIENCE: 'Science',
  MATHS: 'Mathematics',
  SOCIAL_SCIENCE: 'Social Science',
  RELIGION: 'Religion',
  ENGLISH: 'English',
  ART: 'Art',
  LANGUAGE_LIT: 'Language & Literature',
  HEALTH_PE: 'Health & Physical Edu.',
   FOOD_TECH: 'Food & Consumer Technology',
    AGRI_TECH: 'Agriculture Technology',
    DESIGN_TECH: 'Design & Artistic Product Technology',
     ENG_TECH: 'Design and Engineering Technology',
  ICT: 'Information & Comm. Technology',
    SECOND_LANG: 'Second National Language',
    SPECIAL_EDU: 'Special Needs Education',
    ENTRE_FIN: 'Entrepreneurship & Financial Literacy',
    COUNSELLING: 'Career Guidance & Counselling'
};
export const SECOND_LANG_SUBS = [
  'Second National Language (Sinhala)',
  'Second National Language (Tamil)'
];

export const LANG_SUB_COURSES = [
  'Sinhala Language & Literature',
  'Tamil Language & Literature',
  'English Language & Literature'
];

export const RELIGION_STREAMS = [
  'Buddhism', 
  'Hinduism', 
  'Islam', 
  'Catholicism/Christianity'
];

export const ART_STREAMS = [
  'Art', 
  'Dance (Oriental)', 
  'Dance (Bharatha)', 
  'Music (Oriental)', 
  'Music (Carnatic)', 
  'Drama and Theatre', 
  'Western Music'
];

export const MEDIUMS = ['Sinhala', 'Tamil', 'English'];

export const OL_RELIGIONS = [
  "Buddhism", 
  "Hinduism", 
  "Islam", 
  "Christianity", 
  "Catholicism"
];

export const AL_SUBJECTS_1 = [
  "Biology", "Combined Mathematics", "Engineering Technology", 
  "Bio-system Technology", "Sinhala Literature", "Tamil Literature", 
  "English Literature", "Music", "Drama", "Art", "Business Studies", 
  "Sinhala", "Buddhism", "Hinduism", "Islam", "Christianity", "Catholicism", "English ","Tamil"
];

export const AL_SUBJECTS_2 = [
  "Chemistry", "Accounting", "Business Statistics", "History", 
  "Political Science", "Religion", "Buddhist Civilization", 
  "Hindu Civilization", "Pali", "Sanskrit", "Media Studies", 
  "Science for Technology", "Higher Mathematics", "Islamic Civilization", 
  "Arabic", "Islamic Civilization and Arabic", "Christian Civilization", "Dance (Oriental) ", "Dance (Bharatha)", "Music (Oriental)",
  "Music (Carnatic)", "Drama and Theatre"
];

export const AL_SUBJECTS_3 = [
  "ICT", "Agriculture", "Economics", "Logic", "Geography", "Physics",'Home Economics',"Civil Technology", 
  "Mechanical Technology", 
  "Electrical, Electronic and Information Technology"
];
export const ENTRE_MAIN_SUBJECTS = [
  "Accounting", 
  "Business Studies", 
  "Economics"
];

export const ENTRE_THIRD_SUBJECTS = [
  "Business Statistics", "Geography", "Political Science", "History", 
  "Logic", "Logic & Scientific Method", "English", "German", "French", 
  "Agricultural Science", "Combined Mathematics", "Mathematics", 
  "ICT", "Information & Communication Technology", "Physics"
];
export const BUCKET_1 = [
  "Business & Acc. Studies", 
  "Geography", 
  "Civic Education", 
  "Entrepreneurship Studies", 
  "Second Language (Sinhala)",
  'Second Language (Tamil)',
];

export const BUCKET_2 = [
  "Art", 
  "Music (Oriental)", 
  "Music (Western)", "Music (Carnatic)",
  "Dancing", 
  "English Literature", 
  "Sinhala Literature", 
  "Drama and Theatre",
  "Dance (Oriental)",
  "Dance (Bharatha)"
];

export const BUCKET_3 = [
  "Info. & Comm. Tech (ICT)", 
  "Agriculture", 
  "Home Economics", 
  "Health & Physical Edu.", 
  "Media Studies"
];

export const GRADES = {
  F: 'Fail / Absent',
  S: 'S (Pass)',
  C: 'C (Credit)',
  B: 'B (Very Good)',
  A: 'A (Distinction)',
  W: 'W (Weak/Fail)'
};

export const INITIAL_FORM_STATE = {
  fullName: '',
  nic: '', 
  dob: '',
  gender: 'male',
  maritalStatus: 'unmarried',
  isClergy: false,
  
  alYear: '',
  zScore: '',
  alMedium: 'Sinhala', 
  alDistrict: '',
  alSubject1: '', alGrade1: 'F',
  alSubject2: '', alGrade2: 'F',
  alSubject3: '', alGrade3: 'F',
  alSubjectGrade: 'A',
  
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

  isPirivena: false,
  pirivenaSinhala: 'W',
  pirivenaPali: 'W',
  pirivenaSanskrit: 'W',
  pirivenaEnglish: 'W',
  pirivenaMath: 'W',
  pirivenaDhamma: 'W',

  examDharmacharya: 'Fail', 
  examPracheena: 'Fail',    
  examDhammaSchool: 'Fail', 

  certShaivaSiddhantha: null, 
  certShaivaPulaver: null,    
  certIlangShaiva: null,      

  islamAlimPrelim: 'No', 
  islamAlimFinal: 'No',  
  certMoulavi: null,     

  christianDenomination: 'Catholic',
  certBishop: null,
  certNCC: null,
  certTheology4Yr: null,
  certPhilosophy: null,
  certDevaDharma: null,
  certNovitiate: null,
  examDahamguru: 'None',
  certBachelorTheology: null,
  certDiplomaTheology: null,
  certReligiousKnowledge: null,

  westernMusicGrade5: 'No',         // For 4.17.2.3
  alAdditionalWesternMusic: 'No',   // For 4.17.3.3

  charCert: null,
  healthCert: null,
  healthPECertificates: [], 
  passedGIT: 'No',
   officialLangCourse: 'No',
};