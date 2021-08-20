import {
  Box,
  Button,
  Dialog,
  Modal,
  Typography,
  makeStyles,
} from "@material-ui/core";
import InputBox from "@components/Controls/InputBox";

const useStyles = makeStyles((theme) => ({
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
    display: "flex",
    marginBottom: ".5rem",
    gap: 10,
    fontWeight: "bold",
    fontSize: "1.1rem",
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
  const handleInputChange = () => {};
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: 5 }}>
        <Typography className={classes.title}>Change Log in Email</Typography>

        <InputBox
          input={{
            type: "password",
            label: "Password",
            name: "password",
            placeholder: "**********",
            value: "",
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
            value: "",
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
          >
            Save Changes
          </Button>
          <Button variant="outlined" size="large" className={classes.buttons}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
