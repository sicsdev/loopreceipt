import Navbar from "@components/Navbar";

import Button from "@components/Button";
import InputBox from "@components/Controls/InputBox";
import { makeStyles } from "@material-ui/core";
import { useForm } from "@hooks/useForm";
import { useState } from "react";
import ConfirmDialog from "@components/ConfirmDialog";
import Image from "next/image";
import InputType from "@interfaces/InputType";
import ConfirmDialogType from "@interfaces/ConfirmDialogType";
import validations from "@helpers/validations";

const initialFormState: {
  [key: string]: InputType;
} = {
  receivingCompanyName: {
    name: "receivingCompanyName",
    label: "Receiving Company Name",
    placeholder: "Your full name",
    value: "",
    type: "text",

    validate: function () {
      return (
        // we can give custom message to validation
        validations.isRequired(this, "Receiving Company Name can't be empty") &&
        validations.minMaxLength({ min: 5 })(this)
        // this way we can chain validations
      );
    },
  },

  shippingAddress: {
    name: "shippingAddress",
    label: "Shipping Address",
    placeholder: "Your full name",
    value: "",
    type: "text",

    validate: function () {
      return validations.minMaxLength({ max: 5 })(this);
      // default validation message is used
    },
  },
  country: {
    name: "country",
    label: "Country",
    placeholder: "Your full name",
    value: "",
    type: "text",
    validate: function () {
      return validations.isRequired(this);
    },
    errorText: "custom error",
    customError: true,
    // now custom error message is given to field
    // this message will override all the validation messages
  },
  city: {
    name: "city",
    label: "City",
    placeholder: "Your full name",
    value: "",
    type: "text",
  },
  province: {
    name: "province",
    label: "Province",
    placeholder: "Your full name",
    value: "",
    type: "text",
  },
  zipCode: {
    name: "zipCode",
    label: "Zip Code",
    placeholder: "Your full name",
    value: "",
    type: "number",
  },
};
function Home() {
  const styles = useStyles();
  const { formState, handleInputChange, setFormState } = useForm(
    initialFormState,
    false
  );
  const [searchInput, setSearchInput] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    isOpen: false,
    title: "Save Changes",
    subTitle: "",
    confirmText: "Save Changes",
    cancelText: "Cancel",
    onConfirm: () => {
      console.log("confirmed");
    },
  });
  const handleSubmit = () => {
    validateAllFields();
  };
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
  const validateAllFields = () => {
    setFormState((prevFormState) => {
      const updatedFormState = { ...prevFormState };
      for (const name in updatedFormState) {
        const input = { ...updatedFormState[name] };
        if (input.validate) {
          const valid = input.validate();
          // console.log(valid);
          if (!valid) {
            input.error = input.errorText;
          } else {
            input.error = "";
          }
          // console.log(input);
          updatedFormState[name] = input;
        }
      }
      return updatedFormState;
    });
  };
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="top">
          <div className="searchBar">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter name, email or user group"
            />
            <div className="image">
              <Image src="/icons/search-gray.svg" width={19} height={19} />
            </div>
          </div>
          <Button
            text="Cancel"
            variant="text"
            onClick={() => {
              setConfirmDialog({
                ...confirmDialog,
                isOpen: true,
              });
            }}
          ></Button>
          <Button
            text="Next"
            variant="contained"
            onClick={() => {
              console.log(formState);
              handleSubmit();
            }}
          ></Button>
        </div>
        <div className="rest">
          <form>
            {Object.keys(formState).map((inputName, i) => {
              // console.log(inputName);
              const input = formState[inputName];
              return (
                <InputBox
                  key={i}
                  input={input}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    validateField(inputName);
                  }}
                />
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
const useStyles = makeStyles({
  container: {
    marginTop: "calc(70px + 2rem)",
    borderRadius: "4px",
    border: "1px solid #A09E9E",
    width: "80%",
    margin: "auto",
    minHeight: "80vh",

    "& .top": {
      padding: "1rem",
      borderBottom: "2px solid #DDDDDD",
      display: "flex",
      gap: 10,
      "& .searchBar": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexBasis: "60%",
        marginRight: "auto",
        padding: 8,
        borderRadius: 12,
        boxShadow: "0px 2px 4px rgba(97, 97, 97, 0.18)",
        "& input": {
          backgroundColor: "#e9e9e9",
          outline: "none",
          border: "none",
          height: "100%",
          width: "100%",
          borderRadius: 8,
          padding: 8,
        },
        "& .image": {
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: 20,
        },
      },
    },
    "& .rest": {
      padding: "2rem",
      "& form": {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      },
    },
  },
});
