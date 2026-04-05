

export const createEmptyConfig = () => ({
  // Use temporary ID for UI key, set to null for backend
  tempId: Date.now(), 
  configId: null, 
  inputLabel: "", 
  inputType: "text", 
  fileCountLimit: "1"
});
export const createEmptyAlRule = () => ({
  alSubject: "",
  grade: "S",
  status: true 
});

export const createEmptyOlRule = () => ({
  olSubject: "",
  grade: "S",
  status: true,
  isBucket: false 
});

export const createDefaultQualCount = () => ({
  alSubjectCount: 3,
  olSubjectCount: 6,
  olCreditsNeeded: 3
});

export const createNewSubCourse = (id, name = "New Specialization") => ({
  subCourseId: typeof id === 'number' ? id : null, 
  subCourseName: name,
  mediumLanguage: "ST",
  qualificationCount: createDefaultQualCount(),
  alRules: [],
  olRules: [],
  additionalConfigs: []
});
export const updateQualsData = (target, action, payload) => {
  const { title, fields } = target;
  let newFields = [...fields];

  if (action === 'ADD_FIELD') {
    newFields.push({ 
      id: Date.now(), 
      type: 'text', 
      label: 'New Input', 
      allowMultiple: false 
    });
  }
  if (action === 'REMOVE_FIELD') {
    newFields = newFields.filter(f => f.id !== payload.id);
  }
  if (action === 'UPDATE_FIELD') {
    newFields = newFields.map(f => 
      f.id === payload.id ? { ...f, [payload.key]: payload.val } : f
    );
  }
  if (action === 'UPDATE_TITLE') {
    return { title: payload.title, fields };
  }

  return { title, fields: newFields };
};