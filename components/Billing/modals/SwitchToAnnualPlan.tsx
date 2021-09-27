import { useState, useEffect } from "react";
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
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import subscriptionApi from "@apiClient/subscriptionApi";
import { raiseAlert } from "@store/slices/genericSlice";
import classNames from "classnames";
import { PLAN_ID_TO_PLAN_DETAILS, PLANS } from "@constants/plans";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const useStyles = makeStyles((theme) => ({
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
      marginBottom: 25,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
      lineHeight: "16px",
      marginBottom: 25,
    },
  },
  inputBox: {
    display: "flex",
    marginBottom: ".5rem",
    gap: 10,
    fontWeight: "bold",
    fontSize: "1.1rem",
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
  changeCardButton: {
    border: "1px solid #234361",
    color: "#234361",
    "& span": {
      color: "#234361",
      textTransform: "none",
    },
  },
  textBoxes: {
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
  },
  descriptionText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "27px",
    textAlign: "center",
    color: "#828282",
    marginBottom: 18,
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},
  },
}));

interface SwitchToAnnualPlanProps {
  open: boolean;
  handleClose: any;
}
export default function SwitchToAnnualPlan({
  open,
  handleClose,
}: SwitchToAnnualPlanProps) {
  const classes = useStyles();
  const [changeCard, setChangeCard] = useState(false);
  const [planId, setPlanId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  let { user } = useAppSelector((state) => state.user);
  let { subscription } = useAppSelector((state) => state.subscription);

  useEffect(() => {
    if (subscription?.current_plan?.id) {
      if (
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]?.planType ==
          "Pro" &&
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]?.planDuration ==
          "Monthly"
      ) {
        setPlanId(PLANS.PRO.ANNUALLY.planId);
      } else if (
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]?.planType ==
          "Enterprise" &&
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]?.planDuration ==
          "Monthly"
      ) {
        setPlanId(PLANS.ENTERPRISE.ANNUALLY.planId);
      } else {
        raiseAlert("You already have Annual Plan!", "success");
      }
    }
  }, []);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (changeCard) {
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

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
      if (!paymentMethod) {
        raiseAlert("Some error occurred. Try Again", "error");
        return;
      }

      const res = await subscriptionApi.updateSubscriptionDetails(
        paymentMethod?.id
      );
      if (res.error == false) {
        let data = {
          subscriptionId: subscription?.subscriptionId,
          data: {
            price: planId,
          },
        };
        let resp = await subscriptionApi.updateSubscriptionPlan(data);
        if (!resp.error) {
          raiseAlert("Successfully Switched to Annual Plan!", "success");
          handleClose();
        } else {
          raiseAlert("Switch to Annual Plan failed.!", "success");
        }
        handleClose();
      } else {
        raiseAlert("Some error occurred. Try Again", "error");
      }
    } else {
      let data = {
        subscriptionId: subscription?.subscriptionId,
        data: {
          price: planId,
          quantity: subscription?.current_plan?.members,
        },
      };
      let res = await subscriptionApi.updateSubscriptionPlan(data);
      if (!res.error) {
        raiseAlert("Successfully Switched to Annual Plan!", "success");
        handleClose();
      } else {
        raiseAlert("Unknown error occurred!", "success");
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.dialogBox}>
          <Typography className={classes.title}>Switch to Annual</Typography>
          <br />
          {subscription?.current_plan?.members && (
            <>
              <Typography className={classes.descriptionText}>
                Your new annual bill will be $
                {PLAN_ID_TO_PLAN_DETAILS[
                  PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]
                    .moveToAnnually
                ]?.price * parseInt(subscription?.current_plan?.members)}{" "}
                starting{" "}
                {moment(subscription?.expires_at).format("DD MMM YYYY")}.
              </Typography>
              <Typography className={classes.descriptionText}>
                An estimated charge of $
                {PLAN_ID_TO_PLAN_DETAILS[
                  PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]
                    .moveToAnnually
                ]?.price * parseInt(subscription?.current_plan?.members)}{" "}
                will be applied today to your <strong>MasterCard</strong> ending
                in <strong>5972</strong>.
              </Typography>
            </>
          )}
          <br />
          {!changeCard ? (
            <Box textAlign="center">
              <Button
                onClick={() => setChangeCard(true)}
                variant="outlined"
                size="large"
                className={classNames(
                  classes.buttons,
                  classes.changeCardButton
                )}
              >
                Change Card
              </Button>
            </Box>
          ) : (
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
          )}
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
              type="submit"
              disabled={isSaving}
            >
              Switch
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
}
