import { InputType } from "@interfaces/InputTypes";

export interface FormStateType {
  [key: string]: InputType;
}
export interface FormType {
  initialState: FormStateType;
  entity?: FormStateType;
  formName:
    | "recipientDetailsForm"
    | "companyDetailsForm"
    | "loopersDetailsForm";
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
