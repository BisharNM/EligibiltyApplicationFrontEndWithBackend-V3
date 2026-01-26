export const INITIAL_COURSES = [
  {
    id: 1,
    name: "Religion",
    code: "RELIGION",
    hasSubCourses: true,
    mediumConfigType: 'PER_SUB_COURSE',
    qualConfigType: 'PER_SUB_COURSE',
    globalMediums: { sinhala: true, tamil: true, english: true },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: [
      { 
        id: 's1', name: 'Buddhism', 
        mediums: { sinhala: true, tamil: false, english: false },
        additionalQuals: { 
          title: "Additional Qualifications (Buddhism)", 
          fields: [
            { id: 1, type: 'radio', label: "Passed Bauddha Dharmacharya?", options: ["Yes", "No"], allowMultiple: false }
          ] 
        }
      },
      { 
        id: 's2', name: 'Islam', 
        mediums: { sinhala: true, tamil: true, english: false },
        additionalQuals: { 
          title: "Additional Qualifications (Islam)", 
          fields: [
            { id: 2, type: 'file', label: "Moulavi Certificate", allowMultiple: false }
          ] 
        }
      },
      { 
        id: 's3', name: 'Hinduism', 
        mediums: { sinhala: false, tamil: true, english: false },
        additionalQuals: { title: "Additional Qualifications (Hinduism)", fields: [] }
      },
      { 
        id: 's4', name: 'Christianity', 
        mediums: { sinhala: true, tamil: true, english: true },
        additionalQuals: { title: "Additional Qualifications (Christianity)", fields: [] }
      }
    ]
  },
  {
    id: 2,
    name: "Primary Education",
    code: "PRIMARY",
    hasSubCourses: false,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: true, english: false },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: []
  },
  {
    id: 3,
    name: "Science",
    code: "SCIENCE",
    hasSubCourses: true,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: true, english: true },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: [
      { id: 'sci1', name: 'Biology', mediums: { sinhala: true, tamil: true, english: true }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'sci2', name: 'Physics', mediums: { sinhala: true, tamil: true, english: true }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'sci3', name: 'Chemistry', mediums: { sinhala: true, tamil: true, english: true }, additionalQuals: { title: "Additional Qualifications", fields: [] } }
    ]
  },
  {
    id: 4,
    name: "Mathematics",
    code: "MATHS",
    hasSubCourses: false,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: true, english: true },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: []
  },
  {
    id: 5,
    name: "Art",
    code: "ART",
    hasSubCourses: true,
    mediumConfigType: 'GLOBAL',
    qualConfigType: 'GLOBAL',
    globalMediums: { sinhala: true, tamil: false, english: false },
    globalQuals: { title: "Additional Qualifications", fields: [] },
    subCourses: [
      { id: 'art1', name: 'Visual Arts', mediums: { sinhala: true, tamil: false, english: false }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'art2', name: 'Music', mediums: { sinhala: true, tamil: false, english: false }, additionalQuals: { title: "Additional Qualifications", fields: [] } },
      { id: 'art3', name: 'Dance', mediums: { sinhala: true, tamil: false, english: false }, additionalQuals: { title: "Additional Qualifications", fields: [] } }
    ]
  }
];