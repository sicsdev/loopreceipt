import Button from "@components/Button";

import { makeStyles } from "@material-ui/core";

import React, { useState } from "react";
import ConfirmDialog from "@components/ConfirmDialog";
import Image from "next/image";
import { useForm } from "@hooks/useForm";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";
import Form from "@components/Form";
import recipientDetailsForm from "forms/recipientDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";
import Box from "@components/Box";
import UpperBar from "@components/UpperBar";
import SearchCard from "@components/SearchCard";
import loopersDetailsForm from "forms/loopersDetailsForm";
import { FormStateType } from "@interfaces/FormTypes";
import { getLastChar, setLastChar } from "@helpers/utils";
import { useAppSelector } from "@store/hooks";
import inputIconMap from "forms/inputIconMap";
import { InputIconType } from "@interfaces/InputTypes";
import { EntityLoop, EntityLooper, EntityRecipient } from "@apiClient/types";
import loopApi from "@apiClient/loopApi";
function Home() {
  const styles = useStyles();
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
    let allValid = validateAllFields();
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
        const name = loopersState[loppersStateKeys[i]];
        const email = loopersState[loppersStateKeys[i + 1]];
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
  const validateAllFields = () => {
    let allValid = true;
    for (let i = 0; i < formsProps.length; i++) {
      const updatedFormState = { ...formsProps[i].formState };
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
    }

    return allValid;
  };
  const backButton = (
    <div
      className="button"
      onClick={() => {
        if (summaryPageActive) setSummaryPageActive(false);
        else if (activeFormIndex > 0) setActiveFormIndex(activeFormIndex - 1);
      }}
    >
      <Button expand>Back</Button>
    </div>
  );

  return (
    <div>
      <UpperBar>
        <div className={styles.upperBar}>
          {backButton}
          <div className="info">
            <p>
              Step {summaryPageActive ? forms.length + 1 : activeFormIndex + 1}{" "}
              of {forms.length + 1}
            </p>
            <p>
              {summaryPageActive
                ? "Summary"
                : forms[activeFormIndex].formHeading}
            </p>
          </div>
          {React.cloneElement(backButton, { style: { visibility: "hidden" } })}
        </div>
      </UpperBar>
      <Box>
        {!summaryPageActive ? (
          <div>
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />

            <div className={styles.top}>
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
                {searchInput && <SearchCard searchString={searchInput} />}
              </div>
              <Button
                variant="text"
                size="large"
                shrink
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
                shrink
                onClick={() => {
                  // handleSubmit();
                  if (activeFormIndex < forms.length - 1) {
                    setActiveFormIndex(activeFormIndex + 1);
                  } else {
                    setSummaryPageActive(true);
                  }
                }}
              >
                Next
              </Button>
            </div>
            <div className={styles.rest}>
              <Form {...formsProps[activeFormIndex]} validateOnBlur={true} />
              {forms[activeFormIndex].formName === "loopersDetailsForm" && (
                <div className="button">
                  <Button
                    color="secondary"
                    labelColor="white"
                    onClick={() => {
                      formsProps[activeFormIndex].setFormState(
                        (prevFormState: FormStateType) => {
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
                        }
                      );
                    }}
                  >
                    + Add more
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.summaryPage}>
            <div className={styles.top}>
              <h1 className="head">Summary</h1>
            </div>

            <div className="content">
              <div className="left">
                <Entry
                  inputIcon="location"
                  text={
                    formsProps[recipientFormIdx].formState.receivingCompanyName
                      .value
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
                <h1
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  Loopers
                </h1>
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
export default Home;
const useStyles = makeStyles((theme) => ({
  upperBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: "auto",
    "& .button": {
      width: 100,
    },
    "& .info": {
      display: "flex",
      gap: 10,
      "& p": {
        fontWeight: "bold",
      },
    },
  },
  top: {
    padding: "1rem",
    borderBottom: "2px solid #DDDDDD",
    display: "flex",
    alignItems: "center",
    gap: 10,
    "& .head": {
      color: theme.palette.secondary.main,
      fontSize: "1.1rem",
    },
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
  rest: {
    padding: "2rem",
    minHeight: "80vh",
    "& form": {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    "& .button": {
      marginTop: "1.5rem",
    },
  },
  summaryPage: {
    "& .content": {
      display: "flex",
      padding: "2rem",
      "& .left": {
        flex: "2",
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
      "& .right": {
        flex: "2",
      },
      "& .entry": {
        display: "flex",
        alignItems: "center",
        gap: 30,
        padding: ".5rem 0",
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
