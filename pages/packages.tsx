import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Layout from "@components/Global/Layout";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import AuthGuard from "@components/Global/AuthGuard";
import { useFetch } from "@hooks/useFetch";
import loopsApi from "@apiClient/loopsApi";
import PackageGrid from "@components/packages/PackageGrid";

interface StdData {
  items: any[];
  total: number;
}

interface DashboardProps {
  path: string;
}

const Packages = ({ path }: DashboardProps) => {
  const styles = useStyles();
  const getter = useFetch<StdData>(loopsApi.getAll, { deferred: true });
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  return (
    <AuthGuard>
      <Layout>
        <div className={styles.dashboard}>
          {win.up("md") && <Sidebar path={path} />}
          <div className={styles.right}>
            <PackageGrid getter={getter} />
          </div>
        </div>
      </Layout>
    </AuthGuard>
  );
};
export default Packages;

const useStyles = makeStyles((theme) => ({
  dashboard: {},
  right: {
    backgroundColor: "#fbfbfb",
    height: 400, 
    width: '100%',
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: "0",
    }
  },
  dataGrid: {
    height: 400, 
    width: '100%',
    padding: "3rem 3rem",
  },
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
