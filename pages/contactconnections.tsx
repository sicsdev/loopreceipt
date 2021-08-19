import React, { useEffect, useState } from "react";
import UpperBar from "@components/Shared/UpperBar";
// material
import {
  Container,
  Card,
  Grid,
  Typography,
  Tab,
  Tabs,
  Box,
  Divider,
} from "@material-ui/core";
// components
import Layout from "@components/Global/Layout";
import { makeStyles } from "@material-ui/core";

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
      padding: "48px 43px",
      marginTop: 16,
      border: "1px solid #BDBDBD",
      filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
      borderRadius: 8,
    },
  },
}));

interface ContactConnectionsProps {
  path: string;
}

export default function ContactConnections({ path }: ContactConnectionsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Profile");

  return (
    <Layout>
      <div className={classes.heading}>
        <div className="head">Contact Connections</div>

        <Divider className={classes.divider} />
      </div>

      <Container maxWidth="lg">
        <Card className={classes.card}>
          <Typography>Test</Typography>
        </Card>
      </Container>
      <div style={{ marginBottom: 100 }}></div>
    </Layout>
  );
}
