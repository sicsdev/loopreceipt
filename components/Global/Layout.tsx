import { makeStyles } from "@material-ui/core";
import Navbar from "@components/Navbar/Navbar";
import InternalExternalModal from "@components/Dashboard/InternalExternalModal/InternalExternalModal";
import Notifications from "@components/Notifications/Notifications";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import GettingStartedGuideMobile from "./GettingStartedGuideMobile";
import { setShowAlert, setShowMobileSideBar } from "@store/slices/genericSlice";
import { useSwipeable } from "react-swipeable";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import { useState } from "react";
import PrimaryLink from "@components/Shared/PrimaryLink";
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();

  const showGettingStartedGuide = useAppSelector(
    (state) => state.dashboard.showGettingStartedGuide
  );

  const dispatch = useAppDispatch();
  const { showAlert, alertMessage, alertSeverity, alertLink } = useAppSelector(
    (state) => state.generic
  );

  return (
    <div
      className={styles.Layout}
      {...useSwipeable({
        onSwipedLeft: () => {
          dispatch(setShowMobileSideBar(false));
        },
      })}
    >
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(e, reason) => {
          // reason 'timeout' | 'clickaway';
          dispatch(setShowAlert(false));
        }}
        TransitionComponent={Fade}
        // TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={() => {
            dispatch(setShowAlert(false));
          }}
          severity={alertSeverity}
        >
          {alertMessage}&nbsp;
          {alertLink && (
            <PrimaryLink href={alertLink.href} type={alertLink.type}>
              {alertLink.text}
            </PrimaryLink>
          )}
        </Alert>
      </Snackbar>
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
    // marginTop: 150,
    // // [theme.breakpoints.down("sm")]: {
    // //   marginTop: 0,
    // // },
    // [theme.breakpoints.down("sm")]: {
    //   marginTop: 70,
    // },
  },
}));
