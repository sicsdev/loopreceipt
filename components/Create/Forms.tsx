import { makeStyles } from "@material-ui/core";
import EntityForm from "./EntityForm";
import Form from "@components/Shared/Form";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
interface FormsProps {
  forms: FormType[];
  formsProps: useFormReturnType[];
  activeFormIndex: number;
}
const Forms = ({ forms, formsProps, activeFormIndex }: FormsProps) => {
  const styles = useStyles();

  return (
    <div className={styles.Forms}>
      {forms[activeFormIndex].entity ? (
        <EntityForm
          formProps={formsProps[activeFormIndex]}
          form={forms[activeFormIndex]}
        />
      ) : (
        <Form
          {...formsProps[activeFormIndex]}
          validateOnBlur={true}
          autoComplete="off"
        />
      )}
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
