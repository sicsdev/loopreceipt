import { useState } from "react";
export function useForm(
  initialFValues: any,
  validate: any,
  validateOnChange = false
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState<any>({});
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };
  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  };
}
