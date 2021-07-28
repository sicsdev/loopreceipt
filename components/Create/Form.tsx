import InputBox from "@components/Controls/InputBox";
import { makeStyles } from "@material-ui/core";
import { InputType } from "@interfaces/InputTypes";
import { FormType } from "@interfaces/FormTypes";
import Button from "@components/Controls/Button";
import {
  confirmLooper,
  deleteConfirmedLooper,
} from "@store/slices/searchBarSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Image from "next/image";
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
  const dispatch = useAppDispatch();
  const confirmedLoopers = useAppSelector(
    (state) => state.searchBar.confirmedLoopers
  );
  const validateField = (fieldName: string) => {
    let valid = true;
    const updatedFormState = { ...formState };

    const input = { ...updatedFormState[fieldName] };
    if (input.validate) {
      valid = input.validate();
      // console.log(valid);
      if (!valid) {
        input.error = input.errorText;
      } else {
        input.error = "";
      }
      // console.log(input);
      updatedFormState[fieldName] = input;
    }

    setFormState(updatedFormState);
    return valid;
  };

  return (
    <div>
      <form autoComplete={autoComplete} className={styles.form}>
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
                methodOnBlur?.();
              }}
            />
          );
        })}
      </form>
      {form.formName === "loopersDetailsForm" && (
        <div className={styles.entities}>
          <div className="addbutton">
            <Button
              color="secondary"
              labelColor="white"
              onClick={() => {
                // console.log("click");

                let allValid = true;
                for (let fieldName in formState) {
                  allValid = validateField(fieldName) && allValid;
                }
                if (allValid) {
                  dispatch(
                    confirmLooper({
                      looper: {
                        name: formState["looperName"].value,
                        email: formState["looperEmail"].value,
                      },
                    })
                  );
                  setFormState(form.initialState);
                }
              }}
            >
              + Add more
            </Button>
          </div>
          <div className="confirmedItems">
            {confirmedLoopers.map((looper) => (
              <div key={looper.id} className="confirmedItem">
                <div>
                  {looper.name} - {looper.email}
                </div>
                <div className="buttons">
                  <div className="image">
                    <Image
                      src="/icons/create/edit.svg"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="divider"></div>
                  <div
                    className="image"
                    onClick={() => {
                      dispatch(deleteConfirmedLooper({ id: looper.id }));
                    }}
                  >
                    <Image
                      src="/icons/create/trash.svg"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Form;
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  entities: {
    "& .addbutton": {
      padding: "0 2rem",
    },
    "& .confirmedItems": {
      marginTop: "2rem",
      padding: "0 2rem",
      borderTop: "2px solid #DDDDDD",
      "& .confirmedItem": {
        margin: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .details": {},
        "& .buttons": {
          display: "flex",
          gap: 10,
          "& .divider": {
            width: "2px",
            backgroundColor: "#c4c4c4",
          },
          "& .image": {
            // border: "1px solid red",
            cursor: "pointer",
            display: "flex",
          },
        },
      },
    },
  },
}));
