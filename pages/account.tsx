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

      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 24,
      },
    },
  },
  heading: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 24,
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: 70,
    },

    "& .head": {
      fontWeight: "500",

      fontFamily: "Roboto",
      fontStyle: "normal",

      lineHeight: "108.1%",
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        marginTop: 23,
        marginLeft: 19,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 24,
        marginTop: 73,
        marginLeft: 91,
      },
    },
  },
}));

interface AnalyticsProps {
  path: string;
}

export default function Analytics({ path }: AnalyticsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Profile");
  const [mobileDevice, setMobileDevice] = useState(false);
  useEffect(() => {
    setMobileDevice(isMobile);
  }, [isMobile]);

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
              />
            ))}
          </Tabs>
          <Divider />
        </MobileView>
      </div>

      <Grid container spacing={3}>
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
    </Layout>
  );
}
