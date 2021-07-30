import { makeStyles } from "@material-ui/core";
import Form from "@components/Create/Form";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSearchItemClickDetector } from "@store/slices/searchBarSlice";

interface FormsProps {
  forms: FormType[];
  formsProps: useFormReturnType[];
  activeFormIndex: number;
}
const Forms = ({ forms, formsProps, activeFormIndex }: FormsProps) => {
  const styles = useStyles();

  const { searchItems, searchItemClickDetector } = useAppSelector(
    (state) => state.searchBar
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    // for entity forms we run itemClickDetector in useEffect defined in Entityform
    if (searchItemClickDetector) {
      forms[activeFormIndex].searchItemClicked?.({
        setFormState: formsProps[activeFormIndex].setFormState,
        entity: searchItems.find((item) => item.active)?.entity,
      });
      dispatch(setSearchItemClickDetector(false));
    }
  }, [searchItemClickDetector]);
  useEffect(() => {
    forms[activeFormIndex].populateSearchItems?.();
  }, [activeFormIndex]);
  return (
    <div className={styles.Forms}>
      <Form
        form={forms[activeFormIndex]}
        formProps={formsProps[activeFormIndex]}
        validateOnBlur={true}
        autoComplete="off"
      />
    </div>
  );
};
export default Forms;
const useStyles = makeStyles((theme) => ({
  Forms: {},
}));
