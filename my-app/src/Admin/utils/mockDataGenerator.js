export const generateMockApplicants = (courses) => {
  const apps = [];
  const mediums = ['sinhala', 'tamil', 'english'];
  
  const getRandomSubCourse = (course) => {
    if (course.hasSubCourses && course.subCourses.length > 0) {
      const randomSub = course.subCourses[Math.floor(Math.random() * course.subCourses.length)];
      return { id: randomSub.id, name: randomSub.name };
    }
    return { id: null, name: null };
  };

  for(let i = 1; i <= 50; i++) {
    const course = courses[Math.floor(Math.random() * courses.length)];
    const subCourse = getRandomSubCourse(course);
    
    apps.push({
      id: `APP-${2025000 + i}`,
      fullName: `Student Name ${i}`,
      nic: `${2000 + i}4567890`,
      dob: `200${i % 5}-0${(i % 9) + 1}-${10 + (i % 15)}`,
      gender: i % 2 === 0 ? 'Female' : 'Male',
      address: `No. ${i}, Temple Road, Colombo`,
      courseCode: course.code,
      courseName: course.name,
      subCourseId: subCourse.id,
      subCourseName: subCourse.name,
      medium: mediums[Math.floor(Math.random() * mediums.length)],
      alResults: { 
        year: i % 2 === 0 ? '2023' : '2024', 
        zScore: (1.2 + (i/100)).toFixed(4), 
        subjects: [
          { name: 'Subject 1', grade: ['A', 'B', 'C'][i % 3] }, 
          { name: 'Subject 2', grade: ['A', 'B', 'C'][(i + 1) % 3] }, 
          { name: 'Subject 3', grade: ['A', 'B', 'C'][(i + 2) % 3] }
        ]
      },
      olResults: { 
        math: ['A', 'B', 'C'][i % 3], 
        science: ['A', 'B', 'C'][(i + 1) % 3], 
        english: ['A', 'B', 'C', 'S'][i % 4], 
        lang: 'A' 
      },
      files: {
        charCert: 'character_cert.pdf',
        healthCert: 'health_cert.jpg',
        additional: course.code === 'RELIGION' ? 'dharmacharya.pdf' : null
      },
      status: ['pending', 'approved', 'rejected'][i % 3],
      appliedDate: `2025-01-${10 + (i % 15)}`
    });
  }
  return apps;
};