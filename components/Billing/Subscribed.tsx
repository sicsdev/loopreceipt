import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  TextField,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Link from "next/link";
import AddMembersModal from "./modals/AddMembers";
import RemoveMembersModal from "./modals/RemoveMembers";
import UpdatePaymentMethodModal from "./modals/UpdatePaymentMethod";
import DowngradeModal from "./modals/Downgrade";
import UpgradeModal from "./modals/Upgrade";
import MsgModal from "./modals/MsgModal";
import classNames from "classnames";
import subscriptionApi from "@apiClient/subscriptionApi";
import { raiseAlert } from "@store/slices/genericSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import moment from "moment";
import { PLAN_ID_TO_PLAN_DETAILS } from "@constants/plans";

const useStyles = makeStyles((theme) => ({
  box: {
    [theme.breakpoints.down("sm")]: {
      //   paddingTop: 30,
      border: 0,
      //   textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "28px 17px",
    },
  },
  heading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      marginBottom: 19,
      lineHeight: "27px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 24,
      marginBottom: 28,
      lineHeight: "29px",
    },
  },
  subheading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#828282",
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
      marginBottom: 19,
      lineHeight: "27px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
      marginBottom: 28,
      lineHeight: "19px",
    },
  },
  switchButton: {
    color: "#000000",
    "& span": {
      fontWeight: "bold !important",
      textTransform: "none",
    },
    borderRadius: 8,
    height: 53,
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: 10,
      marginLeft: 10,
    },
  },
  changePlan: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  nextPaymentButton: {
    color: "#234361",
    borderColor: "#234361",
    "& span": {
      fontWeight: 500,
      textTransform: "none",
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
        lineHeight: "14px",
        padding: "14px",
      },
    },
  },
  table: {
    minWidth: 650,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  card: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    background: "#FFFFFF",
    border: "1px solid #F2F2F2",
    boxSizing: "border-box",
    borderRadius: 4,
    padding: 15,
  },
  cardTextTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "19px",
    color: "#828282",
    marginBottom: 32,
  },
  cardTextValue: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: "19px",
    color: "#828282",
    marginBottom: 32,
  },
  contentHeadings: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#4F4F4F",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      lineHeight: "23px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 22,
      lineHeight: "26px",
    },
  },
}));

interface SubscribedProps {
  subsriptionDetails?: any;
}

export default function Subscribed({ subscriptionDetails }: SubscribedProps) {
  const classes = useStyles();
  const [downgraded, setDowngraded] = useState(false);

  const [modal, setModal] = useState("");
  const handleChangePlan = (e: any) => {
    setModal(e.target.value);
  };

  const [msgTitle, setMsgTitle] = useState("Success");
  const [msgDescription, setMsgDescription] = useState(
    "You will no longer be billed."
  );
  const [msgModal, setMsgModal] = useState(false);
  const handleMsgModalOpen = () => setMsgModal(true);
  const handleMsgModalClose = () => setMsgModal(false);

  let { user } = useAppSelector((state) => state.user);

  let [paymentHistory, setPaymentHistory] = useState([]);
  let fetchPaymentHistory = async () => {
    const res = await subscriptionApi.getPaymentHistory(
      subscriptionDetails?.customerId
    );
    if (res.error == false && res.details) {
      setPaymentHistory(res.details);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [subscriptionDetails?.customerId]);

  return (
    <Box className={classes.box}>
      {downgraded ? (
        <>
          <Typography className={classes.heading}>
            You’ve downgraded to the Basic plan.
          </Typography>
          <Typography className={classes.subheading}>
            You have access to Pro features until your subscription ends on 3
            June 2021.
            <br />
            <br />
            Changed your mind? Undo your downgrade and pick up right where you
            left off.
          </Typography>
          <Button color="primary" variant="contained">
            Undo Downgrade
          </Button>
        </>
      ) : (
        <>
          <Typography className={classes.heading}>
            You’re subscribed to the{" "}
            {PLAN_ID_TO_PLAN_DETAILS[
              subscriptionDetails?.current_plan?.id
            ]?.planType?.toUpperCase()}{" "}
            {
              PLAN_ID_TO_PLAN_DETAILS[subscriptionDetails?.current_plan?.id]
                ?.planDuration
            }{" "}
            plan for {subscriptionDetails?.current_plan?.members} member(s)
          </Typography>
          <Typography className={classes.subheading}>
            Your subscription will renew on{" "}
            {moment(subscriptionDetails?.expires_at).format("DD MMM YYYY")}{" "}
            using your MasterCard ending in {subscriptionDetails?.card?.last4}.
          </Typography>
          <Button className={classes.nextPaymentButton} variant="outlined">
            Next payment: Scheduled for{" "}
            {moment(subscriptionDetails?.expires_at).format("DD MMM YYYY")}
          </Button>
        </>
      )}
      <br /> <br /> <br />
      <Divider />
      <br /> <br />
      <Typography
        className={classes.contentHeadings}
        style={{ marginBottom: 29 }}
      >
        Change Plan
      </Typography>
      <Box className={classes.changePlan}>
        <TextField
          select
          SelectProps={{ native: true }}
          variant="outlined"
          fullWidth
          onChange={handleChangePlan}
        >
          <option value="">Make Changes to your plan</option>
          <option value="1">Add members</option>
          <option value="2">Remove members</option>
          <option value="3">Update payment methods and ZIP code</option>
          <option value="4">Switch to annual (save $24 per year)</option>
          <option value="5">Upgrade</option>
          <option value="6">Downgrade</option>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.switchButton}
        >
          Switch to annual (save $24 per year)
        </Button>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <Typography
        className={classes.contentHeadings}
        style={{ marginBottom: 29 }}
      >
        Payment History
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Plan</TableCell>
              <TableCell align="left">Payment Status</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentHistory?.map((payment: any, index) => (
              <TableRow key={index}>
                <TableCell data-th="Date">
                  {moment.unix(payment?.timestamp).format("DD MMM YYYY")}
                </TableCell>
                <TableCell data-th="Plan" align="left">
                  {PLAN_ID_TO_PLAN_DETAILS[payment?.plan]?.planType}{" "}
                  {PLAN_ID_TO_PLAN_DETAILS[payment?.plan]?.planDuration}
                </TableCell>
                <TableCell data-th="Payment Status" align="left">
                  {payment?.status == "succeeded" ? "Paid" : payment?.status}
                </TableCell>
                <TableCell data-th="Amount(CAD)" align="right">
                  ${payment?.amount} {payment?.currency?.toUpperCase()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Card className={classes.card}>
        <Box display="flex">
          <Box
            textAlign="left"
            paddingLeft={2}
            paddingRight={2}
            flexGrow={1}
            flexBasis="50%"
          >
            <Typography className={classes.cardTextTitle}>Date</Typography>
            <Typography className={classes.cardTextTitle}>Plan</Typography>
            <Typography className={classes.cardTextTitle}>
              Payment Status
            </Typography>
            <Typography
              className={classes.cardTextTitle}
              style={{ marginBottom: 0 }}
            >
              Amount(CAD)
            </Typography>
          </Box>
          <Box>
            <Divider orientation="vertical" />
          </Box>
          <Box paddingLeft={3} textAlign="left" flexGrow={1} flexBasis="50%">
            <Typography className={classes.cardTextValue}>
              3 May 2021
            </Typography>
            <Typography className={classes.cardTextValue}>
              Pro Monthly
            </Typography>
            <Typography className={classes.cardTextValue}>Paid</Typography>
            <Typography
              className={classes.cardTextValue}
              style={{ marginBottom: 0 }}
            >
              $14
            </Typography>
          </Box>
        </Box>
      </Card>
      {modal === "1" && (
        <AddMembersModal
          open={true}
          handleClose={setModal}
          subscriptionDetails={subscriptionDetails}
        />
      )}
      {modal === "2" && (
        <RemoveMembersModal
          open={true}
          handleClose={setModal}
          subscriptionDetails={subscriptionDetails}
        />
      )}
      {modal === "3" && (
        <UpdatePaymentMethodModal open={true} handleClose={setModal} />
      )}
      {modal === "5" && (
        <UpgradeModal
          open={true}
          handleClose={setModal}
          subscriptionDetails={subscriptionDetails}
        />
      )}
      {modal === "6" && (
        <DowngradeModal
          open={true}
          handleClose={setModal}
          setDowngraded={setDowngraded}
          // subscriptionDetails={subscriptionDetails}
        />
      )}
      <MsgModal
        open={msgModal}
        handleClose={handleMsgModalClose}
        title={msgTitle}
        description={msgDescription}
      />
      {/* </MobileView> */}
    </Box>
  );
}
