import Button from "@components/Button";

import { makeStyles } from "@material-ui/core";

import { useState } from "react";
import ConfirmDialog from "@components/ConfirmDialog";
import Image from "next/image";
import { useForm } from "@hooks/useForm";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";
import Form from "@components/Form";
import recepientDetailsForm from "forms/recepientDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";
import Box from "@components/Box";
const forms = [recepientDetailsForm, companyDetailsForm];
function Home() {
  const styles = useStyles();
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const formsProps = forms.map((form) => useForm(form.initialState, false));
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
    let allValid = validateAllFields();
    if (allValid) {
      console.log("all fields are valid");
      // formsProps[activeFormIndex].resetForm();
      forms[activeFormIndex].submit(formsProps[activeFormIndex].formState);
    }
  };
  const validateAllFields = () => {
    let allValid = true;
    const updatedFormState = { ...formsProps[activeFormIndex].formState };
    for (const name in updatedFormState) {
      const input = { ...updatedFormState[name] };
      if (input.validate) {
        const valid = input.validate();
        // console.log(valid);
        if (!valid) {
          input.error = input.errorText;
          allValid = false;
        } else {
          input.error = "";
        }
        // console.log(input);
        updatedFormState[name] = input;
      }
    }
    formsProps[activeFormIndex].setFormState(updatedFormState);
    return allValid;
  };
  return (
    <Box>
      <div className={styles.root}>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="top">
          <div className="searchBar">
            <input
              className={"searchInput"}
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
            shrink
            onClick={() => {
              setConfirmDialog({
                ...confirmDialog,
                isOpen: true,
              });
            }}
          ></Button>
          <Button
            text="Prev"
            variant="contained"
            shrink
            onClick={() => {
              // handleSubmit();
              if (activeFormIndex > 0) setActiveFormIndex(activeFormIndex - 1);
            }}
          ></Button>
          <Button
            text="Next"
            variant="contained"
            shrink
            onClick={() => {
              // handleSubmit();
              if (activeFormIndex < forms.length - 1)
                setActiveFormIndex(activeFormIndex + 1);
            }}
          ></Button>
          <Button
            text="Submit"
            variant="contained"
            shrink
            onClick={() => {
              handleSubmit();
            }}
          ></Button>
        </div>
        <div className="rest">
          <Form {...formsProps[activeFormIndex]} validateOnBlur={true} />
        </div>
      </div>
    </Box>
  );
}

export default Home;
const useStyles = makeStyles({
  root: {
    "& .top": {
      padding: "1rem",
      borderBottom: "2px solid #DDDDDD",
      display: "flex",
      alignItems: "center",
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
        "& .searchInput": {
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
