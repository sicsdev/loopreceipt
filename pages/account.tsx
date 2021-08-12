import React from "react";
import UpperBar from "@components/Shared/UpperBar";
// material
import { Container, Grid, Typography, Tab, Tabs, Box } from "@material-ui/core";
// components
import Layout from "@components/Global/Layout";
import { makeStyles, createStyles } from "@material-ui/styles";
import Login from "@components/AccountSettings/Login";
import Profile from "@components/AccountSettings/Profile";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) =>
  createStyles({
    tabs: {
      // borderRight: `1px solid #007780`,
      textAlign: "left",
    },
    tab: {
      textAlign: "left",
      "& > span": {
        display: "unset",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 24,
        lineHeight: "28px",
        color: "#666666",
      },
    },
    heading: {
      marginBottom: 70,
      "& .head": {
        fontWeight: "500",
        fontSize: 24,
      },
    },
  })
);

interface AnalyticsProps {
  path: string;
}

export default function Analytics({ path }: AnalyticsProps) {
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
    <Layout>
      <div className={classes.heading}>
        <UpperBar>
          <Container maxWidth="xl">
            <div className="head">Account Settings</div>
          </Container>
        </UpperBar>
      </div>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={2}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
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
          </Grid>
          <Grid item xs={12} sm={8} md={10}>
            {TABS.map((tab) => {
              const isMatched = tab.value === value;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
