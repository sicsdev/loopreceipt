// material
import { Container, Grid, Typography } from "@material-ui/core";
// components
import Layout from "@components/Global/Layout";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import PackageAnalytics from "@components/Analytics/PackagesAnalytics";
import LoopAnalytics from "@components/Analytics/LoopAnalytics";
import LoopTypeAnalytics from "@components/Analytics/LoopTypeAnalytics";
import RecipientCommentAnalytics from "@components/Analytics/RecipientCommentAnalytics";
import { makeStyles } from "@material-ui/core";
import AuthGuard from "@components/Global/AuthGuard";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 22,
    lineHeight: "28px",
    marginBottom: 18,
  },
  right: {
    backgroundColor: "#fbfbfb",
    marginLeft: 250,
    padding: "3rem 3rem",
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: "0",
    },
    "& .dropdowns": {
      padding: "1.5rem 4%",
    },
    "& .top": {
      display: "flex",
      justifyContent: "space-between",
      padding: "1.5rem 4%",
      "& .head": {
        fontSize: "1.3rem",
        fontWeight: "500",
      },
    },
  },
}));

interface AnalyticsProps {
  path: string;
}

export default function Analytics({ path }: AnalyticsProps) {
  const classes = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);

  return (
    <AuthGuard>
      <Layout>
        <div>
          {win.up("md") && <Sidebar path={path} />}
          <div className={classes.right}>
            <Container maxWidth="xl">
              <Typography className={classes.title}>Analytics</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <PackageAnalytics />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                  <LoopAnalytics />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <LoopTypeAnalytics />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                  <RecipientCommentAnalytics />
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </Layout>
    </AuthGuard>
  );
}
