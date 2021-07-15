import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
} from "@material-ui/core";

import React, { useEffect } from "react";
import Button from "@components/Controls/Button";
import ConfirmDialogType from "@interfaces/ConfirmDialogType";

interface ConfirmDialogProps {
  confirmDialog: ConfirmDialogType;
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialogType>>;
}
export default function ConfirmDialog({
  confirmDialog,
  setConfirmDialog,
}: ConfirmDialogProps) {
  const styles = useStyles();
  const closeDialog = () => {
    setConfirmDialog((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  };

  return (
    <Dialog
      open={confirmDialog.isOpen}
      classes={{
        paper: styles.dialog,
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button
          color="primary"
          onClick={confirmDialog.onConfirm}
          size="medium"
          expand
          labelWeight="bold"
        >
          {confirmDialog.confirmText}
        </Button>

        <Button
          variant="outlined"
          color="default"
          onClick={closeDialog}
          size="medium"
          expand
          labelColor="gray"
        >
          {confirmDialog.cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: "1rem",
    [theme.breakpoints.down("xs")]: {
      minWidth: "90vw",
      padding: "1rem .8rem",
    },
  },
  dialogContent: {
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  dialogActions: {
    display: "grid",
    gridTemplateColumns: `repeat(2, 1fr)`,
    gap: ".5rem",
    [theme.breakpoints.down("xs")]: {
      gap: ".1rem",
    },
  },
}));
