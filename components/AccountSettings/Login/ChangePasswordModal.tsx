import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Modal,
  Typography,
  makeStyles,
} from "@material-ui/core";
import InputBox from "@components/Controls/InputBox";
import classNames from "classnames";
import usersApi from "@apiClient/usersApi";

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    maxWidth: 465,
    [theme.breakpoints.down("sm")]: {
      padding: 24,
      width: 310,
    },
    [theme.breakpoints.up("sm")]: {
      padding: 40,
    },
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#333333",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      lineHeight: "23px",
      marginBottom: 23,
    },
    [theme.breakpoints.up("sm")]: {
      fontWeight: 500,
      fontSize: 24,
      lineHeight: "28px",
      marginBottom: 41,
    },
  },
  inputBox: {
    "& .MyInputContainer": {
      width: "100%",
    },
  },

  buttonContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      // padding: 30,
      paddingRight: 0,
      width: "80%",
      justifyContent: "space-between",
    },
  },
  buttonContainer1: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      // padding: 30,
    },
  },
  buttons: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    "& span": {
      fontWeight: 500,
    },
    fontSize: 18,
    lineHeight: "21px",
    color: "#7A7A7A",
    borderRadius: 8,
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0px",
    },
    minWidth: 143,
    minHeight: 47,
  },
  saveButton: {
    color: "#000000",
    "& span": {
      fontWeight: "bold !important",
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: 10,
    },
  },
  textBoxes: {
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
  },
  textFields: {
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},
  },
}));

interface ChangePasswordModalProps {
  open: boolean;
  handleClose: any;
}
export default function ChangePasswordModal({
  open,
  handleClose,
}: ChangePasswordModalProps) {
  const classes = useStyles();
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const handleInputChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmit = async () => {
    setIsSaving(true);
    let response = await usersApi.passwordUpdate(state);
    setIsSaving(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className={classNames(classes.dialogBox, classes.inputBox)}>
        <Typography className={classes.title}>Change Password</Typography>

        <InputBox
          input={{
            type: "password",
            label: "Old Password",
            name: "currentPassword",
            placeholder: "**********",
            value: state.currentPassword,
          }}
          onChange={handleInputChange}
          onBlur={(e) => {}}
        />
        <br />

        <InputBox
          input={{
            type: "password",
            label: "New Password",
            name: "newPassword",
            placeholder: "**********",
            value: state.newPassword,
          }}
          onChange={handleInputChange}
          onBlur={(e) => {}}
        />
        <br />

        <InputBox
          input={{
            type: "password",
            label: "Confirm New Password",
            name: "confirmPassword",
            placeholder: "**********",
            value: state.confirmPassword,
          }}
          onChange={handleInputChange}
          onBlur={(e) => {}}
        />
        <br />

        <Box className={classes.buttonContainer1}>
          <Button
            onClick={onSubmit}
            variant="contained"
            className={`${classes.buttons} ${classes.saveButton}`}
            color="primary"
            size="large"
            disabled={isSaving}
          >
            Save Changes
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            className={classes.buttons}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
