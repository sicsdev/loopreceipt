import {
  Box,
  Button,
  Dialog,
  Modal,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#333333",
    textAlign: "center",
    fontWeight: 500,
    marginTop: 19,
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      lineHeight: "23px",
      marginBottom: 19,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 24,
      lineHeight: "28px",
      marginBottom: 19,
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
  descriptionText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 18,
    lineHeight: "21px",
    textAlign: "center",
    color: "#828282",
    marginBottom: 40,
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},
  },
  //   icon: {
  //       color: ""
  //   }
}));

interface MsgProps {
  open: boolean;
  handleClose: any;
  title: string;
  description: string;
}
export default function MsgModal({
  open,
  handleClose,
  title,
  description,
}: MsgProps) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: 5, maxWidth: 465 }}>
        <Box textAlign="center">
          <CheckCircleIcon fontSize="large" color="primary" />
          <Typography className={classes.title}>{title}</Typography>

          <Typography className={classes.descriptionText}>
            {description}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            className={`${classes.buttons} ${classes.saveButton}`}
            color="primary"
            size="large"
            onClick={handleClose}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
