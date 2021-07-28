import InputBox from "@components/Controls/InputBox";
import { makeStyles } from "@material-ui/core";
import { InputType } from "@interfaces/InputTypes";
import { FormType } from "@interfaces/FormTypes";

interface FormProps {
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
  validateOnBlur: boolean;
  autoComplete?: string;
  hiddenFields?: string[];
  methodOnBlur?: () => void;
  form: FormType;
}
const Form = ({
  form,
  formState,
  setFormState,
  handleInputChange,
  resetForm,
  validateOnBlur = true,
  autoComplete,
  methodOnBlur,
}: FormProps) => {
  const styles = useStyles();

  const validateField = (fieldName: string) => {
    setFormState((prevFormState) => {
      const updatedFormState = { ...prevFormState };

      const input = { ...updatedFormState[fieldName] };
      if (input.validate) {
        const valid = input.validate();
        // console.log(valid);
        if (!valid) {
          input.error = input.errorText;
        } else {
          input.error = "";
        }
        // console.log(input);
        updatedFormState[fieldName] = input;
      }

      return updatedFormState;
    });
  };

  return (
    <form autoComplete={autoComplete}>
      {Object.keys(formState).map((inputName, i) => {
        // console.log(inputName);
        const input = formState[inputName];
        return (
          <InputBox
            key={i}
            input={input}
            onChange={handleInputChange}
            dependency={
              input.type === "region" || input.type === "phone"
                ? formState["country"].value
                : ""
            }
            onBlur={(e) => {
              if (validateOnBlur) {
                validateField(inputName);
              }
              if (methodOnBlur) {
                methodOnBlur();
              }
            }}
          />
        );
      })}
    </form>
  );
};
export default Form;
const useStyles = makeStyles((theme) => ({}));
