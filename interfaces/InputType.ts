export default interface InputType {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  validate?: () => boolean;
  error?: string;
  errorText?: string;
  customError?: boolean;
}
