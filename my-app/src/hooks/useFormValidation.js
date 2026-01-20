import { useState, useEffect } from 'react';
import { validateForm } from '../utils/validation';

export const useFormValidation = (formData, activeTab, subTab, specificMedium) => {
  const [errors, setErrors] = useState([]);
  const [canApply, setCanApply] = useState(false);

  useEffect(() => {
    const validationErrors = validateForm(formData, activeTab, subTab, specificMedium);
    setErrors(validationErrors);
    setCanApply(validationErrors.length === 0);
  }, [formData, activeTab, subTab, specificMedium]);

  return { errors, canApply };
};