import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  box: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: 30,
      border: 0,
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "28px 17px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
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
    textAlign: "left",
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

const Feature = (props: any) => {
  const classes = useStyles();
  return (
    <Box display="flex" marginBottom={"8px"}>
      <CheckIcon color="primary" />
      <Typography className={classes.featureLabel}>{props.label}</Typography>
    </Box>
  );
};

export default function Enterprise() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Box flexGrow={1}>
        <Typography className={classes.heading}>Enterprise</Typography>
        <Typography className={classes.subheading}>
          For very large businessess or those in higher regulated businessess
        </Typography>
        <Typography className={classes.prize}>$49/user/mo</Typography>
        <Typography className={classes.subheading}>
          $35 per user, per month ($420 when billed yearly)
        </Typography>
        <Typography className={classes.features}>Top features:</Typography>

        <Feature label="Everything in Pro plus:" />
        <Feature label="Unlimited Users" />
        <Feature label="Advance access controls" />
        <Feature label="Custom Contact Directory Connections" />
        <Feature label="Tailored support with a designated account and customer success team." />
        <Feature label="24/7 priority support with four-hour first response time" />
      </Box>

      <Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={`${classes.buttons} ${classes.saveButton}`}
        >
          Upgrade Now
        </Button>

        <Box textAlign="center" marginTop="13px">
          <Link href="/" passHref>
            <a className={classes.link}>Learn More</a>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
