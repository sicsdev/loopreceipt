import { makeStyles } from "@material-ui/core";
import Navbar from "@components/Navbar/Navbar";
import InternalExternalModal from "@components/Dashboard/InternalExternalModal/InternalExternalModal";
import Notifications from "@components/Notifications/Notifications";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import GettingStartedGuideMobile from "./GettingStartedGuideMobile";
import { setShowMobileSideBar } from "@store/slices/genericSlice";
import { useEffect, useState } from "react";
import { MobileView } from "react-device-detect";
import { useSwipeable } from "react-swipeable";
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();
  const [
    touchStartedAtSwipeListenerForMobileSidebar,
    setTouchStartedAtSwipeListenerForMobileSidebar,
  ] = useState(false);
  const showGettingStartedGuide = useAppSelector(
    (state) => state.generic.showGettingStartedGuide
  );

  useEffect(() => {
    window.addEventListener("touchstart", (ev) => {
      // console.dir((ev.target as any).className);
      const classNameOfElementOnWhichTouchBegan = (ev.target as any).className;
      if (
        classNameOfElementOnWhichTouchBegan === "swipeListenerForMobileSidebar"
      ) {
        // console.log("now show side bar");
        setTouchStartedAtSwipeListenerForMobileSidebar(true);
      } else {
        setTouchStartedAtSwipeListenerForMobileSidebar(false);
      }
    });
  }, []);
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.Layout}
      {...useSwipeable({
        onSwipedLeft: () => {
          dispatch(setShowMobileSideBar(false));
        },
        onSwipedRight: (e) => {
          // console.log(e);
          if (touchStartedAtSwipeListenerForMobileSidebar) {
            dispatch(setShowMobileSideBar(true));
          }
        },
      })}
    >
      <MobileView>
        <div className="swipeListenerForMobileSidebar"></div>
        {/* on the mobileview this will come on the top of
          20vw of every page, make sure if you want to listen clicks on them 
          to provide zIndex more than swipeListenerForMobileSidebar */}
      </MobileView>
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
  Layout: {
    "& .swipeListenerForMobileSidebar": {
      position: "fixed",
      height: "100vh",
      width: "20vw",
      top: 0,
      left: 0,
      // backgroundColor: "rgba(0,0,0,.5)",
      zIndex: 8,
      // less than navbar
      // so that we can listen click on it
    },
  },
  content: {
    marginTop: 70,
  },
}));
