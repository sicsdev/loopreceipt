import InputType from "@interfaces/InputType";

const validations = {
  isRequired: (
    input: InputType,
    errorMessage: string = "This field can't be empty"
  ) => {
    if (!input.customError) input.errorText = errorMessage;
    if (input.value) return true;
    return false;
  },
  minMaxLength: ({ min, max }: { min?: number; max?: number }) => {
    return (
      input: InputType,
      errorMessage: string = min && max
        ? `Length should be between ${min} and ${max} characters`
        : min
        ? `Length should be at least ${min} characters long`
        : `Length should be maximum ${max} characters long`
    ) => {
      if (!input.customError) input.errorText = errorMessage;
      if (
        input.value.length >= (min ?? 0) &&
        input.value.length <= (max ?? Infinity)
      )
        return true;
      return false;
    };
  },
};
export default validations;
