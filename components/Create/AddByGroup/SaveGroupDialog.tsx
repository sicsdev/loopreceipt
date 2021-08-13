import Button from "@components/Controls/Button";

import groupDetailsForm from "@forms/groupDetailsForm";
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Form from "../Form";

import { useFormReturnType } from "@interfaces/FormTypes";

interface SaveGroupDialogProps {
  saveGroupDialogOpen: boolean;
  setSaveGroupDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

  groupFormProps: useFormReturnType;
  saveGroup: () => void;
}
const SaveGroupDialog = ({
  saveGroupDialogOpen,
  setSaveGroupDialogOpen,
  groupFormProps,
  saveGroup,
}: SaveGroupDialogProps) => {
  const styles = useStyles();

  return (
    <div>
      <Dialog
        open={saveGroupDialogOpen}
        onClose={(event, reason) => {
          // console.log(reason);
          setSaveGroupDialogOpen(false);
        }}
        classes={{
          paper: styles.dialog,
        }}
      >
        <DialogContent>
          <DialogContent className={styles.dialogContent}>
            <div className="head">Save Group</div>
            <Form
              form={groupDetailsForm}
              formProps={groupFormProps}
              autoComplete="off"
              padForm={false}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button
            variant="outlined"
            color="default"
            onClick={() => {
              setSaveGroupDialogOpen(false);
            }}
            size="medium"
            labelColor="gray"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={saveGroup}
            size="medium"
            labelWeight="bold"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SaveGroupDialog;
const useStyles = makeStyles((theme) => ({
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
    justifyContent: "space-between",
    "& button": {
      width: "48%",
    },
  },
}));
