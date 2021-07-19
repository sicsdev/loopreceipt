import { makeStyles, useTheme } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Links from "@components/Dashboard/Links";
import UpperBar from "@components/shared/UpperBar";
import Button from "@components/Controls/Button";
import Layout from "@components/Layout";
import OptionCard from "@components/Dashboard/OptionCard";
import Typography from "@material-ui/core/Typography";
import ListenClickAtParentElement from "@components/shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";
import { useWindowDimensions } from "@hooks/useWindowDimensions";

interface DashboardProps {
  path: string;
}
const Dashboard = ({ path }: DashboardProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const theme = useTheme();
  return (
    <Layout>
      <div className={styles.dashboard}>
        {windowDimensions.innerWidth >= theme.breakpoints.values.md && (
          <Sidebar path={path} />
        )}
        <div className={styles.right}>
          {windowDimensions.innerWidth < theme.breakpoints.values.md && (
            <div className="top">
              <p className="head">My Loops</p>

              {ListenClickAtParentElement(
                (e) => {
                  openModal(e, {
                    translationsFrom: "element",
                    positionWRTPoint: {
                      bottom: true,
                    },
                    translations: {
                      y: 20,
                    },
                  });
                },
                (childClick) => (
                  <Button labelWeight="bold" shrink onClick={childClick}>
                    + New
                  </Button>
                )
              )}
            </div>
          )}
          <Links links={["outgoing", "received", "drafts"]} />
          <UpperBar>
            <div className={styles.bar}>
              <div className="profile">
                <p className="icon">G</p>
                <p>Gari Boetang</p>
              </div>
              {windowDimensions.innerWidth >= theme.breakpoints.values.md &&
                ListenClickAtParentElement(
                  (e) => {
                    openModal(e, {
                      translationsFrom: "element",
                      positionWRTPoint: {
                        bottom: true,
                        left: true,
                      },
                      translations: {
                        y: 20,
                        x: (e.target as any).offsetWidth,
                      },
                    });
                  },
                  (childClick) => (
                    <Button onClick={childClick}>+ New Loopreceipt</Button>
                  )
                )}
            </div>
          </UpperBar>
          <div className={styles.rest}>
            <Typography
              variant="body1"
              gutterBottom
              style={{
                fontWeight: "bold",
                color: "#4F5257",
              }}
            >
              You dont have any Loopreceipts yet.
            </Typography>
            <Typography
              variant="body2"
              style={{
                color: "#4F5257",
              }}
            >
              You’ll want to add recipients to create Loops with you.
            </Typography>
            <div className="optionCards">
              {ListenClickAtParentElement(
                (e) => {
                  openModal(e, {
                    translationsFrom: "element",
                    positionWRTPoint: {
                      right: true,
                    },
                  });
                },
                (childClick) => (
                  <OptionCard
                    iconSrc="/icons/create/delivery-notification.svg"
                    text="Create a delivery notification"
                    onClick={childClick}
                  />
                )
              )}

              <OptionCard
                iconSrc="/icons/create/add-user.svg"
                text="Invite your team"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
const useStyles = makeStyles((theme) => ({
  dashboard: {},
  right: {
    marginLeft: 250,
    padding: "3rem 4rem",
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: "0",
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
  bar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 4%",
    paddingTop: "1.5rem",
    "& .profile": {
      display: "flex",
      alignItems: "center",
      gap: 16,
      "& .icon": {
        width: 47,
        height: 47,
        backgroundColor: "#C5C5C5",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: "1.2rem",
      },
    },
  },
  rest: {
    padding: "1.5rem 4%",
    "& .optionCards": {
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      gap: 30,
      marginTop: "5rem",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        marginTop: "2rem",
      },
    },
  },
}));
