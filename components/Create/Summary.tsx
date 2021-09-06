import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import Button from "@components/Controls/Button";
import { InputIconType } from "@interfaces/InputTypes";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import inputIconMap from "forms/inputIconMap";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { EntityLoop, EntityLooper, EntityRecipient } from "apiHelpers/types";
import loopApi from "@apiClient/loopsApi";
import Win from "@helpers/Win";
import {
  getEntityLoopersFromLoopersState,
  getEntityLoopFromFormsProps,
} from "@forms/formUtils";
import { useState, useEffect } from "react";

import draftsApi from "@apiClient/draftsApi";
import { setConfirmedLoopers } from "@store/slices/searchBarSlice";
import { useMemo } from "react";

interface SummaryProps {
  forms: FormType[];
  formsProps: useFormReturnType[];
  generatedLoopReceipt: () => void;
  currentDraftIdRef: React.MutableRefObject<string | undefined>;
  setCreatedLoop: React.Dispatch<React.SetStateAction<EntityLoop | undefined>>;
}
const Summary = ({
  forms,
  formsProps,
  generatedLoopReceipt,
  currentDraftIdRef,
  setCreatedLoop,
}: SummaryProps) => {
  // console.log(formsProps);
  // log this to check the form state when coming to this page

  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const loopReceiptType = useAppSelector((state) => state.loopReceipt.type);
  const loopReceiptMode = useAppSelector((state) => state.loopReceipt.mode);
  const recipientFormIdx = forms.findIndex(
    (form) => form.formName === "recipientDetailsForm"
  );
  const loopersFormIdx = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );
  const confirmedLoopers = useAppSelector(
    (state) => state.searchBar.confirmedLoopers
  );
  const dispatch = useAppDispatch();

  const removeTrailingSpace = (loop: EntityLoop) => {
    let formatLoop = JSON.parse(JSON.stringify(loop).replace(/"\s+|\s+"/g,'"'))
    console.log(formatLoop)
    return formatLoop
  }

  const handleSubmit = async () => {
    const loop = getEntityLoopFromFormsProps({
      forms,
      formsProps,
      loopReceiptType,
      loopReceiptMode,
    });
    let formattedLoop = removeTrailingSpace(loop);
    const response = await loopApi.create(formattedLoop);
    setCreatedLoop(response?.loop);
    console.log(response);
    // remove confirmed loopers
    dispatch(setConfirmedLoopers({ loopers: [] }));
    // delete the draft if loop is created
    if (currentDraftIdRef.current) {
      console.log("deleting the draft");
      const draftId = currentDraftIdRef.current;
      currentDraftIdRef.current = "deleted";
      draftsApi.delete(draftId);
    }
    for (let i = 0; i < formsProps.length; i++) {
      formsProps[i].resetForm();
    }
    //   setActiveFormIndex(0);
    //   setSummaryPageActive(false);
    generatedLoopReceipt();
  };
  const recipientState = formsProps[recipientFormIdx].formState;
  const loopers = useMemo(() => {
    const loopersState = formsProps[loopersFormIdx].formState;
    return getEntityLoopersFromLoopersState(loopersState);
  }, [formsProps, loopersFormIdx]);
  return (
    <div className={styles.Summary}>
      {win.up("sm") && (
        <div className="top">
          <h1 className="head">Summary</h1>
        </div>
      )}

      <div className="content">
        <div className="left">
          {recipientFormIdx != -1 && (
            <>
              <Entry
                inputIcon="location"
                text={`To: ${recipientState.name?.value}`}
                // since receivingCompanyName is optional field
              />
              <Entry
                inputIcon="location"
                text={
                  forms[recipientFormIdx].methods?.getCompleteAddress({
                    formState: recipientState,
                  })!
                }
              />
            </>
          )}
          <Entry inputIcon="phone" text={recipientState.phone.value} />
          <Entry inputIcon="email" text={recipientState.email.value} />
        </div>
        <div className="line">
          <p></p>
        </div>
        <div className="right">
          {win.down("xs") ? (
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

          {loopers.map((looper, i) => (
            <Entry key={i} inputIcon="email" text={looper.email} />
          ))}
        </div>
      </div>
      <div className="bottom">
        <Button color="secondary" labelColor="white" onClick={handleSubmit}>
          Generate Loopreceipt
        </Button>
        <Image alt="icon" src="/icons/form/man.svg" width={300} height={300} />
      </div>
    </div>
  );
};
export default Summary;
interface EntryProps {
  inputIcon: InputIconType;
  text: string;
}
function Entry({ inputIcon, text }: EntryProps) {
  return (
    <div className="entry">
      <Image alt="icon" src={inputIconMap(inputIcon)} width={24} height={24} />
      <span className="text"> {text}</span>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  Summary: {
    "& .top": {
      padding: "1rem",
      borderBottom: "2px solid #DDDDDD",
      "& .head": {
        color: theme.palette.secondary.main,
        fontSize: "1.1rem",
      },
    },
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
