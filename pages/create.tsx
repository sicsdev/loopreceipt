import OneByOne from "@components/Create/OneByOne";
import SelectOption from "@components/Create/SelectOption";
import { makeStyles } from "@material-ui/core";
import Layout from "@components/Global/Layout";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import recipientDetailsForm from "forms/recipientDetailsForm";
import loopersDetailsForm from "forms/loopersDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";

import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useForm } from "@hooks/useForm";
import AddByGroup from "@components/Create/AddByGroup/AddByGroup";
import { validateAllFieldsOfForm } from "forms/formUtils";
const Create = () => {
  const styles = useStyles();
  const [option, setOption] = useState<"onebyone" | "group">();
  const formType = useAppSelector((state) => state.loopReceipt.type);
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

  let passedForms: FormType[] = forms;
  let passedFormsProps: useFormReturnType[] = formsProps;
  if (formType === "internal") {
    passedForms = [forms[0], forms[2]];
    passedFormsProps = [formsProps[0], formsProps[2]];
  }
  return (
    <Layout>
      <div className={styles.Create}>
        {option === "onebyone" ? (
          <OneByOne
            forms={passedForms}
            formsProps={passedFormsProps}
            setOption={setOption}
          />
        ) : option === "group" ? (
          <AddByGroup
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
