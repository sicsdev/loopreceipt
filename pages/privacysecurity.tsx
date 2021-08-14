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
import Workflows from "@components/PrivacySecurity/Workflows";
import { isMobile, BrowserView, MobileView } from "react-device-detect";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  tabs: {
    // borderRight: `1px solid #007780`,
    // textAlign: "left",
    // [theme.breakpoints.down("sm")]: {
    //   marginLeft: 0,
    //   padding: "0",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: "8rem",
    // },
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
    // [theme.breakpoints.down("sm")]: {

    // },
    // [theme.breakpoints.up("sm")]: {

    // },

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

interface AnalyticsProps {
  path: string;
}

export default function Analytics({ path }: AnalyticsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Workflows");

  const TABS = [
    {
      value: "Workflows",
      component: <Workflows />,
    },
  ];

  return (
    <Layout>
      {/* <div> */}
      <div className={classes.heading}>
        <div className="head">Privacy & Security</div>
        {/* <MobileView>
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
        </MobileView> */}
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
      {/* </div> */}
      <div style={{ marginBottom: 100 }}></div>
    </Layout>
  );
}
