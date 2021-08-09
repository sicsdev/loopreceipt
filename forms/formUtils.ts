import { EntityLooper } from "apiHelpers/types";
import { FormStateType, useFormReturnType } from "@interfaces/FormTypes";
import store from "@store/store";

export const validateAllFieldsOfForm = (
  formProps: useFormReturnType,
  skipValidation?: boolean
) => {
  if (skipValidation) {
    return true;
  }
  let allFieldsValid = true;
  const updatedFormState = { ...formProps.formState };
  for (const name in updatedFormState) {
    const input = { ...updatedFormState[name] };
    let valid = true;
    if (input.validate) {
      if (input.strictlyMatchDependency) {
        valid = input.validate({
          dependencyValue:
            updatedFormState[input.strictlyMatchDependency].value,
        });
      } else {
        valid = input.validate();
      }
    }
    // console.log(valid);
    if (!valid) {
      input.error = input.errorText;
      allFieldsValid = false;
    } else {
      input.error = "";
    }
    // console.log(input);
    updatedFormState[name] = input;
  }
  formProps.setFormState(updatedFormState);

  return allFieldsValid;
};
export const validateSingleFieldOfForm = (
  fieldName: string,
  formProps: useFormReturnType,
  skipValidation?: boolean
) => {
  if (skipValidation) {
    return true;
  }
  let valid = true;
  const updatedFormState = { ...formProps.formState };

  const input = { ...updatedFormState[fieldName] };
  // console.log(input);
  if (input.validate) {
    if (input.strictlyMatchDependency) {
      valid = input.validate({
        dependencyValue: updatedFormState[input.strictlyMatchDependency].value,
      });
    } else {
      valid = input.validate();
    }
  }
  if (!valid) {
    input.error = input.errorText;
  } else {
    input.error = "";
  }
  updatedFormState[fieldName] = input;

  formProps.setFormState(updatedFormState);
  return valid;
};
export const getLoopers = (loopersState: FormStateType) => {
  const loopers: EntityLooper[] = [];
  if (
    loopersState.looperEmail.validate?.() &&
    loopersState.looperName.validate?.()
  ) {
    loopers.push({
      email: loopersState.looperEmail.value,
      name: loopersState.looperName.value,
    });
  }
  for (let looper of store.getState().searchBar.confirmedLoopers) {
    const { email, name } = looper;
    loopers.push({ email, name });
  }
  return loopers;
};
