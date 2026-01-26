import { useState, useEffect } from 'react';
import { calculateAge } from '../utils/helpers';

const GRADE_VALUES = { 'A': 4, 'B': 3, 'C': 2, 'S': 1, 'W': 0, 'F': 0, '': 0 };
const getGradeValue = (g) => GRADE_VALUES[g] || 0;

export const useFormValidation = (formData, activeSubCourse,activeCourse,globalDeadline) => {
  const [errors, setErrors] = useState([]);
  const [canApply, setCanApply] = useState(false);

  useEffect(() => {
    if (!activeSubCourse) return;
    

    const newErrors = [];
    
    const today = new Date();
    // Reset time to midnight for accurate comparison
    today.setHours(0,0,0,0);
    const counts = activeSubCourse.qualificationCount || { alSubjectCount: 3, olSubjectCount: 6 };

     const applicableDateStr = activeSubCourse.closingDate || globalDeadline;

    if (applicableDateStr) {
      const deadline = new Date(applicableDateStr);
      deadline.setHours(0,0,0,0);

      if (today > deadline) {
        newErrors.push(`Application Closed: The deadline was ${applicableDateStr}.`);
      }
    }

    // ==============================================================================
    // 1. GENERAL CHECKS
    // ==============================================================================
    if (formData.maritalStatus === 'married') {
      newErrors.push("Eligibility: Applicant must be Unmarried.");
    }
    const userALGrades = [formData.alGrade1, formData.alGrade2, formData.alGrade3];
    const totalALPasses = userALGrades.filter(g => getGradeValue(g) >= 1).length;

    if (totalALPasses < 3) {
      newErrors.push(`Common Requirement: You must have at least 3 Passes in G.C.E A/L (You have ${totalALPasses}).`);
    }

    // --- 1.3 O/L BASELINE (6 Passes, 3 Credits) ---
    const userOLGrades = [
      formData.olReligion, formData.olLang, formData.olMath, 
      formData.olScience, formData.olEnglish, formData.olHistory,
      formData.olBucket1Grade, formData.olBucket2Grade, formData.olBucket3Grade
    ];

    const totalOLPassess = userOLGrades.filter(g => getGradeValue(g) >= 1).length; // S or better
    const totalOLCredits = userOLGrades.filter(g => getGradeValue(g) >= 2).length; // C or better

    if (totalOLPassess < 9) {
      newErrors.push(`Common Requirement: You must have at least 6 Passes in G.C.E O/L (You have ${totalOLPassess}).`);
    }

    if (totalOLCredits < 3) {
      newErrors.push(`Common Requirement: You must have at least 3 Credits (A, B, or C) in G.C.E O/L (You have ${totalOLCredits}).`);
    }

    if (activeSubCourse.alRules && activeSubCourse.alRules.length > 0) {
      let alRulesMetCount = 0;
      let missingCompulsory = false;

      // Map User's Passed Subjects for easy lookup
      const userALMap = {};
      if (formData.alSubject1 && getGradeValue(formData.alGrade1) >= 1) userALMap[formData.alSubject1.toLowerCase()] = formData.alGrade1;
      if (formData.alSubject2 && getGradeValue(formData.alGrade2) >= 1) userALMap[formData.alSubject2.toLowerCase()] = formData.alGrade2;
      if (formData.alSubject3 && getGradeValue(formData.alGrade3) >= 1) userALMap[formData.alSubject3.toLowerCase()] = formData.alGrade3;

      activeSubCourse.alRules.forEach(rule => {
        const dbSubject = rule.alSubject.toLowerCase();
        const userGrade = userALMap[dbSubject];
        const isPassed = userGrade && getGradeValue(userGrade) >= getGradeValue(rule.grade);

        if (rule.status === true) {
          // COMPULSORY ERROR (Already specific)
          if (!isPassed) {
            newErrors.push(`A/L Compulsory: You must pass '${rule.alSubject}' with '${rule.grade}' or higher.`);
            missingCompulsory = true;
          } else {
            alRulesMetCount++;
          }
        } else {
          // OPTIONAL TRACKING
          if (isPassed) {
            alRulesMetCount++;
          }
        }
      });

      // --- THE UPDATED COUNT ERROR MESSAGE ---
      if (!missingCompulsory) {
        if (alRulesMetCount < counts.alSubjectCount) {
          
          // 1. Get names of Optional Subjects (Status = False)
          const optionalSubjects = activeSubCourse.alRules
            .filter(r => r.status === false)
            .map(r => r.alSubject);

          // 2. Get names of Compulsory Subjects (Status = True)
          const compulsorySubjects = activeSubCourse.alRules
            .filter(r => r.status === true)
            .map(r => r.alSubject);

          // 3. Build the Message
          let msg = `A/L Subject Count: You need ${counts.alSubjectCount} passes from the specific subject list.`;
          
          if (compulsorySubjects.length > 0) {
            msg += ` (Incl. ${compulsorySubjects.join(', ')})`;
          }
          
          if (optionalSubjects.length > 0) {
             msg += ` Your remaining choices must be from: [${optionalSubjects.join(', ')}].`;
          }

          newErrors.push(msg);
        }
      }
    } 
    const age = calculateAge(formData.dob, globalDeadline);
    
    // Get limit from DB, default to 25 if null/undefined
    const maxAge = activeCourse.ageLimit || 25; 

    if (formData.dob && age > maxAge) {
      newErrors.push(`Age Eligibility: You are ${age} years old. The maximum age for this course is ${maxAge}.`);
    }
    
    // ==============================================================================
    // 2. A/L VALIDATION (Compulsory + Count Logic)
    // ==============================================================================
    if (activeSubCourse.alRules && activeSubCourse.alRules.length > 0) {
      let alRulesMetCount = 0;
      let missingCompulsory = false;

      // 1. Collect User's Passed Subjects (Subject Name -> Grade)
      // We normalize names to lowercase to ensure matching works
      const userALMap = {};
      if (formData.alSubject1 && getGradeValue(formData.alGrade1) >= 1) userALMap[formData.alSubject1.toLowerCase()] = formData.alGrade1;
      if (formData.alSubject2 && getGradeValue(formData.alGrade2) >= 1) userALMap[formData.alSubject2.toLowerCase()] = formData.alGrade2;
      if (formData.alSubject3 && getGradeValue(formData.alGrade3) >= 1) userALMap[formData.alSubject3.toLowerCase()] = formData.alGrade3;

      activeSubCourse.alRules.forEach(rule => {
        const dbSubject = rule.alSubject.toLowerCase();
        const userGrade = userALMap[dbSubject];
        const isPassed = userGrade && getGradeValue(userGrade) >= getGradeValue(rule.grade);

        if (rule.status === true) {
          // COMPULSORY CHECK
          if (!isPassed) {
            newErrors.push(`A/L Compulsory: You must pass '${rule.alSubject}' with '${rule.grade}' or higher.`);
            missingCompulsory = true;
          } else {
            alRulesMetCount++; // Met a rule
          }
        } else {
          // OPTIONAL CHECK
          if (isPassed) {
            alRulesMetCount++; // Met a rule
          }
        }
      });

      // COUNT CHECK (Only if they passed the compulsory ones first)
      if (!missingCompulsory) {
        if (alRulesMetCount < counts.alSubjectCount) {
          newErrors.push(`A/L Requirement: You must pass ${counts.alSubjectCount} subjects from the required list (You matched ${alRulesMetCount}).`);
        }
      }
    } 
    // If no specific rules exist, just check raw count of any 3 subjects
    else {
      const totalPasses = [formData.alGrade1, formData.alGrade2, formData.alGrade3].filter(g => getGradeValue(g) >= 1).length;
      if (totalPasses < counts.alSubjectCount) {
        newErrors.push(`A/L Requirement: You must pass at least ${counts.alSubjectCount} subjects.`);
      }
    }

    // ==============================================================================
    // 3. O/L VALIDATION (Compulsory + Count Logic)
    // ==============================================================================
    if (activeSubCourse.olRules && activeSubCourse.olRules.length > 0) {
      let olRulesMetCount = 0;
      let missingCompulsoryOL = false;

      activeSubCourse.olRules.forEach(rule => {
        // Helper to find User's Grade for this rule
        let userGrade = 'F';
        const ruleSub = rule.olSubject.toLowerCase();

        // Map DB Name to Form Field
        if (ruleSub.includes('math')) userGrade = formData.olMath;
        else if (ruleSub.includes('science')) userGrade = formData.olScience;
        else if (ruleSub.includes('english')) userGrade = formData.olEnglish;
        else if (ruleSub.includes('history')) userGrade = formData.olHistory;
        else if (ruleSub.includes('religion')) userGrade = formData.olReligion;
        else if (ruleSub === 'sinhala' || ruleSub === 'tamil') userGrade = formData.olLang;
        else {
          // Check Buckets
          if (formData.olBucket1Sub?.toLowerCase() === ruleSub) userGrade = formData.olBucket1Grade;
          else if (formData.olBucket2Sub?.toLowerCase() === ruleSub) userGrade = formData.olBucket2Grade;
          else if (formData.olBucket3Sub?.toLowerCase() === ruleSub) userGrade = formData.olBucket3Grade;
        }

        const isPassed = getGradeValue(userGrade) >= getGradeValue(rule.grade);

        if (rule.status === true) {
          // COMPULSORY
          if (!isPassed) {
            newErrors.push(`O/L Compulsory: You must pass '${rule.olSubject}' with '${rule.grade}' or higherrrr.`);
            missingCompulsoryOL = true;
          } else {
            olRulesMetCount++;
          }
        } else {
          // OPTIONAL
          if (isPassed) {
            olRulesMetCount++;
          }
        }
      });

      if (!missingCompulsoryOL) {
        if (olRulesMetCount < counts.olSubjectCount) {
           // Note: This checks specific subject matches. 
           // If you also need to check "Any 6 Passes" regardless of rules, keep the generic check below.
           newErrors.push(`O/L Subject Selection: You must pass ${counts.olSubjectCount} subjects from the specific required list.`);
        }
      }
    }

    // 4. GENERIC O/L COUNT (Total Passes in general, e.g., 6 passes total)
    // This is usually required ON TOP of the specific subject rules
    const allOLGrades = [
      formData.olReligion, formData.olLang, formData.olMath, formData.olScience, 
      formData.olEnglish, formData.olHistory, 
      formData.olBucket1Grade, formData.olBucket2Grade, formData.olBucket3Grade
    ];
    const totalOLPasses = allOLGrades.filter(g => getGradeValue(g) >= 1).length;
    
    // In many cases, "olSubjectCount" in DB refers to TOTAL PASSES (e.g. 6), 
    // not just the count of rule-matched subjects. 
    // If your DB "olSubjectCount" means "Total 6 Passes", use this:
    if (totalOLPasses < counts.olSubjectCount) {
        // Avoid duplicate error if the rule-based one triggered
        if (!newErrors.some(e => e.includes("O/L Subject Selection"))) {
            newErrors.push(`O/L Summary: You need a total of ${counts.olSubjectCount} Passes (You have ${totalOLPasses}).`);
        }
    }

    setErrors(newErrors);
    setCanApply(newErrors.length === 0);

  }, [formData, activeSubCourse,globalDeadline]);

  return { errors, canApply };
};