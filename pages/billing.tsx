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
import Choice from "@components/Billing/Choice";
import Pro from "@components/Billing/Pro";
import Enterprise from "@components/Billing/Enterprise";
import { MobileView, BrowserView } from "react-device-detect";
import AuthGuard from "@components/Global/AuthGuard";
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  tabs: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 6,
    },
  },
  tab: {
    textAlign: "left",
    "& > span": {
      display: "unset",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: "28px",
      color: "#666666",
      textTransform: "none",
      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 24,
        marginLeft: 80,
      },
    },
  },
  selected: {
    "& > span": {
      color: "#234361",
      fontWeight: 700,
    },
  },
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
  pageHeading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "30px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      marginBottom: 17,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 26,
      marginBottom: 15,
    },
  },
  grid: {
    background: "#FFFFFF",
    border: "2px solid #E0E0E0",
    borderTop: "4px solid #234361",
    boxSizing: "border-box",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.75)",
    // borderRadius: 8,
  },
}));

interface BillingProps {
  path: string;
}

export default function Billing({ path }: BillingProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Choice");

  const TABS = [
    {
      value: "Choice",
      component: <Choice />,
    },
    {
      value: "Pro",
      component: <Pro />,
    },
    {
      value: "Enterprise",
      component: <Enterprise />,
    },
  ];

  return (
    <AuthGuard>
      <Layout>
        <div className={classes.heading}>
          <div className="head">Billing</div>

          <Divider className={classes.divider} />
        </div>

        <Container maxWidth="lg">
          <Card className={classes.card}>
            <Typography className={classes.pageHeading}>
              You are enjoying a free pro trial with access to all the features
            </Typography>
            <Typography
              className={classes.pageHeading}
              style={{ color: "#666666" }}
            >
              Our Pricing Plans
            </Typography>

            <MobileView>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={(e, value) => setValue(value)}
                className={classes.tabs}
                TabIndicatorProps={{
                  style: {
                    height: "2px",
                    color: "#234361",
                  },
                }}
              >
                {TABS.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    label={tab.value}
                    value={tab.value}
                    className={classes.tab}
                    classes={{ selected: classes.selected }}
                  />
                ))}
              </Tabs>
              <Divider />

              <Box>
                {TABS.map((tab) => {
                  const isMatched = tab.value === value;
                  return (
                    isMatched && <Box key={tab.value}>{tab.component}</Box>
                  );
                })}
              </Box>
            </MobileView>

            <BrowserView>
              <Grid container className={classes.grid}>
                <Grid item xs={12} md={4}>
                  <Choice />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Pro />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Enterprise />
                </Grid>
              </Grid>
            </BrowserView>
          </Card>
        </Container>
        <div style={{ marginBottom: 100 }}></div>
      </Layout>
    </AuthGuard>
  );
}
