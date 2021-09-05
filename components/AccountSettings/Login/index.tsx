import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  makeStyles,
} from "@material-ui/core";
import Link from "next/link";
import InputBox from "@components/Controls/InputBox";
import { validateSingleFieldOfForm } from "@forms/formUtils";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangePasswordModal from "./ChangePasswordModal";
import usersApi from "@apiClient/usersApi";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const useStyles = makeStyles((theme) => ({
  pageLabel: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      lineHeight: "33px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 24,
      lineHeight: "28px",
    },
  },
  inputBox: {
    display: "flex",
    marginBottom: ".5rem",
    gap: 10,
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  linkStyles: {
    marginRight: 0,
    marginLeft: "auto",
    cursor: "pointer",
    color: "#234361",
    fontSize: 18,
    lineHeight: "28px",
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
    border: "0px",
    paddingLeft: 0,
    background: "#fff",
    [theme.breakpoints.down("sm")]: { fontSize: 20 },
    [theme.breakpoints.up("sm")]: {
      fontSize: 24,
    },
  },
}));

export default function Login() {
  const classes = useStyles();

  let { user = { name: "" } } = useAppSelector((state) => state.user);

  const [changeEmail, setChangeEmail] = useState(false);
  const handleChangeEmailModalOpen = () => {
    setChangeEmail(true);
  };
  const handleChangeEmailModalClose = () => {
    setChangeEmail(false);
  };
  const [changePassword, setChangePassword] = useState(false);
  const handleChangePasswordModalOpen = () => {
    setChangePassword(true);
  };
  const handleChangePasswordModalClose = () => {
    setChangePassword(false);
  };

  const [state, setState] = useState({
    name: user.name || "",
    email: user.email || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const handleInputChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  // const onSubmit = async () => {
  //   setIsSaving(true);
  //   let response = await usersApi.updateUser(state);
  //   setIsSaving(false);
  // };

  // const deleteAccount = async () => {
  //   let response = await usersApi.deleteAccount();
  // };

  // useEffect(() => {
  //   setState({ name: user.name });
  // }, [user]);

  return (
    <Container>
      <div style={{ padding: "10px 30px" }}>
        <Typography className={classes.pageLabel}>
          You Log in with an email address and password
        </Typography>
        <br />

        <InputBox
          input={{
            type: "text",
            label: "Name",
            name: "name",
            placeholder: "Your full name",
            value: state.name,
          }}
          onChange={handleInputChange}
          onBlur={(e) => {}}
        />

        <Box className={classes.textBoxes} style={{ marginTop: 40 }}>
          <Box display="flex">
            <Typography className={classes.inputBox}>Email Address</Typography>
            <Typography
              className={classes.linkStyles}
              onClick={handleChangeEmailModalOpen}
            >
              Change Email
            </Typography>
          </Box>

          <InputBox
            input={{
              type: "email",
              label: "",
              name: "name",
              placeholder: "Your full name",
              value: state.email,
              inputProps: {
                className: classes.textFields,

                disabled: true,
              },
            }}
            onChange={handleInputChange}
            onBlur={(e) => {}}
          />
        </Box>

        <Box className={classes.textBoxes} style={{ marginTop: 40 }}>
          <Box display="flex">
            <Typography className={classes.inputBox}>Password</Typography>
            <Typography
              className={classes.linkStyles}
              onClick={handleChangePasswordModalOpen}
            >
              Change Password
            </Typography>
          </Box>

          <InputBox
            input={{
              type: "text",
              label: "",
              name: "password",
              placeholder: "***************",
              value: "",
              inputProps: {
                className: classes.textFields,
                disabled: true,
              },
            }}
            onChange={handleInputChange}
            onBlur={(e) => {}}
          />
        </Box>

        <div style={{ marginBottom: 100 }}></div>
        {/* <Box className={classes.buttonContainer}>
          <Box className={classes.buttonContainer1}>
            <Button
              variant="contained"
              className={`${classes.buttons} ${classes.saveButton}`}
              color="primary"
              size="large"
              onClick={onSubmit}
              disabled={isSaving}
            >
              Save Changes
            </Button>
            <Button variant="outlined" size="large" className={classes.buttons}>
              Cancel
            </Button>
          </Box>
          <Button
            variant="outlined"
            size="large"
            className={classes.buttons}
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
        </Box> */}
      </div>
      <ChangeEmailModal
        open={changeEmail}
        handleClose={handleChangeEmailModalClose}
      />
      <ChangePasswordModal
        open={changePassword}
        handleClose={handleChangePasswordModalClose}
      />
    </Container>
  );
}
