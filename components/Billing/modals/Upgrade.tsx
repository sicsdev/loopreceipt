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
import classNames from "classnames";

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

interface UpgradeProps {
  open: boolean;
  handleClose: any;
}
export default function UpgradeModal({ open, handleClose }: UpgradeProps) {
  const classes = useStyles();
  const handleInputChange = () => {};
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className={classes.dialogBox}>
        <Typography className={classes.title}>Upgrade to Pro</Typography>
        <Typography className={classes.titleCaption}>
          Prices are in CAD/USD
        </Typography>
        <Typography className={classes.descriptionText}>
          Your new monthly bill will be $15 starting 3 June 2021.
        </Typography>
        <Typography className={classes.descriptionText}>
          Your new monthly bill will be $15 will be applied today to your
          MasterCard ending in 5972.
        </Typography>
        <br />
        <Box textAlign="center">
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            className={classNames(classes.buttons, classes.changeCardButton)}
          >
            Change Card
          </Button>
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
            Upgrade
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
