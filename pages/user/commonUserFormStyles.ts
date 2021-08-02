import { makeStyles } from "@material-ui/core";
const commonUserFormStyles = makeStyles((theme) => ({
  UserForm: {
    // border: "1px solid red",
    padding: "4rem 1rem",
    "& .heading": {
      fontWeight: 500,
      fontSize: 36,
      color: theme.palette.secondary.main,
      textAlign: "center",
      marginBottom: "2rem",
    },
    "& .subheading": {
      textAlign: "center",
      fontSize: 18,
    },
    "& .form": {
      marginTop: "4rem",
      maxWidth: 600,
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      "& .MyInputContainer": {
        width: "100%",
      },
      "& .row": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .rememberMe": {
          display: "flex",
          alignItems: "center",
          gap: 5,
        },
      },
      "& .bottomText": {
        textAlign: "center",
        color: "#8F8F8F",
      },
    },
  },
}));
export default commonUserFormStyles;
