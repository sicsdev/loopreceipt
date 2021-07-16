import Button from "@components/Controls/Button";

import { makeStyles, useTheme } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import ConfirmDialog from "@components/Create/ConfirmDialog";
import Image from "next/image";
import { useForm } from "@hooks/useForm";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";
import Form from "@components/shared/Form";
import recipientDetailsForm from "forms/recipientDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";
import Box from "@components/Create/Box";
import UpperBar from "@components/Create/UpperBar";

import loopersDetailsForm from "forms/loopersDetailsForm";
import { FormStateType } from "@interfaces/FormTypes";
import { getLastChar, setLastChar } from "@helpers/utils";
import { useAppSelector } from "@store/hooks";
import inputIconMap from "forms/inputIconMap";
import { InputIconType } from "@interfaces/InputTypes";
import { EntityLoop, EntityLooper, EntityRecipient } from "@apiClient/types";
import loopApi from "@apiClient/loopApi";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import SearchBar from "@components/Create/SearchBar";
function Create() {
  const styles = useStyles();
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();

  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const formType = useAppSelector((state) => state.loopReceipt.type);
  const [forms] = useState(() => {
    switch (formType) {
      case "internal":
        return [recipientDetailsForm, loopersDetailsForm];
      case "external":
        return [recipientDetailsForm, companyDetailsForm, loopersDetailsForm];
    }
  });
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
  const recipientFormIdx = forms.findIndex(
    (form) => form.formName === "recipientDetailsForm"
  );
  const companyFormIdx = forms.findIndex(
    (form) => form.formName === "companyDetailsForm"
  );
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );

  const handleSubmit = async () => {
    let allValid = validateAllForms();
    // validating all forms is not necessary
    // since we are validating individual form when clicking next

    if (allValid) {
      console.log("all fields are valid");
      for (let i = 0; i < formsProps.length; i++) {
        // console.log(formsProps[i].formState);
      }
      const recipientState = formsProps[recipientFormIdx].formState;
      const recipient: EntityRecipient = {
        email: "hello@info.com.ng",
        name: "alvin",
        postalCode: recipientState.zipCode.value,
        address: recipientState.shippingAddress.value,
        city: recipientState.city.value,
        company: recipientState.receivingCompanyName.value,
        country: recipientState.country.value,
      };
      // console.log(recipient);
      const loopers: EntityLooper[] = [];
      const loopersState = formsProps[loopersFormIndex].formState;
      const loppersStateKeys = Object.keys(loopersState);
      for (let i = 0; i < loppersStateKeys.length; i += 2) {
        const name = loopersState[loppersStateKeys[i]].value;
        const email = loopersState[loppersStateKeys[i + 1]].value;
        if (name && email) {
          loopers.push({
            name,
            email,
          });
        }
      }
      // console.log(loopers);

      let loop: EntityLoop;
      switch (formType) {
        case "internal": {
          loop = {
            barcode: "ee3432r23fd",
            city: recipient.city,
            country: recipient.country,
            postalCode: recipient.postalCode,
            province: "nothing",
            type: "internal",
            loopers,
            recipient,
          };
          break;
        }
        case "external": {
          const companyState = formsProps[companyFormIdx].formState;
          loop = {
            barcode: "ee3432r23fd",
            city: companyState.city.value,
            country: companyState.country.value,
            postalCode: companyState.zipCode.value,
            province: companyState.province.value,
            type: "external",
            loopers,
            recipient,
          };
          break;
        }
      }
      const createdLoop = await loopApi.createLoop(loop);
      console.log(createdLoop);
      for (let i = 0; i < formsProps.length; i++) {
        formsProps[i].resetForm();
      }
      setActiveFormIndex(0);
      setSummaryPageActive(false);
    }
  };
  const validateAllForms = () => {
    let allFormsValid = true;
    for (let i = 0; i < formsProps.length; i++) {
      allFormsValid = validateFieldsOfForm(i) && allFormsValid;
    }

    return allFormsValid;
  };
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
  const addLooper = () => {
    formsProps[activeFormIndex].setFormState((prevFormState: FormStateType) => {
      const keys = Object.keys(prevFormState);
      // console.log(keys);
      const lastKey = keys[keys.length - 1];
      const lastKeyId = +getLastChar(lastKey);
      // console.log(lastKeyId);

      const newLooperEntry: any = {};
      for (let [key, value] of Object.entries(
        forms[activeFormIndex].initialState
      )) {
        const newKey = setLastChar(key, `${lastKeyId + 1}`);
        newLooperEntry[newKey] = {
          ...value,
          name: newKey,
        };
      }
      const updatedFormState = {
        ...prevFormState,
        ...newLooperEntry,
      };
      return updatedFormState;
    });
  };
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
                <Form
                  {...formsProps[activeFormIndex]}
                  validateOnBlur={true}
                  autoComplete="off"
                />
                {forms[activeFormIndex].formName === "loopersDetailsForm" && (
                  <div className="button">
                    <Button
                      color="secondary"
                      labelColor="white"
                      onClick={addLooper}
                    >
                      + Add more
                    </Button>
                  </div>
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
            <div className={styles.summaryPage}>
              {windowDimensions.innerWidth >= theme.breakpoints.values.sm && (
                <div className={styles.top}>
                  <h1 className="head">Summary</h1>
                </div>
              )}

              <div className="content">
                <div className="left">
                  <Entry
                    inputIcon="location"
                    text={
                      formsProps[recipientFormIdx].formState
                        .receivingCompanyName.value
                    }
                  />
                  <Entry
                    inputIcon="location"
                    text={
                      forms[recipientFormIdx].methods?.getCompleteAddress(
                        formsProps[recipientFormIdx].formState
                      )!
                    }
                  />
                  <Entry inputIcon="phone" text={"+234 081-1236-4568"} />
                  <Entry inputIcon="email" text={"hello@info.com.ng"} />
                </div>
                <div className="line">
                  <p></p>
                </div>
                <div className="right">
                  {windowDimensions.innerWidth < theme.breakpoints.values.sm ? (
                    <h1
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Loopers:
                    </h1>
                  ) : (
                    <h1>Loopers</h1>
                  )}

                  {Object.values(formsProps[loopersFormIndex].formState).map(
                    (input, i) => {
                      return (
                        input.type === "email" && (
                          <Entry key={i} inputIcon="email" text={input.value} />
                        )
                      );
                    }
                  )}
                </div>
              </div>
              <div className="bottom">
                <Button
                  color="secondary"
                  labelColor="white"
                  onClick={handleSubmit}
                >
                  Generate Loopreceipt
                </Button>
                <Image src="/icons/form/man.svg" width={300} height={300} />
              </div>
            </div>
          )}
        </>
      </Box>
    </div>
  );
}
interface EntryProps {
  inputIcon: InputIconType;
  text: string;
}
function Entry({ inputIcon, text }: EntryProps) {
  return (
    <div className="entry">
      <Image src={inputIconMap(inputIcon)} width={24} height={24} />
      <span className="text"> {text}</span>
    </div>
  );
}
export default Create;
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
    "& .head": {
      color: theme.palette.secondary.main,
      fontSize: "1.1rem",
    },
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
    "& .button": {},
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
  summaryPage: {
    "& .content": {
      display: "flex",
      padding: "2rem",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        gap: "1.5rem",
      },

      "& .left, & .right": {
        flex: "2",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      },
      "& .line": {
        flex: "1",
        display: "flex",
        justifyContent: "center",
        "& p": {
          height: "100%",
          width: 1,
          background: "#DDDDDD",
        },
      },

      "& .entry": {
        display: "flex",
        alignItems: "center",
        gap: 30,
        "& .text": {},
      },
    },
    "& .bottom": {
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
    },
  },
}));
