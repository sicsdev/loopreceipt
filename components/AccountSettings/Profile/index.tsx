import {
  Container,
  Typography,
  Box,
  Button,
  makeStyles,
} from "@material-ui/core";
import ProfileForm from "@forms/accountSettings/profileForm";
import UploadImage from "./UploadImage";
import { useForm } from "@hooks/useForm";
import ProfileFormDetails from "@forms/accountSettings/profileFormDetails";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      padding: 30,
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
      margin: "10px 30px",
    },
  },
  saveButton: {
    color: "#000000",
    "& span": {
      fontWeight: "bold !important",
    },
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {
      marginRight: 15,
    },
  },
}));

export default function Profile() {
  const classes = useStyles();

  const formProps = useForm(ProfileFormDetails.initialState);
  return (
    // <Container maxWidth="lg">
    <>
      <UploadImage />
      <ProfileForm form={ProfileFormDetails} formProps={formProps} />
      <Box className={classes.buttonContainer}>
        <Box className={classes.buttonContainer1}>
          <Button
            variant="contained"
            className={`${classes.buttons} ${classes.saveButton}`}
            color="primary"
            size="large"
          >
            Save Changes
          </Button>
          <Button variant="outlined" size="large" className={classes.buttons}>
            Cancel
          </Button>
        </Box>
        <Button variant="outlined" size="large" className={classes.buttons}>
          Delete Account
        </Button>
      </Box>
    </>
    // {/* </Container> */}
  );
}
