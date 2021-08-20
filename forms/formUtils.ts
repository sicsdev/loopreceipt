import {
  FormStateType,
  FormType,
  useFormReturnType,
} from "@interfaces/FormTypes";
import store from "@store/store";
import {
  EntityLoop,
  EntityLooper,
  EntityLoopMode,
  EntityLoopType,
  EntityRecipient,
} from "apiHelpers/types";
import { v4 as uuidv4 } from "uuid";

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
export const getEntityLoopersFromLoopersState = (
  loopersState: FormStateType
) => {
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
export const getEntityRecipientFromRecipientState = (
  recipientState: FormStateType
) => {
  const recipient: EntityRecipient = {
    email: recipientState.email.value,
    name: recipientState.name.value,
    postalCode: recipientState.zipCode.value,
    address: recipientState.shippingAddress.value,
    city: recipientState.city.value,
    company: recipientState.receivingCompanyName?.value || "Loopreciept.com",
    country: recipientState.country.value || "india",
  };
  return recipient;
};
export const getEntityLoopFromFormsProps = ({
  forms,
  formsProps,
  loopReceiptType,
  loopReceiptMode = "single",
}: {
  forms: FormType[];
  formsProps: useFormReturnType[];
  loopReceiptType: EntityLoopType;
  loopReceiptMode: EntityLoopMode | undefined;
}) => {
  const recipientFormIdx = forms.findIndex(
    (form) => form.formName === "recipientDetailsForm"
  );
  const companyFormIdx = forms.findIndex(
    (form) => form.formName === "companyDetailsForm"
  );
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );
  const loopers = getEntityLoopersFromLoopersState(
    formsProps[loopersFormIndex].formState
  );

  const recipient: EntityRecipient = getEntityRecipientFromRecipientState(
    formsProps[recipientFormIdx].formState
  );
  let loop: EntityLoop;
  switch (loopReceiptType) {
    case "internal": {
      loop = {
        barcode: uuidv4(),
        city: recipient.city,
        country: recipient.country,
        postalCode: recipient.postalCode,
        province: "nothing",
        type: "internal",
        mode: loopReceiptMode,
        loopers,
        recipient,
      };
      break;
    }
    case "external": {
      const companyState = formsProps[companyFormIdx].formState;
      loop = {
        barcode: uuidv4(),
        city: companyState.city.value,
        country: companyState.country.value,
        postalCode: companyState.zipCode.value,
        province: companyState.province.value,
        type: "external",
        mode: loopReceiptMode,
        loopers,
        recipient,
      };
      break;
    }
  }
  return loop;
};
