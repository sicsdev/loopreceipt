import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: 150,
    marginBottom: 150,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 30,
      border: 0,
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "28px 17px",
      borderRight: "1px solid #C9C8C8",
    },
  },
  heading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: "29px",
    color: "#000000",
    marginBottom: 15,
  },
  subheading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "19px",
    color: "#828282",
    marginBottom: 19,
  },
  prize: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 28,
    lineHeight: "33px",
    color: "#000000",
    marginBottom: 15,
  },
  features: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 22,
    lineHeight: "26px",
    color: "#000000",
    marginBottom: 20,
  },
  featureLabel: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: "32px",
    color: "#000000",
    marginLeft: 11,
  },
  buttons: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    "& span": {
      fontWeight: 500,
    },
    fontSize: 20,
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
      textTransform: "none",
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: 10,
    },
  },
  link: {
    color: "#234361",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 18,
    lineHeight: "21px",
    textAlign: "center",
    marginTop: 13,
  },
}));

interface FreePlanProps {
  upgrade: boolean;
  onUpgrade: (value: any) => void;
}

export default function FreePlan({ upgrade, onUpgrade }: FreePlanProps) {
  const classes = useStyles();
  const onUpgradeNow = () => {
    onUpgrade(!upgrade);
  };
  return (
    <Box className={classes.box} textAlign="center">
      <Typography className={classes.heading}>
        You are enjoying the FREE PLAN.
      </Typography>
      <Typography className={classes.subheading}>
        Your trial will expire on June 3, 20121.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className={`${classes.buttons} ${classes.saveButton}`}
        onClick={onUpgradeNow}
      >
        Upgrade Now
      </Button>

      <Box textAlign="center" marginTop="13px">
        <Link href="/" passHref>
          <a className={classes.link}>Learn More</a>
        </Link>
      </Box>
    </Box>
  );
}
