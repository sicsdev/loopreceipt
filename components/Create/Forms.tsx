import { makeStyles } from "@material-ui/core";
import Form from "@components/Create/Form";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useEffect } from "react";
import { useAppSelector } from "@store/hooks";
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

  useEffect(() => {
    // for entity forms we run itemClickDetector in useEffect defined in Entityform
    forms[activeFormIndex].searchItemClicked?.({
      setFormState: formsProps[activeFormIndex].setFormState,
      entity: searchItems.find((item) => item.active)?.entity,
    });
  }, [searchItemClickDetector]);
  useEffect(() => {
    forms[activeFormIndex].populateSearchItems?.();
  }, [activeFormIndex]);
  return (
    <div className={styles.Forms}>
      <Form
        form={forms[activeFormIndex]}
        {...formsProps[activeFormIndex]}
        validateOnBlur={true}
        autoComplete="off"
      />
    </div>
  );
};
export default Forms;
const useStyles = makeStyles((theme) => ({
  Forms: {
    "& form": {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
  },
}));
