import { InputType } from "@interfaces/InputTypes";

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
  email: (
    input: InputType,
    errorMessage: string = "Please enter a valid email"
  ) => {
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!input.customError) input.errorText = errorMessage;

    return re.test(input.value.trim().toLowerCase());
  },
};
export default validations;
