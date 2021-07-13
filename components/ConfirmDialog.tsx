import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
} from "@material-ui/core";

import React from "react";
import Button from "@components/Button";
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
          size="large"
          expand
          labelWeight="bold"
        >
          {confirmDialog.confirmText}
        </Button>

        <Button
          variant="outlined"
          color="default"
          onClick={() =>
            setConfirmDialog((prev) => {
              return {
                ...prev,
                isOpen: false,
              };
            })
          }
          size="large"
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
    padding: theme.spacing(2),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogActions: {
    display: "grid",
    gridTemplateColumns: `repeat(2, 1fr)`,
    gap: 8,
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));
