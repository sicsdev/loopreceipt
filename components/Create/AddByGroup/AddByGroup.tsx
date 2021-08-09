import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";

import Box from "@components/Create/Box";

import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Summary from "../Summary";

import FormUpperBar from "../FormUpperBar";
import BoxContent from "../BoxContent";
import Forms from "../Forms";
import Win from "@helpers/Win";
import UpperBarMobile from "../UpperBarMobile";
import LoopReceipt from "../LoopReceipt";
import SaveCreatedGroup from "./SaveCreatedGroup";
import ShowExistingGroups from "./ShowExistingGroups";
import { useAppSelector } from "@store/hooks";
import { getLoopers, validateAllFieldsOfForm } from "forms/formUtils";
import { useRouter } from "next/router";
interface AddByGroupProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;

  forms: FormType[];
  formsProps: useFormReturnType[];
}
function AddByGroup({ setOption, forms, formsProps }: AddByGroupProps) {
  const styles = useStyles();
  const [showExistingGroups, setShowExistingGroups] = useState(true);
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [groupsIsEmpty, setGroupsIsEmpty] = useState(true);
  const [index, setIndex] = useState(0);
  const router = useRouter();
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
  const detailsRef = useRef<HTMLDivElement>(null);

  const confirmedLoopers = useAppSelector(
    (state) => state.searchBar.confirmedLoopers
  );
  useEffect(() => {
    if (detailsRef.current) {
      const contentDivs: any =
        detailsRef.current.getElementsByClassName("content");
      // console.log(theme.breakpoints.values);
      // console.log(win.values);
      if (win.only("sm")) {
        let maxHeight = contentDivs[0].offsetHeight;
        for (let i = 1; i < contentDivs.length; i++) {
          maxHeight = Math.max(maxHeight, contentDivs[i].offsetHeight);
        }
        for (let div of contentDivs) {
          div.style.minHeight = maxHeight + "px";
        }
      } else {
        for (let div of contentDivs) {
          div.style.minHeight = 0 + "px";
        }
      }
    }
  }, [index, windowDimensions]);
  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (index > 0) setIndex(index - 1);
    else {
      if (!showExistingGroups) {
        setShowExistingGroups(true);
      } else {
        setShowExistingGroups(false);
        setOption(undefined);
      }
    }
  };

  const handleCancelClick = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
    });
  };
  const handleNextClick = () => {
    if (showExistingGroups) {
      setShowExistingGroups(false);
      return;
    }
    // handleSubmit();
    if (index < forms.length) {
      if (
        validateAllFieldsOfForm(
          formsProps[index],
          forms[index].formName === "loopersDetailsForm"
        )
      ) {
        // if current form is valid only then navigate to next

        setIndex(index + 1);
      }
    } else {
      setIndex(index + 1);
    }
  };
  // useEffect(() => {
  //   console.log(saveAsDefault);
  // }, [saveAsDefault]);
  const upperBarContent = (
    <>
      {!showExistingGroups && index !== forms.length + 2 && (
        <p style={{ fontWeight: 500 }}>
          Step {index < forms.length ? index + 1 : index} of {forms.length + 1}
        </p>
      )}
      <p>
        {index === forms.length + 2
          ? "Loopreceipt"
          : index === forms.length + 1
          ? "Summary"
          : index === forms.length
          ? "Save Group"
          : showExistingGroups
          ? !groupsIsEmpty
            ? "Select Group"
            : "Create Group"
          : forms[index].formHeading}
      </p>
    </>
  );
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
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
            show={win.down("xs") && index !== forms.length + 2}
            upperBarContent={upperBarContent}
          />
          {index === forms.length + 2 ? (
            <LoopReceipt />
          ) : index === forms.length + 1 ? (
            <Summary
              formsProps={formsProps}
              forms={forms}
              generatedLoopReceipt={() => {
                setIndex(index + 1);
              }}
              loopers={getLoopers(formsProps[loopersFormIndex].formState)}
            />
          ) : (
            <BoxContent
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              handleCancelClick={handleCancelClick}
              handleNextClick={handleNextClick}
            >
              {showExistingGroups ? (
                <ShowExistingGroups
                  groupsIsEmpty={groupsIsEmpty}
                  setGroupsIsEmpty={setGroupsIsEmpty}
                />
              ) : index === forms.length ? (
                <SaveCreatedGroup
                  loopers={getLoopers(formsProps[loopersFormIndex].formState)}
                />
              ) : (
                <Forms
                  forms={forms}
                  formsProps={formsProps}
                  activeFormIndex={index}
                />
              )}
            </BoxContent>
          )}
        </>
      </Box>
    </div>
  );
}

export default AddByGroup;
const useStyles = makeStyles((theme) => ({
  personadd: {
    border: "1px solid #B8B9BC",
    borderStyle: "dashed",
    borderRadius: "50%",
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
