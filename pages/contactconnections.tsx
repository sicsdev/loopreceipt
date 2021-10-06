import React, { useEffect, useState } from "react";
import UpperBar from "@components/Shared/UpperBar";
// material
import {
  Container,
  Card,
  Button,
  Typography,
  Box,
  Divider,
} from "@material-ui/core";
// components
import Layout from "@components/Global/Layout";
import { makeStyles } from "@material-ui/core";
import AuthGuard from "@components/Global/AuthGuard";
import { useAppSelector } from "@store/hooks";
import Cookies from "js-cookie";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  heading: {
    "& .head": {
      fontWeight: "500",
      fontFamily: "Roboto",
      fontStyle: "normal",
      lineHeight: "108.1%",
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        paddingTop: 23,
        marginLeft: 19,
        paddingBottom: 23,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 24,
        paddingTop: 73,
        marginLeft: 91,
        paddingBottom: 19,
      },
    },
  },
  divider: {
    [theme.breakpoints.down("sm")]: {
      height: 4,
    },
  },
  page: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 24,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 60,
    },
  },
  card: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: 30,
      border: 0,
      boxShadow: "unset",
    },
    [theme.breakpoints.up("sm")]: {
      // padding: "48px 43px",
      marginTop: 16,
      border: "1px solid #BDBDBD",
      filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
      borderRadius: 8,
    },
  },
  brand: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      height: 132,
      background: "#fbfbfb",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      padding: 33,
      alignItems: "center",
    },
  },
  brandIcon: {
    width: 44,
    height: 44,
  },
  brandLabel: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 26,
    lineHeight: "30px",
    color: "#333333",
    marginLeft: 30,
  },
  product: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 55,
    },
    [theme.breakpoints.up("sm")]: {
      height: 132,
      background: "#fff",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      padding: 33,
      alignItems: "center",
      display: "flex",
    },
  },
  productIcon: {
    width: 66,
    height: 66,
    background: "#FFFFFF",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    padding: 10,
    borderRadius: 50,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
    },
  },
  productLabel: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 26,
    lineHeight: "30px",
    color: "#333333",
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
      marginLeft: 0,
      marginTop: 19,
      marginBottom: 19,
    },
  },
  productNotConnectedButton: {
    background: "#21F9AE",
    borderRadius: 8,
    "& > span": {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 16,
      lineHeight: "19px",
    },
    marginRight: 5,
    marginLeft: "auto",
    width: 257,
    height: 47,
    textAlign: "center",
    alignItems: "center",
    display: "grid",
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      width: "unset",
      marginLeft: "unset",
      marginRight: "unset",
      marginTop: 10,
    },
    cursor: "pointer",
  },
  productConnectedButton: {
    background: "#FFFFFF",
    border: "1px solid #999999",
    borderRadius: 8,
    "& > span": {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 16,
      lineHeight: "19px",
    },
    marginRight: 5,
    marginLeft: "auto",
    width: 257,
    height: 47,
    textAlign: "center",
    alignItems: "center",
    display: "grid",
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      width: "unset",
      marginLeft: "unset",
      marginRight: "unset",
      marginTop: 10,
    },
  },
  productComingSoonButton: {
    background: "#FFFFFF",
    border: "1px solid #999999",
    borderRadius: 8,
    "& > span": {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 16,
      lineHeight: "19px",
    },
    marginRight: 5,
    marginLeft: "auto",
    width: 257,
    height: 47,
    textAlign: "center",
    alignItems: "center",
    display: "grid",
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      width: "unset",
      marginLeft: "unset",
      marginRight: "unset",
      marginTop: 10,
    },
  },
  pageHead: {
    height: 132,
    background: "#fff",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    padding: 33,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  pageHeadTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "28px",
    color: "#000000",
    marginBottom: 13,
  },
  pageHeadSubheading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "28px",
    color: "#666666",
  },
  productMobileLabel: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 22,
    lineHeight: "26px",
    color: "#828282",
    alignSelf: "center",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

interface ContactConnectionsProps {
  path: string;
}

interface BrandProps {
  icon: string;
  label: string;
}
function Brand({ icon, label }: BrandProps) {
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.brand}>
      <img src={icon} alt="Brand Icon" className={classes.brandIcon} />
      <Typography className={classes.brandLabel}>{label}</Typography>
    </Box>
  );
}

interface ProductProps {
  icon: string;
  label: string;
  status: string;
  type?: string;
}
function Product({ icon, label, status, type }: ProductProps) {
  const classes = useStyles();
  return (
    <Box className={classes.product}>
      <img src={icon} alt="Brand Icon" className={classes.productIcon} />
      <Typography className={classes.productLabel}>{label}</Typography>
      <Typography className={classes.productMobileLabel}>
        Access your {label} contacts
      </Typography>
      {status === "Connected" ? (
        <Box className={classes.productConnectedButton}>
          <span>Connected</span>
        </Box>
      ) : null}
      {status === "Connect" ? (
        <Button
          className={classes.productNotConnectedButton}
          onClick={() => {
            window.location.href =
              process.env.NEXT_PUBLIC_API_URL +
              `/api/users/contacts/${type}?token=` +
              Cookies.get("token");
          }}
        >
          <span>Connect</span>
        </Button>
      ) : null}
      {status === "Coming Soon" ? (
        <Box className={classes.productComingSoonButton}>
          <span>Coming Soon</span>
        </Box>
      ) : null}
    </Box>
  );
}

export default function ContactConnections({ path }: ContactConnectionsProps) {
  const classes = useStyles();
  let user = useAppSelector((state) => state.user.user);
  let contacts = user?.contacts;
  let google = contacts?.google || [];
  let microsoft = contacts?.microsoft || [];

  return (
    <AuthGuard>
      <Layout>
        <div className={classes.heading}>
          <div className="head">Contact Connections</div>

          <Divider className={classes.divider} />
        </div>

        <Container maxWidth="lg">
          <Card className={classes.card}>
            <Box className={classes.pageHead}>
              <Typography className={classes.pageHeadTitle}>
                Select your Contact Directory
              </Typography>
              <Typography className={classes.pageHeadSubheading}>
                Connect your Contact Directory to create Loopreceipts faster
                with contacts you have saved
              </Typography>
            </Box>
            <Brand icon="/icons/connect/google.png" label="Google" />
            <Product
              icon="/icons/connect/google.svg"
              label="Google Contacts"
              status={google.length > 0 ? "Connected" : "Connect"}
              type="google"
            />
            <Brand icon="/icons/connect/microsoft.png" label="Microsoft" />
            <Product
              icon="/icons/connect/office.png"
              label="Office 365"
              status={microsoft.length > 0 ? "Connected" : "Connect"}
              type="microsoft"
            />
            <Product
              icon="/icons/connect/office.png"
              label="Exchange"
              status="Coming Soon"
            />
            <Brand icon="/icons/connect/apple.png" label="Apple" />
            <Product
              icon="/icons/connect/icloud.png"
              label="iCloud"
              status="Coming Soon"
            />
          </Card>
        </Container>
        <div style={{ marginBottom: 100 }}></div>
      </Layout>
    </AuthGuard>
  );
}
