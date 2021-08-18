import { useEffect } from "react";
import InputBox from "@components/Controls/InputBox";
import { Box } from "@material-ui/core";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { makeStyles } from "@material-ui/core";
import { validateSingleFieldOfForm } from "@forms/formUtils";
import ProfileFormDetails from "./profileFormDetails";

interface FormProps {
  form: FormType;
  formProps: useFormReturnType;
  validateOnBlur?: boolean;
  autoComplete?: string;
  methodOnBlur?: () => void;
  padForm?: boolean;
  defaultValues?: { [key: string]: string };
  onSubmit?: Function;
  children?: any;
}

export default function ProfileForm({
  form,
  formProps,
  validateOnBlur = true,
  autoComplete,
  methodOnBlur,
  padForm = true,
  defaultValues,
  onSubmit,
  children,
}: FormProps) {
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
      //   setFormState(updatedFormState);
    }
  }, []);

  return (
    <Box>
      <form
        autoComplete={autoComplete}
        className={styles.form}
        style={{
          padding: padForm ? "2rem" : 0,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
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
                console.log("resetting func called");
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
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    // border: "1px solid pink",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
}));
