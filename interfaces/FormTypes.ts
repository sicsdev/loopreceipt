import { InputType } from "@interfaces/InputTypes";

export interface FormStateType {
  [key: string]: InputType;
}
export interface FormType {
  initialState: FormStateType;
  formName:
    | "recipientDetailsForm"
    | "companyDetailsForm"
    | "loopersDetailsForm";
  formHeading?: string;
  methods?: {
    [key: string]: (formState: FormStateType) => string;
  };
}
