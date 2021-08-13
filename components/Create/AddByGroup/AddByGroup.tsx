import { makeStyles } from "@material-ui/core";
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
import ShowExistingGroups from "./ShowExistingGroups";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  getEntityLoopersFromLoopersState,
  getEntityRecipientFromRecipientState,
  validateAllFieldsOfForm,
} from "forms/formUtils";
import { useRouter } from "next/router";
import { EntityGroup } from "@apiHelpers/types";
import { setConfirmedLoopers } from "@store/slices/searchBarSlice";

import { useFetch } from "@hooks/useFetch";
import groupsApi from "@apiClient/groupsApi";
import MyLoader from "@components/Shared/MyLoader";
import Group from "./Group";
import SaveGroupDialog from "./SaveGroupDialog";
import { useForm } from "@hooks/useForm";
import groupDetailsForm from "@forms/groupDetailsForm";
interface AddByGroupProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;

  forms: FormType[];
  formsProps: useFormReturnType[];
}
function AddByGroup({ setOption, forms, formsProps }: AddByGroupProps) {
  const styles = useStyles();
  const router = useRouter();
  const [showExistingGroups, setShowExistingGroups] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<EntityGroup>();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [groupsIsEmpty, setGroupsIsEmpty] = useState(true);
  const [index, setIndex] = useState(0);
  const groupFormProps = useForm(groupDetailsForm.initialState);
  const [saveGroupDialogOpen, setSaveGroupDialogOpen] = useState(false);
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
  const postGroup = useFetch<{ group: EntityGroup }>(groupsApi.create, {
    deferred: true,
  });

  const detailsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );
  const recipientFormIdx = forms.findIndex(
    (form) => form.formName === "recipientDetailsForm"
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
  useEffect(() => {
    // here we can show update form according to group and generate loop receipt based on
    // specifications of the group
    if (selectedGroup) {
      formsProps[recipientFormIdx].setFormState((prev) => {
        prev.shippingAddress.value = selectedGroup.recipient.address;
        prev.country.value = selectedGroup.recipient.country;
        prev.city.value = selectedGroup.recipient.city;
        prev.province.value = selectedGroup.recipient.city;
        prev.phone.value = "32132112";
        prev.zipCode.value = selectedGroup.recipient.postalCode;
        return prev;
      });
      dispatch(setConfirmedLoopers({ loopers: selectedGroup.loopers }));
    }
  }, [selectedGroup]);
  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (index === forms.length + 1 && selectedGroup) {
      setIndex(0);
      setShowExistingGroups(true);
    } else if (index > 0) setIndex(index - 1);
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
  const handleNextClick = async () => {
    if (showExistingGroups) {
      setShowExistingGroups(false);
      if (selectedGroup) {
        setIndex(forms.length + 1);
      }
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

        if (index === forms.length - 1) {
          setSaveGroupDialogOpen(true);
        } else {
          setIndex(index + 1);
        }
      }
    } else {
      setIndex(index + 1);
    }
  };
  // useEffect(() => {
  //   console.log(saveAsDefault);
  // }, [saveAsDefault]);
  const saveGroup = async () => {
    const recipient = getEntityRecipientFromRecipientState(
      formsProps[recipientFormIdx].formState
    );
    const loopers = getEntityLoopersFromLoopersState(
      formsProps[loopersFormIndex].formState
    );

    if (validateAllFieldsOfForm(groupFormProps)) {
      setSaveGroupDialogOpen(false);
      setIndex(index + 1);
      postGroup.sendRequest({
        recipient,
        loopers,
        name: groupFormProps.formState.groupName.value,
        createdFor: groupFormProps.formState.createdFor.value,
      });
    }
  };
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

  return (
    <div>
      <SaveGroupDialog
        saveGroupDialogOpen={saveGroupDialogOpen}
        setSaveGroupDialogOpen={setSaveGroupDialogOpen}
        saveGroup={saveGroup}
        groupFormProps={groupFormProps}
      />
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
                  setGroupsIsEmpty={setGroupsIsEmpty}
                  createGroupClick={() => {
                    handleNextClick();
                  }}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                />
              ) : index === forms.length ? (
                <div style={{ padding: "1rem" }}>
                  {postGroup.loading ? (
                    <MyLoader />
                  ) : (
                    <Group group={postGroup.data?.group} selected={false} />
                  )}
                </div>
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
