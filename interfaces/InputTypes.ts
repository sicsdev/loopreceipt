export type InputIconType = "email" | "location" | "phone";
export interface InputType {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  validate?: () => boolean;
  error?: string;
  errorText?: string;
  customError?: boolean;
  iconType?: InputIconType;
  constraints?: string[];
}
