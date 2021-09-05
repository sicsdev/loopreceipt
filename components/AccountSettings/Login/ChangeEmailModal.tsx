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
import { raiseAlert } from "@store/slices/genericSlice";

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

interface ChangeEmailModalProps {
  open: boolean;
  handleClose: any;
}
export default function ChangeEmailModal({
  open,
  handleClose,
}: ChangeEmailModalProps) {
  const classes = useStyles();
  const [state, setState] = useState({
    password: "",
    email: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const handleInputChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    let response = await usersApi.updateUser(state);
    if (response?.error && response?.message) {
      raiseAlert(response?.message, "error");
    } else {
      raiseAlert("Successfully Updated Email!", "success");
      handleClose();
    }

    setIsSaving(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <Box className={classNames(classes.dialogBox, classes.inputBox)}>
          <Typography className={classes.title}>Change Log in Email</Typography>

          <InputBox
            input={{
              type: "password",
              label: "Password",
              name: "password",
              placeholder: "**********",
              value: state.password,
            }}
            onChange={handleInputChange}
            onBlur={(e) => {}}
          />
          <br />

          <InputBox
            input={{
              type: "email",
              label: "New Email Address",
              name: "email",
              placeholder: "newemailaddress@gmail.com",
              value: state.email,
            }}
            onChange={handleInputChange}
            onBlur={(e) => {}}
          />
          <br />

          <Box className={classes.buttonContainer1}>
            <Button
              variant="contained"
              className={`${classes.buttons} ${classes.saveButton}`}
              color="primary"
              size="large"
              disabled={isSaving}
              type="submit"
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
      </form>
    </Dialog>
  );
}
