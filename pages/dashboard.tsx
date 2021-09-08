import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";

import Button from "@components/Controls/Button";
import Layout from "@components/Global/Layout";

import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useEffect, useState } from "react";

import Image from "next/image";
import { openGettingStartedGuide } from "@store/slices/dashboardSlice";

import { useRouter } from "next/router";

import Cookies from "js-cookie";

import Outgoing from "@components/Dashboard/Tabs/Outgoing";
import Received from "@components/Dashboard/Tabs/Received";
import Drafts from "@components/Dashboard/Tabs/Drafts";
import { useAppSelector } from "@store/hooks";
import AuthGuard from "@components/Global/AuthGuard";
interface DashboardProps {
  path: string;
}

const Dashboard = ({ path }: DashboardProps) => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>();

  const router = useRouter();
  // console.log(loops);

  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const activeTabIndex = useAppSelector(
    (state) => state.dashboard.activeTabIndex
  );

  useEffect(() => {
    setIsFirstTime(Cookies.get("isFirstTime") === "true");
  }, []);

  return (
    <AuthGuard>
      <Layout>
        <div className={styles.dashboard}>
          {win.up("md") && <Sidebar path={path} />}
          {activeTabIndex === 0 ? (
            <Outgoing />
          ) : activeTabIndex === 1 ? (
            <Received />
          ) : (
            <Drafts />
          )}
          {isFirstTime && (
            <div className={styles.iconGettingStarted}>
              {win.down("xs") ? (
                <div className="icon" onClick={openGettingStartedGuide}>
                  <Image
                    alt="icon"
                    src="/icons/dashboard/menu.svg"
                    width={30}
                    height={30}
                  />
                </div>
              ) : (
                <Button labelColor="white" onClick={openGettingStartedGuide}>
                  Getting Started
                </Button>
              )}
            </div>
          )}
        </div>
      </Layout>
    </AuthGuard>
  );
};
export default Dashboard;

const useStyles = makeStyles((theme) => ({
  dashboard: {},

  iconGettingStarted: {
    position: "fixed",
    bottom: 40,
    right: 50,
    [theme.breakpoints.down("xs")]: {
      right: 20,
    },
    userSelect: "none",
    cursor: "pointer",
    "& .icon": {
      width: 61,
      height: 61,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      backgroundColor: "#363F4D",
    },
    "& .MuiButtonBase-root": {
      backgroundColor: "#363F4D",
    },
  },
}));
