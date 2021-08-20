import React, { useEffect, useState } from "react";
import UpperBar from "@components/Shared/UpperBar";
// material
import {
  Container,
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
import Login from "@components/AccountSettings/Login";
import Profile from "@components/AccountSettings/Profile";
import { isMobile, BrowserView, MobileView } from "react-device-detect";
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
      color: "#666666",
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
  page: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 24,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 60,
    },
  },
}));

interface AccountProps {
  path: string;
}

export default function Account({ path }: AccountProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Profile");

  const TABS = [
    {
      value: "Profile",
      component: <Profile />,
    },
    {
      value: "Login",
      component: <Login />,
    },
  ];

  return (
    <AuthGuard>
      <Layout>
        <div className={classes.heading}>
          <div className="head">Account Settings</div>
          <MobileView>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={(e, value) => setValue(value)}
              className={classes.tabs}
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
          </MobileView>
          <Divider />
        </div>

        <Grid container className={classes.page}>
          <Grid item xs={12} sm={4} md={2}>
            <BrowserView>
              <Tabs
                orientation={"vertical"}
                variant="scrollable"
                value={value}
                onChange={(e, value) => setValue(value)}
                className={classes.tabs}
                TabIndicatorProps={{ color: "#fff" }}
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
            </BrowserView>
          </Grid>
          <Grid item xs={12} sm={8} md={10}>
            {TABS.map((tab) => {
              const isMatched = tab.value === value;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Grid>
        </Grid>

        <div style={{ marginBottom: 100 }}></div>
      </Layout>
    </AuthGuard>
  );
}
