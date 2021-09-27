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
import subscriptionApi from "@apiClient/subscriptionApi";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { raiseAlert } from "@store/slices/genericSlice";
import classNames from "classnames";
import { PLAN_ID_TO_PLAN_DETAILS, PLANS } from "@constants/plans";
import moment from "moment";

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
      marginBottom: 40,
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
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      lineHeight: "16px",
      marginBottom: 19,
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
      lineHeight: "24px",
      marginBottom: 29,
      textAlign: "left",
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
      minWidth: 120,
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
      marginRight: 10,
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

interface DowngradeProps {
  open: boolean;
  handleClose: any;
  setDowngraded: any;
}
export default function DowngradeModal({
  open,
  handleClose,
  setDowngraded,
}: DowngradeProps) {
  const classes = useStyles();
  const [reason, setReason] = useState("");

  let { subscription } = useAppSelector((state) => state.subscription)

  const handleDowngrade = () => {
    setDowngraded(true);
    handleClose();
  };

  const [planId, setPlanId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  // const handleInputChange = () => {};

  useEffect(() => {
    if(subscription?.current_plan?.id) {
      if (
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]
          ?.planType == "Enterprise" &&
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]
          ?.planDuration == "Monthly"
      ) {
        setPlanId(PLANS.PRO.MONTHLY.planId);
      } else if (
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]
          ?.planType == "Enterprise" &&
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]
          ?.planDuration == "Annually"
      ) {
        setPlanId(PLANS.PRO.ANNUALLY.planId);
      } else if (
        PLAN_ID_TO_PLAN_DETAILS[subscription?.current_plan?.id]
          ?.planType == "Pro"
      ) {
        raiseAlert("Their is no plan lower than Pro!", "success");
      }
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = {
      subscriptionId: subscription?.subscriptionId,
      data: {
        price: planId,
      },
    };
    let res = await subscriptionApi.updateSubscriptionPlan(data);
    if (!res.error) {
      raiseAlert("Successfully Downgraded!", "success");
    } else {
      raiseAlert("Unknown error occurred!", "success");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.dialogBox}>
          <Typography className={classes.title}>Downgrade to Super</Typography>
          <Typography className={classes.titleCaption}>
            Your Pro plan will end on 3 June 2021, and you will no longer be
            charged for your subscription.
          </Typography>
          <Typography className={classes.inputBox}>
            Reason for downgrading*
          </Typography>
          <TextField
            fullWidth
            select
            SelectProps={{ native: true }}
            variant="outlined"
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="Select Reason">Select Reason</option>
            <option value="I no longer need it">I no longer need it</option>
            <option value="I found a better tool">I found a better tool</option>
            <option value="The product doesn't do what I need">
              The product doesn&apos;t do what I need
            </option>
            <option value="It's too expensive">It&apos;s too expensive</option>
            <option value="Other">Other</option>
          </TextField>
          <br /> <br />
          <Typography className={classes.inputBox}>
            Additional comments
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            multiline={true}
            type="text"
            // @Malik min rows max rows was raising error please set height
          />
          <br /> <br />
          <Box className={classes.buttonContainer1}>
            <Button
              fullWidth
              variant="contained"
              className={`${classes.buttons} ${classes.saveButton}`}
              color="primary"
              size="large"
              type="submit"
              disabled={isSaving || !reason}
            >
              Downgrade
            </Button>
            <Button
              fullWidth
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
