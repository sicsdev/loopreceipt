import { formatMs, makeStyles } from "@material-ui/core";
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
import Win from "@helpers/Win";
import UpperBarMobile from "./UpperBarMobile";
import LoopReceipt from "./LoopReceipt";
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
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [index, setIndex] = useState(0);
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

  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (index > 0) setIndex(index - 1);
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
    if (index < forms.length) {
      if (validateFieldsOfForm(formsProps[index], forms[index])) {
        // if current form is valid only then navigate to next
        setIndex(index + 1);
      }
    } else {
      setIndex(index + 1);
    }
  };

  const upperBarContent = (
    <>
      {index !== forms.length + 1 && (
        <p style={{ fontWeight: 500 }}>
          Step {index + 1} of {forms.length + 1}
        </p>
      )}

      <p>
        {index === forms.length + 1
          ? "Loopreceipt"
          : index === forms.length
          ? "Summary"
          : forms[index].formHeading}
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
          <UpperBarMobile
            show={win.down("xs") && index !== forms.length + 1}
            upperBarContent={upperBarContent}
          />
          {index === forms.length + 1 ? (
            <LoopReceipt />
          ) : index === forms.length ? (
            <Summary
              formsProps={formsProps}
              forms={forms}
              generatedLoopReceipt={() => {
                // move on to next page
                setIndex(index + 1);
              }}
            />
          ) : (
            <BoxContent
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              handleCancelClick={handleCancelClick}
              handleNextClick={handleNextClick}
            >
              <Forms
                forms={forms}
                formsProps={formsProps}
                activeFormIndex={index}
              />
            </BoxContent>
          )}
        </>
      </Box>
    </div>
  );
}

export default OneByOne;
const useStyles = makeStyles((theme) => ({}));
