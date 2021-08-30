import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import produce from "immer";
import _ from "lodash";
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
import {
  EntityDraft,
  EntityGroup,
  EntityLoop,
  EntityLoopMode,
} from "@apiHelpers/types";
import {
  setAddManuallyClickDetector,
  setConfirmedLoopers,
} from "@store/slices/searchBarSlice";

import groupsApi from "@apiClient/groupsApi";
import MyLoader from "@components/Shared/MyLoader";
import Group from "./Group";
import SaveGroupDialog from "./SaveGroupDialog";
import { useForm } from "@hooks/useForm";
import groupDetailsForm from "@forms/groupDetailsForm";
import { getStrippedObject } from "@helpers/utils";
import { setLoopReceiptMode } from "@store/slices/loopReceiptSlice";
import loopersDetailsForm from "@forms/loopersDetailsForm";
interface AddByGroupProps {
  forms: FormType[];
  formsProps: useFormReturnType[];
  handleCancelClick: () => void;
  currentDraftIdRef: React.MutableRefObject<string | undefined>;
  draftSelected: EntityDraft | undefined;
}
function AddByGroup({
  forms,
  formsProps,
  handleCancelClick,
  currentDraftIdRef,
  draftSelected,
}: AddByGroupProps) {
  const styles = useStyles();
  const router = useRouter();
  const [createdLoop, setCreatedLoop] = useState<EntityLoop>();

  const [showExistingGroups, setShowExistingGroups] = useState(
    () => !currentDraftIdRef.current || currentDraftIdRef.current === "deleted"
  );
  const [selectedGroup, setSelectedGroup] = useState<EntityGroup>();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [groupsIsEmpty, setGroupsIsEmpty] = useState(true);
  const [index, setIndex] = useState(0);
  const groupFormProps = useForm(groupDetailsForm.initialState);
  const [saveGroupDialogOpen, setSaveGroupDialogOpen] = useState(false);
  const [savedGroup, setSavedGroup] = useState<EntityGroup>();
  const addManuallyClickDetector = useAppSelector(
    (state) => state.searchBar.addManuallyClickDetector
  );
  const detailsRef = useRef<HTMLDivElement>(null);
  // const groupFetchedFromDraftRef = useRef(true);
  const dispatch = useAppDispatch();
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );
  const recipientFormIdx = forms.findIndex(
    (form) => form.formName === "recipientDetailsForm"
  );
  useEffect(() => {
    // for entity forms we run itemClickDetector in useEffect defined in Entityform
    if (addManuallyClickDetector) {
      if (showExistingGroups) {
        setShowExistingGroups(false);
      }
      dispatch(setAddManuallyClickDetector(false));
    }
  }, [addManuallyClickDetector]);
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
    if (draftSelected) {
      (async () => {
        // i will handle it later
        // if (draftSelected.groupid) {
        //   const response = await groupsApi.getOne(draftSelected.groupid);
        //   const associatedGroup = response?.group;
        //   if (associatedGroup) {
        //     groupFormProps.setFormState(
        //       produce((prev) => {
        //         prev.groupName.value = associatedGroup.name;
        //         prev.createdFor.value = associatedGroup.createdFor;
        //       })
        //     );
        //     setSelectedGroup(associatedGroup);
        //     groupFetchedFromDraftRef.current = true;
        //   }
        // }
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
            if (draftSelected.recipient?.state) {
              prev.state.value = draftSelected.recipient.state;
            }

            if (draftSelected.recipient?.phone) {
              prev.phone.value = draftSelected.recipient.phone;
            }
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
      })();
    }
  }, []);
  useEffect(() => {
    // here we can show update form according to group and generate loop receipt based on
    // specifications of the group
    if (draftSelected) {
      return;
    }
    if (selectedGroup) {
      groupFormProps.setFormState(
        produce((prev) => {
          prev.groupName.value = selectedGroup.name;
          prev.createdFor.value = selectedGroup.createdFor;
        })
      );

      formsProps[recipientFormIdx].setFormState(
        produce((prev) => {
          prev.shippingAddress.value = selectedGroup.recipient.address;
          prev.country.value = selectedGroup.recipient.country;
          prev.city.value = selectedGroup.recipient.city;
          prev.state.value = selectedGroup.recipient.state;
          prev.phone.value = selectedGroup.recipient.phone;
          prev.zipCode.value = selectedGroup.recipient.postalCode;
          prev.name.value = selectedGroup.recipient.name;
          prev.email.value = selectedGroup.recipient.email;
        })
      );
      dispatch(setConfirmedLoopers({ loopers: selectedGroup.loopers }));
    } else {
      // console.log("resetting form");
      groupFormProps.setFormState(groupDetailsForm.initialState);
      formsProps[recipientFormIdx].setFormState(
        forms[recipientFormIdx].initialState
      );

      dispatch(setConfirmedLoopers({ loopers: [] }));
    }
  }, [selectedGroup]);

  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (index === forms.length + 1) {
      setIndex(index - 2);
    } else if (index > 0) {
      setIndex(index - 1);
    } else {
      if (!showExistingGroups && !draftSelected) {
        setSelectedGroup(undefined);
        setShowExistingGroups(true);
      } else {
        setShowExistingGroups(false);
        dispatch(setLoopReceiptMode(undefined));
      }
    }
  };

  const handleNextClick = async () => {
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

        if (index === forms.length - 1) {
          if (selectedGroup) {
            const groupToBeSaved = getGroupToBeSaved();
            const strippedGroup = getStrippedObject(
              groupToBeSaved,
              selectedGroup
            );

            // console.log(groupToBeSaved);
            // console.log(strippedGroup);
            let areCompletelySame = _.isEqual(groupToBeSaved, strippedGroup);
            if (areCompletelySame) {
              setIndex(index + 2);
            } else {
              setSaveGroupDialogOpen(true);
            }
          } else {
            setSaveGroupDialogOpen(true);
          }
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
  const getGroupToBeSaved = (): EntityGroup => {
    const recipient = getEntityRecipientFromRecipientState(
      formsProps[recipientFormIdx].formState
    );
    const loopers = getEntityLoopersFromLoopersState(
      formsProps[loopersFormIndex].formState
    );
    // this is done so that once the group is saved and user clicks back
    // we don't treat looper in input as new looper added by the user
    formsProps[loopersFormIndex].setFormState(loopersDetailsForm.initialState);
    dispatch(setConfirmedLoopers({ loopers }));
    const groupToBeSaved = {
      recipient,
      loopers,
      name: groupFormProps.formState.groupName.value,
      createdFor: groupFormProps.formState.createdFor.value,
    };
    return groupToBeSaved;
  };
  const saveGroup = async () => {
    const groupToBeSaved = getGroupToBeSaved();
    if (validateAllFieldsOfForm(groupFormProps)) {
      setSaveGroupDialogOpen(false);
      setSavedGroup(groupToBeSaved);
      setIndex(index + 1);
      if (!selectedGroup) {
        const response = await groupsApi.create(groupToBeSaved);

        // console.log('creating group');
        // console.log(response?.group);
        setSavedGroup(response?.group);
        setSelectedGroup(response?.group);
      } else {
        const response = await groupsApi.update({
          group: groupToBeSaved,
          groupid: selectedGroup.groupid!,
        });
        // console.log("updating group");
        // console.log(response?.group);
        setSavedGroup(response?.group);
        setSelectedGroup(response?.group);
      }
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
        showBackButton={index !== forms.length + 2}
        // we want to hide backbutton on looprecipt page
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
            <LoopReceipt createdLoop={createdLoop} />
          ) : index === forms.length + 1 ? (
            <Summary
              formsProps={formsProps}
              forms={forms}
              generatedLoopReceipt={() => {
                setIndex(index + 1);
              }}
              currentDraftIdRef={currentDraftIdRef}
              setCreatedLoop={setCreatedLoop}
            />
          ) : (
            <BoxContent
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
                  <Group group={savedGroup} selected={false} />
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
