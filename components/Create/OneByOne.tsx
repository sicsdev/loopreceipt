import Button from "@components/Controls/Button";

import { makeStyles, useTheme } from "@material-ui/core";

import React, { useState } from "react";
import ConfirmDialog from "@components/Create/ConfirmDialog";
import Image from "next/image";
import { useForm } from "@hooks/useForm";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";
import Form from "@components/shared/Form";
import recipientDetailsForm from "forms/recipientDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";
import Box from "@components/Create/Box";
import UpperBar from "@components/shared/UpperBar";

import loopersDetailsForm from "forms/loopersDetailsForm";
import { useAppSelector } from "@store/hooks";

import { useWindowDimensions } from "@hooks/useWindowDimensions";
import SearchBar from "@components/Create/SearchBar";
import Summary from "./Summary";
import AddOrEditFields from "./AddOrEditFields";
interface OneByOneProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;
}
function OneByOne({ setOption }: OneByOneProps) {
  const styles = useStyles();
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();

  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const formType = useAppSelector((state) => state.loopReceipt.type);
  const getForm = () => {
    switch (formType) {
      case "internal":
        return [recipientDetailsForm, loopersDetailsForm];
      case "external":
        return [recipientDetailsForm, companyDetailsForm, loopersDetailsForm];
    }
  };
  const [forms, setForms] = useState(getForm);

  const formsProps = forms.map((form) => useForm(form.initialState, true));

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    isOpen: false,
    title: "Save Changes?",
    subTitle: "",
    confirmText: "Save Changes",
    cancelText: "Cancel",
    onConfirm: () => {
      console.log("confirmed");
    },
  });
  const [summaryPageActive, setSummaryPageActive] = useState(false);

  const validateFieldsOfForm = (formIndex: number) => {
    let allFieldsValid = true;
    const updatedFormState = { ...formsProps[formIndex].formState };
    for (const name in updatedFormState) {
      const input = { ...updatedFormState[name] };
      if (input.validate) {
        const valid = input.validate();
        // console.log(valid);
        if (!valid) {
          input.error = input.errorText;
          allFieldsValid = false;
        } else {
          input.error = "";
        }
        // console.log(input);
        updatedFormState[name] = input;
      }
    }
    formsProps[activeFormIndex].setFormState(updatedFormState);
    return allFieldsValid;
  };
  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (summaryPageActive) setSummaryPageActive(false);
    else if (activeFormIndex > 0) setActiveFormIndex(activeFormIndex - 1);
    else setOption(undefined);
  };
  const backButton = (
    <div className={styles.backButton} onClick={handleBackButtonClick}>
      <Button expand>Back</Button>
    </div>
  );
  const nextCancelButtons = (
    <div className={styles.nextCancelButtons}>
      <Button
        variant={
          windowDimensions.innerWidth < theme.breakpoints.values.sm
            ? "outlined"
            : "text"
        }
        size="large"
        color="default"
        labelColor={
          windowDimensions.innerWidth < theme.breakpoints.values.sm
            ? "gray"
            : "black"
        }
        labelWeight="bold"
        shrink={windowDimensions.innerWidth >= theme.breakpoints.values.sm}
        onClick={() => {
          setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
          });
        }}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        size="large"
        labelWeight="bold"
        shrink={windowDimensions.innerWidth >= theme.breakpoints.values.sm}
        onClick={() => {
          // handleSubmit();
          if (validateFieldsOfForm(activeFormIndex)) {
            // if current form is valid only then navigate to next
            if (activeFormIndex < forms.length - 1) {
              setActiveFormIndex(activeFormIndex + 1);
            } else {
              setSummaryPageActive(true);
            }
          }
        }}
      >
        Next
      </Button>
    </div>
  );
  const upperBarContent = (
    <div className={styles.upperBar}>
      {backButton}
      <div className="info">
        <p>
          Step {summaryPageActive ? forms.length + 1 : activeFormIndex + 1} of{" "}
          {forms.length + 1}
        </p>
        <p>
          {summaryPageActive ? "Summary" : forms[activeFormIndex].formHeading}
        </p>
      </div>
      {React.cloneElement(backButton, { style: { visibility: "hidden" } })}
    </div>
  );

  return (
    <div>
      <UpperBar>
        {windowDimensions.innerWidth >= theme.breakpoints.values.sm ? (
          upperBarContent
        ) : (
          <div className={styles.newButton} onClick={handleBackButtonClick}>
            <Image src="/icons/create/back.svg" width="20" height="20" /> New
            Loopreceipt
          </div>
        )}
      </UpperBar>

      <Box>
        <>
          {windowDimensions.innerWidth < theme.breakpoints.values.sm &&
            upperBarContent}
          {!summaryPageActive ? (
            <div>
              <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
              />

              <div className={styles.top}>
                <SearchBar />
                {windowDimensions.innerWidth >= theme.breakpoints.values.sm &&
                  nextCancelButtons}
              </div>
              <div className={styles.rest}>
                {forms[activeFormIndex].formName === "loopersDetailsForm" ? (
                  <AddOrEditFields
                    formProps={formsProps[activeFormIndex]}
                    form={forms[activeFormIndex]}
                  />
                ) : (
                  <Form
                    {...formsProps[activeFormIndex]}
                    validateOnBlur={true}
                    autoComplete="off"
                  />
                )}
                {windowDimensions.innerWidth < theme.breakpoints.values.sm && (
                  <>
                    <div style={{ flex: 2 }}></div>
                    {nextCancelButtons}
                  </>
                )}
              </div>
            </div>
          ) : (
            <Summary formsProps={formsProps} forms={forms} />
          )}
        </>
      </Box>
    </div>
  );
}

export default OneByOne;
const useStyles = makeStyles((theme) => ({
  upperBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      width: "100%",
      marginTop: "1.5rem",
    },
    "& .info": {
      display: "flex",
      gap: 10,
      "& p": {
        fontWeight: "bold",
      },
    },
  },
  backButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  newButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    paddingLeft: "5%",
    "& img": {},
  },
  top: {
    padding: "1rem",
    borderBottom: "2px solid #DDDDDD",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      borderBottom: "none",
    },
    gap: 10,
  },
  rest: {
    padding: "2rem",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    "& form": {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
  },
  nextCancelButtons: {
    display: "flex",
    gap: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      margin: "auto",
      flexDirection: "column-reverse",
    },
  },
}));
