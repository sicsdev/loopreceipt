import { makeStyles } from "@material-ui/core";
import Navbar from "@components/Navbar/Navbar";
import InternalExternalModal from "@components/Dashboard/InternalExternalModal/InternalExternalModal";
import Notifications from "@components/Notifications/Notifications";
import { useAppSelector } from "@store/hooks";
import GettingStartedGuideMobile from "./GettingStartedGuideMobile";
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();
  const showGettingStartedGuide = useAppSelector(
    (state) => state.generic.showGettingStartedGuide
  );
  return (
    <div className={styles.Layout}>
      <Navbar />
      <Notifications />
      <InternalExternalModal />
      {showGettingStartedGuide && <GettingStartedGuideMobile />}
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
