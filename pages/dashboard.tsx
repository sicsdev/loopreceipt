import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Links from "@components/Dashboard/Links";
import UpperBar from "@components/Create/UpperBar";
import Button from "@components/Controls/Button";
import Layout from "@components/Layout";
import OptionCard from "@components/Dashboard/OptionCard";
import Typography from "@material-ui/core/Typography";
import ListenClickAtParentElement from "@components/shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";

interface DashboardProps {
  path: string;
}
const Dashboard = ({ path }: DashboardProps) => {
  const styles = useStyles();

  return (
    <Layout>
      <div className={styles.dashboard}>
        <Sidebar path={path} />
        <div className={styles.right}>
          <Links links={["outgoing", "received", "drafts"]} />
          <UpperBar>
            <div className={styles.bar}>
              <div className="profile">
                <p className="icon">G</p>
                <p>Gari Boetang</p>
              </div>
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
                  <Button onClick={childClick}>+ New Loopreceipt</Button>
                )
              )}
            </div>
          </UpperBar>
          <div className={styles.rest}>
            <div
              style={{
                marginTop: "1rem",
                fontSize: "16px",
                lineHeight: "19px",
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  fontWeight: "bold",
                }}
              >
                You dont have any Loopreceipts yet.
              </Typography>
              <Typography variant="body2" gutterBottom>
                You’ll want to add recipients to create Loops with you.
              </Typography>
            </div>
            <div className="cards">
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
  },
  bar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    "& .cards": {
      display: "flex",
      justifyContent: "center",
      gap: 30,
      marginTop: "5rem",
    },
  },
}));
