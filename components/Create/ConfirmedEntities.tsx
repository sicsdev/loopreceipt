import {
  Dialog,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import Button from "@components/Controls/Button";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Image from "next/image";
import {
  confirmLooper,
  deleteConfirmedLooper,
  editConfirmedLooper,
} from "@store/slices/searchBarSlice";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useEffect, useState } from "react";
import { useForm } from "@hooks/useForm";
import Form from "./Form";
import { EntityLooper } from "apiHelpers/types";
import { validateAllFieldsOfForm } from "forms/formUtils";
interface ConfirmedEntitiesProps {
  formProps: useFormReturnType;
  form: FormType;
}
const ConfirmedEntities = ({ formProps, form }: ConfirmedEntitiesProps) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [editedLooper, setEditedLooper] = useState<
    EntityLooper & { id: string }
  >();
  const editedForm: FormType = {
    ...form,
    formName: "editLooperDetailsForm",
  };
  const editedFormProps = useForm(form.initialState);
  const confirmedLoopers = useAppSelector(
    (state) => state.searchBar.confirmedLoopers
  );

  return (
    <div className={styles.ConfirmedEntities}>
      <Dialog
        open={editing}
        onClose={(event, reason) => {
          // console.log(reason);
          setEditing(false);
        }}
        classes={{
          paper: styles.dialog,
        }}
      >
        <DialogContent>
          <DialogContent className={styles.dialogContent}>
            <div className="head">Edit Looper: {editedLooper?.name}</div>
            <Form
              form={editedForm}
              formProps={editedFormProps}
              autoComplete="off"
              padForm={false}
              defaultValues={{
                looperName: editedLooper?.name ?? "",
                looperEmail: editedLooper?.email ?? "",
              }}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button
            color="primary"
            onClick={() => {
              // console.log(editedFormProps);
              if (validateAllFieldsOfForm(editedFormProps)) {
                const updatedLooper = {
                  id: editedLooper!.id,
                  email: editedFormProps.formState.looperEmail.value,
                  name: editedFormProps.formState.looperName.value,
                };
                // console.log(updatedLooper);

                dispatch(editConfirmedLooper({ looper: updatedLooper }));
                setEditing(false);
              }
            }}
            size="medium"
            labelWeight="bold"
          >
            Save Changes
          </Button>

          <Button
            variant="outlined"
            color="default"
            onClick={() => {
              setEditing(false);
            }}
            size="medium"
            labelColor="gray"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div className="addbutton">
        <Button
          color="secondary"
          labelColor="white"
          onClick={() => {
            // console.log("click");
            let allValid = validateAllFieldsOfForm(formProps);
            // console.log(allValid);
            if (allValid) {
              dispatch(
                confirmLooper({
                  looper: {
                    name: formProps.formState["looperName"].value,
                    email: formProps.formState["looperEmail"].value,
                  },
                })
              );
              formProps.setFormState(form.initialState);
            }
          }}
        >
          + Add more
        </Button>
      </div>
      <div className="confirmedItems">
        {confirmedLoopers.map((looper) => (
          <div key={looper.id} className="confirmedItem">
            <div>
              {looper.name}, {looper.email}
            </div>
            <div className="buttons">
              <div
                className="image"
                onClick={() => {
                  setEditedLooper(looper);
                  setEditing(true);
                }}
              >
                <Image
                  alt="icon"
                  src="/icons/create/edit.svg"
                  width={20}
                  height={20}
                />
              </div>
              <div className="divider"></div>
              <div
                className="image"
                onClick={() => {
                  dispatch(deleteConfirmedLooper({ id: looper.id }));
                }}
              >
                <Image
                  alt="icon"
                  src="/icons/create/trash.svg"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ConfirmedEntities;
const useStyles = makeStyles((theme) => ({
  ConfirmedEntities: {
    "& .addbutton": {
      padding: "0 2rem",
    },
    "& .confirmedItems": {
      marginTop: "2rem",
      padding: "0 2rem",
      borderTop: "2px solid #DDDDDD",
      "& .confirmedItem": {
        margin: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .details": {},
        "& .buttons": {
          display: "flex",
          gap: 10,
          "& .divider": {
            width: "2px",
            backgroundColor: "#c4c4c4",
          },
          "& .image": {
            // border: "1px solid red",
            cursor: "pointer",
            display: "flex",
          },
        },
      },
    },
  },
  dialog: {
    padding: "1rem",
    borderRadius: 8,
    width: 500,
    [theme.breakpoints.down("xs")]: {
      minWidth: "90vw",
      padding: "1rem .8rem",
    },
  },
  dialogContent: {
    padding: 0,
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    "& .head": {
      marginBottom: "2rem",
      fontSize: 24,
      fontWeight: 600,
      textAlign: "center",
    },
    // border: "1px solid red",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "flex-start",
    "& button": {
      width: 150,
    },
  },
}));
