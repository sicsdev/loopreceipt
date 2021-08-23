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
      fontSize: 20,
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
  text1: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#828282",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      lineHeight: "18px",
      marginBottom: 25,
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
      lineHeight: "16px",
      marginBottom: 19,
    },
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
}));

interface AddMembersProps {
  open: boolean;
  handleClose: any;
}
export default function AddMembersModal({
  open,
  handleClose,
}: AddMembersProps) {
  const classes = useStyles();
  const handleInputChange = () => {};
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className={classes.dialogBox}>
        <Typography className={classes.title}>Add Members</Typography>
        <Typography className={classes.titleCaption}>
          Prices are in CAD/USD
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Typography className={classes.inputTexts}>Add</Typography>
          <TextField
            type="number"
            size="small"
            placeholder="0"
            variant="outlined"
            className={classes.input}
          />
          <Typography className={classes.inputTexts}>Member(s)</Typography>
        </Box>

        <br />
        <Typography className={classes.text1}>
          Your new member count will be 1 and your monthly charge will be
          increased to $28
        </Typography>
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
            Add
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
