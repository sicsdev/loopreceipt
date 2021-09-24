import * as React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import PrimaryLink from "@components/Shared/PrimaryLink";

interface MessageDialogProps {
  open: boolean;
  message: string | JSX.Element;
  onClose: VoidFunction;
  link?: any;
}

export default function MessageDialog({
  open,
  message,
  onClose,
  link,
}: MessageDialogProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { minWidth: 300, padding: 20 } }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          <Box justifyContent="center">
            <img src="/logo.png" alt="Logo" width={50} height={50} />
            <strong>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Loopreceipt
              </Typography>
            </strong>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            {message}&nbsp;
            {link && (
              <PrimaryLink href={link.href} type={link.type}>
                {link.text}
              </PrimaryLink>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            autoFocus
            onClick={onClose}
            variant="contained"
            color="primary"
          >
            <strong>Ok</strong>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
