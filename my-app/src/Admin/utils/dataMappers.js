const toNumber = (v) => {
  if (v === null || v === undefined || v === "") return 0;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

export const mapBackendApplicantToFrontend = (app) => {
  
  //  Debug Logs 
  console.log(`Mapping App ID: ${app.stuId}`);
  console.log("A/L Data:", { 
    s1: app.ALSubject1, g1: app.ALSubject1Grade, 
    s2: app.ALSubject2, g2: app.ALSubject2Grade,
    s3: app.ALSubject3, g3: app.ALSubject3Grade 
  });
  console.log("O/L Buckets:", { b1: app.bucket1, b2: app.bucket2, b3: app.bucket3 });
   console.log("O/L Buckets2:", { b1: app.OLMedium, b2: app.fritsLanguageAndLiterature, b3: app.OLMediumGrade,math: app.mathematics,
      science: app.science,
      english: app.english,
      history: app.history, });
  // ------------------

  const z = toNumber(app.ZScore);
  const mediumRaw = app.selectedMedium ||"Sinhala";

  return {
    id: app.stuId,
    displayId: `APP-${app.stuId}`,
    fullName: app.fullName || "N/A",
    nic: app.NICNumber || "",
    dob: app.DOB || null,
    
    gender: app.isMarried ? "Married" : "Unmarried", 
    isMarried: app.isMarried,

    // Course Info
    courseName: app.courseName || "Unknown",
    subCourseName: app.subCourseName || "General",
    medium: String(mediumRaw).toLowerCase(),
    status: (app.status || "pending").toLowerCase(),
    
    // Sorting Helper
    zScoreVal: z, 

    // A/L Results Object
    alResults: {
      year: app.ALYear,
      zScore: app.ZScore || "N/A", 
      stream: app.ALMedium,
      subjects: [
        { name: app.ALSubject1, grade: app.ALSubject1Grade },
        { name: app.ALSubject2, grade: app.ALSubject2Grade },
        { name: app.ALSubject3, grade: app.ALSubject3Grade }
      ]
    },

    // O/L Results Object 
    olResults: {
      medium: app.OLMedium,
      firstLang: app.fritsLanguageAndLiterature, 
      lang: app.OLMediumGrade,
      math: app.mathematics,
      science: app.science,
      english: app.english,
      history: app.history,
      religion: app.ReligionGrade, 
      
      // Buckets (Crucial for display)
      bucket1: app.bucket1, bucket1Grade: app.bucket1Grade,
      bucket2: app.bucket2, bucket2Grade: app.bucket2Grade,
      bucket3: app.bucket3, bucket3Grade: app.bucket3Grade,
    },

    files: {
      charCert: app.characterCertificate ? "Uploaded" : null,
      healthCert: app.healthCertificate ? "Uploaded" : null,
      additional: app.additionalQualifications?.length > 0 ? "Has Documents" : null
    },

    rawData: app
  };
};