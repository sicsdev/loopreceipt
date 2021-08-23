import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  makeStyles,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Card,
} from "@material-ui/core";
import InputBox from "@components/Controls/InputBox";
import CreditCardInput from "react-credit-card-input";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      width: 600,
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
      marginTop: 45,
      marginBottom: 9,
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
  radioGroup: {
    // marginBottom: 10,
    marginTop: 19,
    [theme.breakpoints.down("sm")]: {
      display: "inline-flex",
    },
    [theme.breakpoints.up("sm")]: {
      display: "inline-flex",
    },
  },
  radioContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "unset",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  radioTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#091E42",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      lineHeight: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "20px",
    },
  },
  radioControlMobile: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
    },
  },
  radioCaption: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#828282",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      lineHeight: "16px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
      lineHeight: "16px",
    },
  },
  subtitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#000000",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "20px",
    marginBottom: 15,
  },
  membersBox: {
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  billingBox: {
    padding: 1,
    paddingTop: 20,
    [theme.breakpoints.up("sm")]: {
      padding: 20,
    },
  },
  inputBox: {
    display: "flex",
    marginBottom: ".5rem",
    gap: 10,
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  payment: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#828282",
    marginTop: 18,
    marginBottom: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      lineHeight: "16px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
      lineHeight: "21px",
    },
  },
  buttonContainer: {
    display: "flex",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between",
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
  secureText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: "20px",
    color: "#828282",
  },
  secureIcon: {
    color: "#828282",
    fontSize: 12,
    marginRight: 10,
  },
}));

interface PaymentProps {
  open: boolean;
  handleClose: any;
  upgradePlan: string;
}

type PAYMENTS_MODE_TYPE = {
  [key: string]: any;
};

const PAYMENTS_MODE: PAYMENTS_MODE_TYPE = {
  Choice: {
    monthly: 14,
    yearly: 11,
  },
  Pro: {
    monthly: 20,
    yearly: 17,
  },
  Enterprize: {
    monthly: 20,
    yearly: 17,
  },
};

export default function Payment({
  open,
  handleClose,
  upgradePlan,
}: PaymentProps) {
  const classes = useStyles();
  const handleInputChange = () => {};

  const [value, setValue] = useState("monthly");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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
    <Box className={classes.modal}>
      <Typography className={classes.title}>
        Upgrade to {upgradePlan}
      </Typography>
      <Typography className={classes.titleCaption}>
        Prices are in CAD/USD
      </Typography>

      <Box className={classes.membersBox} textAlign="center">
        <Typography className={classes.subtitle}>Add Members</Typography>
        <TextField
          type="number"
          size="small"
          variant="outlined"
          label="0"
          style={{ backgroundColor: "#fff" }}
        />
        <RadioGroup
          className={classes.radioGroup}
          name="fee"
          value={value}
          onChange={handleChange}
        >
          <Box className={classes.radioContainer}>
            <FormControlLabel
              value="monthly"
              control={<Radio color="secondary" />}
              label={
                <Box textAlign="left">
                  <Typography className={classes.radioTitle}>
                    ${PAYMENTS_MODE[upgradePlan].monthly} /member/mo paid
                    monthly
                  </Typography>
                  <Typography className={classes.radioCaption}>
                    ${PAYMENTS_MODE[upgradePlan].monthly} due today
                  </Typography>
                </Box>
              }
              className={classes.radioControlMobile}
            />

            <FormControlLabel
              value="yearly"
              control={<Radio color="secondary" />}
              label={
                <Box textAlign="left">
                  <Typography className={classes.radioTitle}>
                    ${PAYMENTS_MODE[upgradePlan].yearly} /member/mo paid monthly
                  </Typography>
                  <Typography className={classes.radioCaption}>
                    ${PAYMENTS_MODE[upgradePlan].yearly * 12} due today
                  </Typography>
                </Box>
              }
            />
          </Box>
        </RadioGroup>
      </Box>

      <Box className={classes.billingBox} textAlign="center">
        <Typography className={classes.subtitle}>
          Billing Information
        </Typography>
        <Card className={classes.billingCard}>
          <InputBox
            input={{
              type: "email",
              label: "Email",
              name: "email",
              placeholder: "Your email address",
              value: "",
            }}
            onChange={handleInputChange}
            onBlur={(e) => {}}
          />
        </Card>
        <br />

        <Card className={classes.billingCard}>
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: 10 }}
          >
            <LockIcon fontSize="small" className={classes.secureIcon} />
            <Typography className={classes.secureText}>
              Secure payment
            </Typography>
          </Box>
        </Card>

        <Typography className={classes.payment}>
          Total payment due: $
          {value === "yearly"
            ? `${PAYMENTS_MODE[upgradePlan].yearly * 12}`
            : `${PAYMENTS_MODE[upgradePlan].monthly}`}
        </Typography>
      </Box>

      <br />

      <Box className={classes.buttonContainer}>
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
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
