import { makeStyles } from "@material-ui/core";
import Navbar from "@components/Navbar/Navbar";
import InternalExternalModal from "@components/Dashboard/InternalExternalModal/InternalExternalModal";
import Notifications from "@components/Notifications/Notifications";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import GettingStartedGuideMobile from "./GettingStartedGuideMobile";
import { setShowMobileSideBar } from "@store/slices/genericSlice";
import { MobileView } from "react-device-detect";
import { useSwipeable } from "react-swipeable";
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();

  const showGettingStartedGuide = useAppSelector(
    (state) => state.dashboard.showGettingStartedGuide
  );

  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.Layout}
      {...useSwipeable({
        onSwipedLeft: () => {
          dispatch(setShowMobileSideBar(false));
        },
      })}
    >
      <MobileView></MobileView>
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
