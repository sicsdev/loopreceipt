import { makeStyles } from "@material-ui/core";
import Navbar from "@components/Navbar/Navbar";
import InternalExternalModal from "@components/Dashboard/InternalExternalModal/InternalExternalModal";
import Notifications from "@components/Notifications/Notifications";
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();
  return (
    <div className={styles.Layout}>
      <Navbar />
      <Notifications />
      <InternalExternalModal />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default Layout;
const useStyles = makeStyles((theme) => ({
  Layout: {},
  content: {
    marginTop: 70,
  },
}));
