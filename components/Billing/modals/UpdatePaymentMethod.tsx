import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Modal,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import InputBox from "@components/Controls/InputBox";
import CreditCardInput from "react-credit-card-input";

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
    },
  },
  dialogBox: {
    maxWidth: 465,
    [theme.breakpoints.down("sm")]: {
      padding: 24,
    },
    [theme.breakpoints.up("sm")]: {
      padding: 40,
    },
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#333333",
    textAlign: "center",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      lineHeight: "23px",
      marginBottom: 9,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 24,
      lineHeight: "28px",
      marginBottom: 50,
    },
  },
  titleCaption: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#BDBDBD",
    textAlign: "center",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      lineHeight: "16px",
      marginBottom: 19,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
      lineHeight: "16px",
      marginBottom: 19,
    },
  },
  inputTexts: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#333333",
  },
  input: {
    width: 130,
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
      justifyContent: "center",
    },
    [theme.breakpoints.up("sm")]: {},
  },
  buttons: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    "& span": {
      fontWeight: 500,
      textTransform: "none",
    },
    fontSize: 18,
    lineHeight: "21px",
    color: "#7A7A7A",
    borderRadius: 8,
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0px",
      minWidth: 138,
      minHeight: 47,
    },
    minWidth: 143,
    minHeight: 47,
  },
  saveButton: {
    color: "#000000",
    "& span": {
      fontWeight: "bold !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 10,
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
  inputBox: {
    display: "flex",
    marginBottom: ".5rem",
    gap: 10,
    fontWeight: "normal",
    fontSize: "1.1rem",
    color: "rgba(0, 0, 0, 0.87)",
  },
  billingCard: {
    "& .MyInputContainer": {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 10,
      "& .MyInputContainer": {
        fontSize: "12px !important",
      },
    },
    [theme.breakpoints.up("sm")]: { padding: 20 },
  },
  creditcardContainer: {
    width: "100%",
    border: "1px solid #E0E0E0",
    borderRadius: 4,
  },
  creditcardInput: {
    [theme.breakpoints.up("sm")]: {
      "& label > input": {
        fontSize: "12px !important",
      },
    },
    "& label:nth-child(2)": {
      width: "-webkit-fill-available",
    },
    "& label:nth-child(5)": {
      display: "none",
    },
  },
}));

interface UpdatePaymentMethodProps {
  open: boolean;
  handleClose: any;
}
export default function UpdatePaymentMethodModal({
  open,
  handleClose,
}: UpdatePaymentMethodProps) {
  const classes = useStyles();
  const handleInputChange = () => {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const handleCardNumberChange = (e: any) => {
    setCardNumber(e.target.value);
  };
  const handleCardExpiryChange = (e: any) => {
    setExpiry(e.target.value);
  };
  const handleCardCVCChange = (e: any) => {
    setCVC(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.dialog }}
    >
      <Box className={classes.dialogBox}>
        <Typography className={classes.title}>Enter New Card</Typography>

        <Box marginBottom={2}>
          <Typography className={classes.inputBox}>Credit Card</Typography>
          <CreditCardInput
            cardNumberInputProps={{
              value: cardNumber,
              onChange: handleCardNumberChange,
            }}
            cardExpiryInputProps={{
              value: expiry,
              onChange: handleCardExpiryChange,
            }}
            cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
            containerClassName={classes.creditcardContainer}
            fieldClassName={classes.creditcardInput}
          />
        </Box>
        <br />

        <Box className={classes.buttonContainer1}>
          <Button
            fullWidth
            onClick={handleClose}
            variant="outlined"
            size="large"
            className={classes.buttons}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            className={`${classes.buttons} ${classes.saveButton}`}
            color="primary"
            size="large"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
