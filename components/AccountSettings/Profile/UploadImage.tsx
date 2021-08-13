import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginLeft: "2rem",
    backgroundColor: "#F1F3F6",
  },
  caption: {
    fontFamily: "Titillium Web",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: "21px",
    textAlign: "center",
    color: "#676767",
  },
  uploadButton: {
    border: "1px solid #21F9AE",
    background: "#fff",
    textTransform: "unset",
    color: "#000000",
    fontFamily: "Titillium Web",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: "23px",
    marginBottom: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default function UploadImage() {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Avatar alt="Avatar" src="/avatar.png" className={classes.avatar} />
      <Box style={{ paddingLeft: "2rem", paddingTop: "1rem" }}>
        <Button variant="outlined" className={classes.uploadButton}>
          Upload Picture
        </Button>
        <Typography className={classes.caption}>
          JPG, or PNG. Max Size of 5MB
        </Typography>
      </Box>
    </Box>
  );
}
