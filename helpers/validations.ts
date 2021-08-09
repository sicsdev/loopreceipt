import { InputType } from "@interfaces/InputTypes";
import { capitalize } from "@material-ui/core";
import { nToL, splitOnUpperCase } from "./utils";

const validations = {
  isRequired: (
    input: InputType,
    errorMessage: string = "This field can't be empty"
  ) => {
    if (!input.customError) input.errorText = errorMessage;
    if (input.value) return true;
    return false;
  },
  mustMatch: ({ value }: { value: string }) => {
    return (input: InputType, errorMessage?: string) => {
      if (!input.customError)
        input.errorText =
          errorMessage ||
          `${nToL(input.name)} must match with ${nToL(
            input.strictlyMatchDependency ?? ""
          )}`;
      if (input.value === value) {
        return true;
      }
      return false;
    };
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
  atLeastOneUpperCaseCharacter: (
    input: InputType,
    errorMessage: string = nToL(input.name) +
      " should contain at least one upper-case character"
  ) => {
    const re = /[A-Z]/;
    if (!input.customError) input.errorText = errorMessage;
    return re.test(input.value);
  },
  atLeastOneLowerCaseCharacter: (
    input: InputType,
    errorMessage: string = nToL(input.name) +
      " should contain at least one lower-case character"
  ) => {
    const re = /[a-z]/;
    if (!input.customError) input.errorText = errorMessage;
    return re.test(input.value);
  },
  atLeastOneDigit: (
    input: InputType,
    errorMessage: string = nToL(input.name) +
      " should contain at least one digit"
  ) => {
    const re = /\d/;
    if (!input.customError) input.errorText = errorMessage;
    return re.test(input.value);
  },
  atLeastOneSpecialCharacter: (
    input: InputType,
    errorMessage: string = nToL(input.name) +
      " should contain at least one special character"
  ) => {
    const re = /[^A-Za-z0-9 ]/; // [^A-Za-z0-9 ]
    if (!input.customError) input.errorText = errorMessage;
    return re.test(input.value);
  },
};
export default validations;
