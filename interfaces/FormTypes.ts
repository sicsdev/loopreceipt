import { InputType } from "@interfaces/InputTypes";

export interface FormStateType {
  [key: string]: InputType;
}
export interface FormType {
  initialState: FormStateType;
  formName:
    | "recipientDetailsForm"
    | "companyDetailsForm"
    | "loopersDetailsForm"
    | "editLooperDetailsForm"
    | "signupForm"
    | "resetPasswordForm"
    | "forgotPasswordForm"
    | "updatePasswordForm"
    | "loginForm";
  optionalFields?: FormStateType;
  formHeading?: string;
  methods?: {
    [key: string]: ({
      formState,
      args,
    }: {
      formState: FormStateType;
      args?: any;
    }) => any;
  };

  populateSearchItems?: (args?: any) => void;
  searchItemClicked?: (args?: any) => void;
}
export interface useFormReturnType {
  formState: {
    [key: string]: InputType;
  };
  setFormState: React.Dispatch<
    React.SetStateAction<{
      [key: string]: InputType;
    }>
  >;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  resetForm: () => void;
}
