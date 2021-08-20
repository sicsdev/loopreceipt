/* eslint-disable react-hooks/exhaustive-deps */
import OneByOne from "@components/Create/OneByOne";
import SelectOption from "@components/Create/SelectOption";
import { makeStyles } from "@material-ui/core";
import Layout from "@components/Global/Layout";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import recipientDetailsForm from "forms/recipientDetailsForm";
import loopersDetailsForm from "forms/loopersDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";

import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useForm } from "@hooks/useForm";
import AddByGroup from "@components/Create/AddByGroup/AddByGroup";
import {
  getEntityLoopFromFormsProps,
  validateAllFieldsOfForm,
} from "forms/formUtils";
import { setConfirmedLoopers } from "@store/slices/searchBarSlice";
import ConfirmDialogType from "@interfaces/ConfirmDialogType";
import ConfirmDialog from "@components/Create/ConfirmDialog";
import { useRouter, withRouter } from "next/router";
import draftsApi from "@apiClient/draftsApi";
import { useRef } from "react";
import { Debounce } from "@helpers/utils";
import produce from "immer";
import { EntityDraft, EntityLoopMode, EntityLoopType } from "@apiHelpers/types";
import {
  setLoopReceiptMode,
  setLoopReceiptType,
} from "@store/slices/loopReceiptSlice";
import groupsApi from "@apiClient/groupsApi";
const Create = () => {
  const router = useRouter();
  const styles = useStyles();

  const { type: loopReceiptType, mode: loopReceiptMode } = useAppSelector(
    (state) => state.loopReceipt
  );
  const [checkForExistingDraftComplete, setCheckForExistingDraftComplete] =
    useState(false);
  const [draftSelected, setDraftSelected] = useState<EntityDraft>();
  const confirmedLoopers = useAppSelector(
    (state) => state.searchBar.confirmedLoopers
  );
  const dispatch = useAppDispatch();
  const currentDraftIdRef = useRef<string>();
  const { draftId } = router.query;
  // console.log(draftId);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    isOpen: false,
    title: "Changes will be lost. Are you sure?",
    subTitle: "",
    confirmText: "Yes",
    cancelText: "No",
    onConfirm: async () => {
      if (currentDraftIdRef.current) {
        console.log("deleting");
        const response = await draftsApi.delete(currentDraftIdRef.current);
        currentDraftIdRef.current = "deleted";
        // console.log(response);
      }
      router.push("/dashboard");
    },
  });

  let forms: FormType[] = [
    recipientDetailsForm,
    companyDetailsForm,
    loopersDetailsForm,
  ];

  const formsProps = [
    useForm(forms[0].initialState),
    useForm(forms[1].initialState),
    useForm(forms[2].initialState),
  ];
  const saveDraftApiCallRef = useRef(
    new Debounce(
      async ({
        forms,
        formsProps,
        loopReceiptType,
        loopReceiptMode,
      }: {
        forms: FormType[];
        formsProps: useFormReturnType[];
        loopReceiptType: EntityLoopType;
        loopReceiptMode: EntityLoopMode;
      }) => {
        console.log(formsProps[0].formState.name.value);
        const loop = getEntityLoopFromFormsProps({
          forms,
          formsProps,
          loopReceiptType,
          loopReceiptMode,
        });
        if (currentDraftIdRef.current === "deleted") return;
        if (!currentDraftIdRef.current) {
          console.log("creating");
          const response = await draftsApi.create(loop);
          currentDraftIdRef.current = response?.draftId;
          // console.log(response);
        } else {
          console.log("updating");
          const response = await draftsApi.update(
            currentDraftIdRef.current,
            loop
          );
          // console.log(response);
        }
      },
      3000
    )
  );
  useEffect(() => {
    (async () => {
      if (draftId) {
        const response = await draftsApi.getOne(draftId as string);
        // console.log(response?.draft);
        const draft = response?.draft;

        if (draft) {
          currentDraftIdRef.current = draftId as string;
          setDraftSelected(draft);
          // set loop receipt mode and type

          dispatch(setLoopReceiptMode(draft.mode));
          dispatch(setLoopReceiptType(draft.type));
        }
      }
      setCheckForExistingDraftComplete(true);
    })();
  }, []);
  useEffect(() => {
    // console.log("create recipient form updated");
    if (checkForExistingDraftComplete === false) {
      return;
    }
    saveDraftApiCallRef.current.callAfterDelay({
      forms,
      formsProps,
      loopReceiptType,
      loopReceiptMode,
    });
  }, [
    ...formsProps.map((formProps) => formProps.formState),
    loopReceiptType,
    loopReceiptMode,
    confirmedLoopers,
  ]);

  useEffect(() => {
    dispatch(setConfirmedLoopers({ loopers: [] }));
    dispatch(setLoopReceiptMode(undefined));
  }, []);

  const addRecepientManually = useAppSelector(
    (state) => state.loopReceipt.addRecepientManually
  );
  const recepientFormIdx = forms.findIndex(
    (form) => form.formName === "recipientDetailsForm"
  );
  useEffect(() => {
    if (addRecepientManually) {
      let optionalFieldsAdded = true;
      for (let key in recipientDetailsForm.optionalFields) {
        if (!formsProps[recepientFormIdx].formState[key]) {
          optionalFieldsAdded = false;
          break;
        }
      }
      if (!optionalFieldsAdded) {
        formsProps[recepientFormIdx].setFormState((prev) => {
          return {
            ...recipientDetailsForm.optionalFields,
            ...prev,
          };
        });
      }
    } else {
      formsProps[recepientFormIdx].setFormState((prev) => {
        const updated = { ...prev };
        for (let key in recipientDetailsForm.optionalFields) {
          delete updated[key];
        }
        return updated;
      });
    }
  }, [addRecepientManually]);
  const handleCancelClick = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
    });
  };

  let passedForms: FormType[] = forms;
  let passedFormsProps: useFormReturnType[] = formsProps;
  if (loopReceiptType === "internal") {
    passedForms = [forms[0], forms[2]];
    passedFormsProps = [formsProps[0], formsProps[2]];
  }
  return (
    <Layout>
      <div className={styles.Create}>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        {loopReceiptMode === "single" ? (
          <OneByOne
            handleCancelClick={handleCancelClick}
            forms={passedForms}
            formsProps={passedFormsProps}
            currentDraftIdRef={currentDraftIdRef}
            draftSelected={draftSelected}
          />
        ) : loopReceiptMode === "group" ? (
          <AddByGroup
            handleCancelClick={handleCancelClick}
            forms={passedForms}
            formsProps={passedFormsProps}
            currentDraftIdRef={currentDraftIdRef}
            draftSelected={draftSelected}
          />
        ) : (
          <SelectOption />
        )}
      </div>
    </Layout>
  );
};
export default withRouter(Create);
const useStyles = makeStyles((theme) => ({
  Create: {},
}));
