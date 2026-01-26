export const createNewSubCourse = (id) => ({
  id,
  name: 'New Sub-Course',
  mediums: { sinhala: true, tamil: true, english: false },
  additionalQuals: {
    title: "Additional Qualifications",
    fields: []
  }
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