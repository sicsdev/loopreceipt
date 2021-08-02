import InputBox from "@components/Controls/InputBox";
import { makeStyles } from "@material-ui/core";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";

import ConfirmedEntities from "./ConfirmedEntities";
import { useEffect } from "react";
import { validateSingleFieldOfForm } from "forms/formUtils";
import PasswordStrengthBar from "@components/Controls/PasswordStrengthBar";
interface FormProps {
  form: FormType;
  formProps: useFormReturnType;
  validateOnBlur?: boolean;
  autoComplete?: string;
  methodOnBlur?: () => void;
  padForm?: boolean;
  defaultValues?: { [key: string]: string };
}
const Form = ({
  form,
  formProps,
  validateOnBlur = true,
  autoComplete,
  methodOnBlur,
  padForm = true,
  defaultValues,
}: FormProps) => {
  const styles = useStyles();
  const { formState, setFormState, handleInputChange, resetForm } = formProps;
  useEffect(() => {
    // console.log(defaultValues);
    if (defaultValues) {
      const updatedFormState = { ...formState };
      for (let fieldName in defaultValues) {
        const input = { ...updatedFormState[fieldName] };
        updatedFormState[fieldName] = {
          ...input,
          value: defaultValues[fieldName],
          error: "", // no error
        };
      }
      setFormState(updatedFormState);
    }
  }, []);

  return (
    <div>
      <form
        autoComplete={autoComplete}
        className={styles.form}
        style={{
          padding: padForm ? "2rem" : 0,
        }}
      >
        {Object.keys(formState).map((inputName, i) => {
          // console.log(inputName);
          const input = formState[inputName];
          return (
            <InputBox
              key={i}
              input={input}
              onChange={handleInputChange}
              dependency={
                input.dependency ? formState[input.dependency].value : undefined
              }
              onBlur={(e) => {
                if (validateOnBlur) {
                  validateSingleFieldOfForm(inputName, formProps);
                }
                methodOnBlur?.();
              }}
              resetValue={() => {
                // console.log("resetting func called");
                setFormState((prev) => {
                  return {
                    ...prev,
                    [inputName]: { ...prev[inputName], value: "" },
                  };
                });
              }}
            />
          );
        })}
      </form>
      {form.formName === "loopersDetailsForm" && (
        <ConfirmedEntities form={form} formProps={formProps} />
      )}
    </div>
  );
};
export default Form;
const useStyles = makeStyles((theme) => ({
  form: {
    // border: "1px solid pink",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
}));
