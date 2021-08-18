import {
  makeStyles,
  Container,
  Card,
  Box,
  Typography,
} from "@material-ui/core";
import Layout from "@components/Global/Layout";
import UpperBar from "@components/Shared/UpperBar";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  apps: {
    "& .head": {
      fontWeight: "bold",
      //   textAlign: "center",
      fontSize: 18,
    },
  },
  cards: {
    [theme.breakpoints.down("sm")]: {
      padding: "67px 15px",
      marginTop: 35,
    },
    [theme.breakpoints.up("sm")]: {
      padding: "96px 64px",
      marginTop: 50,
    },
  },
  appleIcon: {
    [theme.breakpoints.down("sm")]: {
      width: 64,
      height: 76,
    },
    [theme.breakpoints.up("sm")]: {
      width: 118,
      height: 140,
    },
  },
  storeIcon: {
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: 122,
      height: 42,
      marginTop: 29,
    },
    [theme.breakpoints.up("sm")]: {
      width: 200,
      height: 70,
    },
  },
  androidIcon: {
    [theme.breakpoints.down("sm")]: {
      width: 64,
      height: 76,
    },
    [theme.breakpoints.up("sm")]: {
      width: 150,
      height: 161,
    },
  },
  captionTexts: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#747474",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      lineHeight: "16px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 25,
      lineHeight: "29px",
    },
  },
  titleTexts: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      lineHeight: "23px",
      marginTop: 19,
      marginBottom: 19,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 40,
      lineHeight: "47px",
    },
  },
  container1: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginLeft: 22,
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginLeft: 89,
    },
  },
}));

const Apps = () => {
  const styles = useStyles();

  return (
    <Layout>
      <div className={styles.apps}>
        <UpperBar>
          <Container>
            <div className="head">Apps</div>
          </Container>
        </UpperBar>
      </div>
      <Container>
        <Card className={styles.cards}>
          <Box display="flex">
            <Box>
              <img
                src="/images/apple.png"
                alt="Apple Icon"
                className={styles.appleIcon}
              />
            </Box>
            <Box className={styles.container1}>
              <Box style={{ display: "grid" }}>
                <Typography className={styles.captionTexts}>
                  Mobile App
                </Typography>
                <Typography className={styles.titleTexts}>
                  Loopreceipt iPhone App
                </Typography>
                <Typography className={styles.captionTexts}>
                  Send packages on the go
                </Typography>
              </Box>
              <Box
                display="flex"
                style={{ marginRight: 0, marginLeft: "auto" }}
              >
                <Link href="/" passHref>
                  <a style={{ alignSelf: "center" }}>
                    <img
                      src="/images/apple-store.png"
                      alt="Apple Store Icon"
                      className={styles.storeIcon}
                    />
                  </a>
                </Link>
              </Box>
            </Box>
          </Box>
        </Card>

        <Card className={styles.cards}>
          <Box display="flex">
            <Box>
              <img
                src="/images/android.png"
                alt="Apple Icon"
                className={styles.androidIcon}
              />
            </Box>
            <Box className={styles.container1}>
              <Box style={{ display: "grid" }}>
                <Typography className={styles.captionTexts}>
                  Mobile App
                </Typography>
                <Typography className={styles.titleTexts}>
                  Loopreceipt Android App
                </Typography>
                <Typography className={styles.captionTexts}>
                  Send packages on the go
                </Typography>
              </Box>
              <Box
                display="flex"
                style={{ marginRight: 0, marginLeft: "auto" }}
              >
                <Link href="/" passHref>
                  <a style={{ alignSelf: "center" }}>
                    <img
                      src="/images/android-store.png"
                      alt="Android Store Icon"
                      className={styles.storeIcon}
                    />
                  </a>
                </Link>
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>
      <div style={{ marginBottom: 100 }}></div>
    </Layout>
  );
};

export default Apps;
