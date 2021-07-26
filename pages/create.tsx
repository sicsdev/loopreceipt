import OneByOne from "@components/Create/OneByOne";
import SelectOption from "@components/Create/SelectOption";
import { makeStyles } from "@material-ui/core";
import Layout from "@components/Global/Layout";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import recipientDetailsForm from "forms/recipientDetailsForm";
import loopersDetailsForm from "forms/loopersDetailsForm";
import companyDetailsForm from "forms/companyDetailsForm";

import {
  FormStateType,
  FormType,
  useFormReturnType,
} from "@interfaces/FormTypes";
import { getLastChar } from "@helpers/utils";
import { useForm } from "@hooks/useForm";
import AddByGroup from "@components/Create/AddByGroup/AddByGroup";
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
  const entityCompletelyEmpty = (formState: FormStateType, id: number) => {
    const entityFields = Object.keys(formState).filter((key) =>
      key.endsWith(String(id))
    );
    for (let field of entityFields) {
      if (formState[field].value) {
        return false;
      }
    }
    return true; // return the validation as true
  };
  const validateFieldsOfForm = (
    formProps: useFormReturnType,
    form: FormType
  ) => {
    let allFieldsValid = true;
    let entityIdsToRemove = new Set<number>();
    const updatedFormState = { ...formProps.formState };
    for (const name in updatedFormState) {
      const input = { ...updatedFormState[name] };
      if (input.validate) {
        let valid = input.validate();
        if (form.entity) {
          const feildPartOfEmptyEntity = entityCompletelyEmpty(
            formProps.formState,
            +getLastChar(name)
          );
          if (!valid && feildPartOfEmptyEntity) {
            entityIdsToRemove.add(+getLastChar(name));
          }
          valid = valid || feildPartOfEmptyEntity;
        }

        // console.log(valid);
        if (!valid) {
          input.error = input.errorText;
          allFieldsValid = false;
        } else {
          input.error = "";
        }
        // console.log(input);
        updatedFormState[name] = input;
      }
    }
    formProps.setFormState(updatedFormState);
    if (entityIdsToRemove.size > 0) {
      formProps.setFormState((prevFormState) => {
        const updatedFormState: typeof prevFormState = {};
        for (let key in prevFormState) {
          let includeKey = true;
          for (let id of Array.from(entityIdsToRemove)) {
            if (key.endsWith(String(id))) {
              includeKey = false;
              break;
            }
          }
          if (includeKey) {
            updatedFormState[key] = prevFormState[key];
          }
        }
        return updatedFormState;
      });
    }
    return allFieldsValid;
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
        {option === "onebyone" ? (
          <OneByOne
            forms={passedForms}
            formsProps={passedFormsProps}
            setOption={setOption}
            validateFieldsOfForm={validateFieldsOfForm}
          />
        ) : option === "group" ? (
          <AddByGroup
            forms={passedForms}
            formsProps={passedFormsProps}
            setOption={setOption}
            validateFieldsOfForm={validateFieldsOfForm}
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
