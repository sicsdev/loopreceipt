import React, { useState } from "react";
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
    marginBottom: 15,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      lineHeight: "27px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 25,
      lineHeight: "29px",
    },
  },
  subheading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,

    color: "#828282",
    marginBottom: 19,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
      lineHeight: "27px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
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
    "& span": { fontWeight: 500 },
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
}));

interface SubscribedProps {
  upgrade: boolean;
  onUpgrade: (value: any) => void;
}

export default function Subscribed({ upgrade, onUpgrade }: SubscribedProps) {
  const classes = useStyles();
  const [downgraded, setDowngraded] = useState(false);
  const onUpgradeNow = () => {
    onUpgrade(!upgrade);
  };
  const [modal, setModal] = useState("");
  const handleChangePlan = (e) => {
    // console.log(e.target.value);
    setModal(e.target.value);
  };

  const [msgTitle, setMsgTitle] = useState("Success");
  const [msgDescription, setMsgDescription] = useState(
    "You will no longer be billed."
  );
  const [msgModal, setMsgModal] = useState(true);
  const handleMsgModalOpen = () => setMsgModal(true);
  const handleMsgModalClose = () => setMsgModal(false);

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
            You’re subscribed to the PRO Monthly plan for 1 member
          </Typography>
          <Typography className={classes.subheading}>
            Your subscription will renew on 3 June 2021 using your MasterCard
            ending in 5972.
          </Typography>
          <Button className={classes.nextPaymentButton} variant="outlined">
            Next payment: Scheduled for 3 July 2020
          </Button>
        </>
      )}
      <br /> <br /> <br />
      <Divider />
      <br /> <br />
      <Typography variant="h5" style={{ marginBottom: 20 }}>
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
          onClick={onUpgradeNow}
        >
          Switch to annual (save $24 per year)
        </Button>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h5" style={{ marginBottom: 20 }}>
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
              <TableCell align="right">Amount(CAD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell data-th="Date">3 May 2021</TableCell>
              <TableCell data-th="Plan" align="left">
                Pro Monthly
              </TableCell>
              <TableCell data-th="Payment Status" align="left">
                Paid
              </TableCell>
              <TableCell data-th="Amount(CAD)" align="right">
                $14
              </TableCell>
            </TableRow>
            {/* {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
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
      {modal === "1" && <AddMembersModal open={true} handleClose={setModal} />}
      {modal === "2" && (
        <RemoveMembersModal open={true} handleClose={setModal} />
      )}
      {modal === "3" && (
        <UpdatePaymentMethodModal open={true} handleClose={setModal} />
      )}
      {modal === "5" && <UpgradeModal open={true} handleClose={setModal} />}
      {modal === "6" && (
        <DowngradeModal
          open={true}
          handleClose={setModal}
          setDowngraded={setDowngraded}
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
