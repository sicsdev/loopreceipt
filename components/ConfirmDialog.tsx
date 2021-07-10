import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
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
          text={confirmDialog.confirmText}
          color="primary"
          onClick={confirmDialog.onConfirm}
        />
        <Button
          text={confirmDialog.cancelText}
          variant="text"
          onClick={() =>
            setConfirmDialog((prev) => {
              return {
                ...prev,
                isOpen: false,
              };
            })
          }
        />
      </DialogActions>
    </Dialog>
  );
}
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
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
