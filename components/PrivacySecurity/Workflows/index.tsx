import {
  Container,
  Typography,
  Box,
  Button,
  makeStyles,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 24,
    lineHeight: "28px",
    color: "#666666",
    marginBottom: 40,
  },
  description: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: "30px",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 40,
  },
  question: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: "20px",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 25,
  },
  options: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18,
    lineHeight: "20px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  link: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 22,
    lineHeight: "26px",
    color: "#234361",
    textDecorationLine: "underline",
    marginTop: 45,
    marginBottom: 50,
  },
  buttonContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      //   padding: 30,
      paddingRight: 0,
      width: "80%",
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
      margin: "10px 30px",
    },
    minWidth: 143,
    minHeight: 47,
  },
  saveButton: {
    color: "#000000",
    "& span": {
      fontWeight: "bold !important",
    },
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {
      marginRight: 15,
    },
  },
}));

export default function Workflows() {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.pageTitle}>Workflows</Typography>

      <Typography className={classes.description}>
        Workflows automate tasks surrounding your loops. You can determine which
        members of your organization can create and manage workflows.
      </Typography>

      <Typography className={classes.question}>
        Who can create group loopreceipts?
      </Typography>

      <RadioGroup>
        <FormControlLabel
          className={classes.options}
          value="All members of my organisation"
          control={<Radio />}
          label="All members of my organisation"
        />
        <FormControlLabel
          value="Only admins and the owner"
          control={<Radio />}
          label="Only admins and the owner"
        />
      </RadioGroup>

      <Link href="https://www.loopreceipt.com/privacy-policy" passHref>
        <a target="_blank">
          <Typography className={classes.link}>
            Learn more about our privacy policies.
          </Typography>
        </a>
      </Link>

      <Box className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={`${classes.buttons} ${classes.saveButton}`}
          color="primary"
          size="large"
        >
          Save Changes
        </Button>
        <Button variant="outlined" size="large" className={classes.buttons}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
