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
import router from "next/router";
import { setActiveTabIndex } from "@store/slices/dashboardSlice";
import draftsApi from "@apiClient/draftsApi";
import { useRef } from "react";
import { Debounce } from "@helpers/utils";
const Create = () => {
  const styles = useStyles();
  const [option, setOption] = useState<"onebyone" | "group">();
  const formType = useAppSelector((state) => state.loopReceipt.type);
  const dispatch = useAppDispatch();
  const currentDraftIdRef = useRef<string>();
  const initRef = useRef(true);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    isOpen: false,
    title: "Changes will be lost. Are you sure?",
    subTitle: "",
    confirmText: "Yes",
    cancelText: "No",
    onConfirm: async () => {
      if (currentDraftIdRef.current) {
        // console.log("deleting");
        const response = await draftsApi.delete(currentDraftIdRef.current);
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
    new Debounce(async (formsProps: useFormReturnType[]) => {
      console.log(formsProps[0].formState.name.value);
      const loop = getEntityLoopFromFormsProps({ forms, formsProps, formType });
      if (!currentDraftIdRef.current) {
        // console.log("creating");
        const response = await draftsApi.create(loop);
        currentDraftIdRef.current = response?.draftId;
        // console.log(response);
      } else {
        // console.log("updating");
        const response = await draftsApi.update(
          currentDraftIdRef.current,
          loop
        );
        // console.log(response);
      }
    }, 3000)
  );
  useEffect(
    () => {
      // console.log("create recipient form updated");
      if (initRef.current) {
        setTimeout(() => {
          initRef.current = false;
        }, 3000);
        return;
      }
      saveDraftApiCallRef.current.callAfterDelay(formsProps);
    },
    formsProps.map((formProps) => formProps.formState)
  );

  useEffect(() => {
    dispatch(setConfirmedLoopers({ loopers: [] }));
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
  if (formType === "internal") {
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
        {option === "onebyone" ? (
          <OneByOne
            handleCancelClick={handleCancelClick}
            forms={passedForms}
            formsProps={passedFormsProps}
            setOption={setOption}
          />
        ) : option === "group" ? (
          <AddByGroup
            handleCancelClick={handleCancelClick}
            forms={passedForms}
            formsProps={passedFormsProps}
            setOption={setOption}
          />
        ) : (
          <SelectOption setOption={setOption} />
        )}
      </div>
    </Layout>
  );
};
export default Create;
const useStyles = makeStyles((theme) => ({
  Create: {},
}));
