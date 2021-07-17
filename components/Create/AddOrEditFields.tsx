import { makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import Form from "@components/shared/Form";
import {
  FormStateType,
  FormType,
  useFormReturnType,
} from "@interfaces/FormTypes";
import { getLastChar, setLastChar } from "@helpers/utils";
interface AddOrEditFieldsProps {
  formProps: useFormReturnType;
  form: FormType;
}
const AddOrEditFields = ({ formProps, form }: AddOrEditFieldsProps) => {
  const styles = useStyles();
  const addField = () => {
    formProps.setFormState((prevFormState: FormStateType) => {
      const keys = Object.keys(prevFormState);
      // console.log(keys);
      const lastKey = keys[keys.length - 1];
      const lastKeyId = +getLastChar(lastKey);
      // console.log(lastKeyId);

      const newLooperEntry: any = {};
      for (let [key, value] of Object.entries(form.initialState)) {
        const newKey = setLastChar(key, `${lastKeyId + 1}`);
        newLooperEntry[newKey] = {
          ...value,
          name: newKey,
        };
      }
      const updatedFormState = {
        ...prevFormState,
        ...newLooperEntry,
      };
      return updatedFormState;
    });
  };
  return (
    <div className={styles.AddOrEditFields}>
      <Form {...formProps} validateOnBlur={true} autoComplete="off" />
      <div className="button">
        <Button color="secondary" labelColor="white" onClick={addField}>
          + Add more
        </Button>
      </div>
    </div>
  );
};
export default AddOrEditFields;
const useStyles = makeStyles((theme) => ({
  AddOrEditFields: {
    "& .button": {
      marginTop: "4rem",
    },
  },
}));
