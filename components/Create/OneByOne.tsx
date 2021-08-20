import { makeStyles } from "@material-ui/core";
import BoxContent from "./BoxContent";

import React, { useState } from "react";

import Box from "@components/Create/Box";
import produce from "immer";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Summary from "./Summary";
import Forms from "./Forms";
import FormUpperBar from "./FormUpperBar";
import Win from "@helpers/Win";
import UpperBarMobile from "./UpperBarMobile";
import LoopReceipt from "./LoopReceipt";
import { validateAllFieldsOfForm } from "forms/formUtils";
import { EntityDraft, EntityLoopMode } from "@apiHelpers/types";
import { useAppDispatch } from "@store/hooks";
import { setLoopReceiptMode } from "@store/slices/loopReceiptSlice";
import { useEffect } from "react";
import { setConfirmedLoopers } from "@store/slices/searchBarSlice";

interface OneByOneProps {
  forms: FormType[];
  formsProps: useFormReturnType[];
  handleCancelClick: () => void;
  currentDraftIdRef: React.MutableRefObject<string | undefined>;
  draftSelected: EntityDraft | undefined;
}
function OneByOne({
  forms,
  formsProps,
  handleCancelClick,
  currentDraftIdRef,
  draftSelected,
}: OneByOneProps) {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (draftSelected) {
      formsProps[0].setFormState(
        produce((prev) => {
          if (draftSelected.recipient?.address) {
            prev.shippingAddress.value = draftSelected.recipient.address;
          }
          if (draftSelected.recipient?.country) {
            prev.country.value = draftSelected.recipient.country;
          }
          if (draftSelected.recipient?.city) {
            prev.city.value = draftSelected.recipient.city;
          }
          if (draftSelected.recipient?.city) {
            prev.province.value = draftSelected.recipient.city;
          }

          prev.phone.value = "32132112";
          if (draftSelected.recipient?.postalCode) {
            prev.zipCode.value = draftSelected.recipient.postalCode;
          }
          if (draftSelected.recipient?.name) {
            prev.name.value = draftSelected.recipient.name;
          }
          if (draftSelected.recipient?.email) {
            prev.email.value = draftSelected.recipient.email;
          }
        })
      );
      if (draftSelected.loopers) {
        dispatch(setConfirmedLoopers({ loopers: draftSelected.loopers }));
      }
    }
  }, []);
  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (index > 0) setIndex(index - 1);
    else dispatch(setLoopReceiptMode(undefined));
  };

  const handleNextClick = () => {
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
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );
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
        showBackButton={index !== forms.length + 1}
        // we want to hide backbutton on looprecipt page
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
              currentDraftIdRef={currentDraftIdRef}
            />
          ) : (
            <BoxContent
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
