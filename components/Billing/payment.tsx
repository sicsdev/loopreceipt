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
/* @ts-ignore */
import CreditCardInput from "react-credit-card-input";
import LockIcon from "@material-ui/icons/Lock";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import subscriptionApi from "@apiClient/subscriptionApi";
import { raiseAlert } from "@store/slices/genericSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { PLANS } from "@constants/plans";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useForm } from "@hooks/useForm";
import billingDetailsForm from "@forms/billing/billingDetailsForm";
import Form from "@forms/billing/Form";
import { validateAllFieldsOfForm } from "forms/formUtils";

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: "#fff",
    // [theme.breakpoints.up("sm")]: {
    //   width: 600,
    // },
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

export default function Payment({
  open,
  handleClose,
  upgradePlan,
}: PaymentProps) {
  const classes = useStyles();
  const [values, setValues] = useState({
    // email: "",
    phone: "",
    city: "",
    country: "",
    state: "",
    address: "",
  });
  const handleInputChange = (event: any) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });
  };

  let { user } = useAppSelector((state) => state.user);

  const [memberCount, setMemberCount] = useState(0);
  const [value, setValue] = useState("MONTHLY");
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

  const formProps = useForm(billingDetailsForm.initialState);
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    setIsSaving(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email: user?.email,
      },
    });

    if (error) {
      console.log("[error]", error);
      raiseAlert("Some error occurred. Try Again", "error");
      return;
    }

    console.log("[PaymentMethod]", paymentMethod);

    let data = {
      priceId: PLANS[upgradePlan][value].planId,
      memberCount: memberCount,
    };

    const res = await subscriptionApi.create(data);

    if (res?.error) {
      raiseAlert("Subscription Failed!", "error");
      return;
    }

    stripe
      .confirmCardPayment(res?.client_secret, {
        payment_method: paymentMethod?.id,
      })
      .then((result: any) => {
        if (result.error) {
          raiseAlert(result?.error?.message, "error");
        } else {
          // Successful subscription payment
          raiseAlert(`Subscription Succeeded `, "success");
          handleClose();
        }
        setIsSaving(false);
      })
      .catch(() => {
        setIsSaving(false);
      });
  };

  return (
    <Box className={classes.modal}>
      <form onSubmit={handleSubmit}>
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
            placeholder="0"
            inputProps={{ style: { textAlign: "center" }, min: 0 }}
            style={{ backgroundColor: "#fff" }}
            name="memberCount"
            onChange={(e: any) => {
              setMemberCount(e.target.value);
            }}
            required={true}
          />
          <RadioGroup
            className={classes.radioGroup}
            name="fee"
            value={value}
            onChange={handleChange}
          >
            <Box className={classes.radioContainer}>
              <FormControlLabel
                value="MONTHLY"
                control={<Radio color="secondary" />}
                label={
                  <Box textAlign="left">
                    <Typography className={classes.radioTitle}>
                      ${PLANS[upgradePlan].MONTHLY.price} /member/mo paid
                      monthly
                    </Typography>
                    <Typography className={classes.radioCaption}>
                      ${PLANS[upgradePlan].MONTHLY.price} due today
                    </Typography>
                  </Box>
                }
                className={classes.radioControlMobile}
              />

              <FormControlLabel
                value="ANNUALLY"
                control={<Radio color="secondary" />}
                label={
                  <Box textAlign="left">
                    <Typography className={classes.radioTitle}>
                      ${PLANS[upgradePlan].ANNUALLY.price} /member/mo paid
                      monthly
                    </Typography>
                    <Typography className={classes.radioCaption}>
                      ${PLANS[upgradePlan].ANNUALLY.price} due today
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
          {/* <Card className={classes.billingCard}>
            <Form
              form={billingDetailsForm}
              formProps={formProps}
              padForm={false}
              // onSubmit={onSubmit}
            />
          </Card> */}
          <br />

          <Card className={classes.billingCard}>
            <Typography className={classes.inputBox}>Credit Card</Typography>

            {/* <CreditCardInput
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
            /> */}

            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
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
            Total payment due: ${PLANS[upgradePlan][value].price * memberCount}
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
            type="submit"
            disabled={!stripe || isSaving}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
}
