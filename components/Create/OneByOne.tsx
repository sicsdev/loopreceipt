import { makeStyles, useTheme } from "@material-ui/core";
import BoxContent from "./BoxContent";

import React, { useState } from "react";

import { useForm } from "@hooks/useForm";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";

import recipientDetailsForm from "forms/recipientDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";
import Box from "@components/Create/Box";

import loopersDetailsForm from "forms/loopersDetailsForm";
import { useAppSelector } from "@store/hooks";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Summary from "./Summary";
import Forms from "./Forms";
import FormUpperBar from "./FormUpperBar";

interface OneByOneProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;
  validateFieldsOfForm: (
    formProps: useFormReturnType,
    form: FormType
  ) => boolean;
}
function OneByOne({ setOption, validateFieldsOfForm }: OneByOneProps) {
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

  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (summaryPageActive) setSummaryPageActive(false);
    else if (activeFormIndex > 0) setActiveFormIndex(activeFormIndex - 1);
    else setOption(undefined);
  };
  const handleCancelClick = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
    });
  };
  const handleNextClick = () => {
    // handleSubmit();
    if (
      validateFieldsOfForm(formsProps[activeFormIndex], forms[activeFormIndex])
    ) {
      // if current form is valid only then navigate to next
      if (activeFormIndex < forms.length - 1) {
        setActiveFormIndex(activeFormIndex + 1);
      } else {
        setSummaryPageActive(true);
      }
    }
  };

  const upperBarContent = (
    <>
      <p style={{ fontWeight: 500 }}>
        Step {summaryPageActive ? forms.length + 1 : activeFormIndex + 1} of{" "}
        {forms.length + 1}
      </p>
      <p style={{ fontWeight: "bold" }}>
        {summaryPageActive ? "Summary" : forms[activeFormIndex].formHeading}
      </p>
    </>
  );

  return (
    <div>
      <FormUpperBar
        handleBackButtonClick={handleBackButtonClick}
        upperBarText={upperBarContent}
      />
      <Box>
        <>
          {windowDimensions.innerWidth < theme.breakpoints.values.sm && (
            <div className={styles.head}>{upperBarContent}</div>
          )}
          {!summaryPageActive ? (
            <BoxContent
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              handleCancelClick={handleCancelClick}
              handleNextClick={handleNextClick}
            >
              <Forms
                forms={forms}
                formsProps={formsProps}
                activeFormIndex={activeFormIndex}
              />
            </BoxContent>
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
  head: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
}));
