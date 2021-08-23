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

const useStyles = makeStyles((theme) => ({
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
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {},
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

  const handleDowngrade = () => {
    setDowngraded(true);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: 5, maxWidth: 465 }}>
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
          minRows={4}
          maxRows={4}
        />
        <br /> <br />
        <Box className={classes.buttonContainer1}>
          <Button
            fullWidth
            variant="contained"
            className={`${classes.buttons} ${classes.saveButton}`}
            color="primary"
            size="large"
            disabled={!reason}
            onClick={handleDowngrade}
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
    </Dialog>
  );
}
