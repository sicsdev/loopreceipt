import { makeStyles } from "@material-ui/core";
import { useDelayed } from "@hooks/useDelayed";

import { CSSTransition } from "react-transition-group";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useSwipeable } from "react-swipeable";

interface ToggleBottombarProps {
  show: boolean;
  close: Function;
  children: JSX.Element | string;
  delay?: number;
}
let localDelay = 0;
const ToggleBottombar = ({
  show,
  close,
  children,
  delay = 500,
}: ToggleBottombarProps) => {
  localDelay = delay;
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  return (
    <div
      className={styles.bar}
      style={{
        height: windowDimensions.innerHeight,
      }}
      {...useSwipeable({
        onSwipedDown: (e) => {
          // console.log("swiped down");
          close();
        },
      })}
    >
      <CSSTransition
        in={show}
        timeout={delay}
        unmountOnExit
        classNames={`mobbottombar`}
      >
        <div className={styles.nav}>{children}</div>
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={delay}
        unmountOnExit
        classNames={`mobbottombarbg`}
      >
        <div className={styles.bg} onClick={() => close()}></div>
      </CSSTransition>
    </div>
  );
};
export default ToggleBottombar;

const useStyles = makeStyles((theme) => ({
  bar: {
    zIndex: 100,
    position: "fixed",
    top: 0,
    left: 0,
  },
  nav: {
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    width: "100vw",
    backgroundColor: "white",
  },
  bg: {
    zIndex: 99,
    bottom: 0,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.336)",
    width: "100vw",
    height: "100vh",
  },

  "@global": {
    ".mobbottombar-enter": {
      transform: "translateY(100%)",
    },
    ".mobbottombar-enter-active": {
      transform: "translateY(0%)",
      transition: `all ${localDelay}ms ease`,
    },
    ".mobbottombar-exit-active": {
      transform: "translateY(100%)",
      transition: `all ${localDelay}ms ease-in`,
    },
    ".mobbottombarbg-enter": {
      opacity: 0,
    },
    ".mobbottombarbg-enter-active": {
      opacity: 1,
      transition: `all ${localDelay}ms ease`,
    },
    ".mobbottombarbg-exit-active": {
      opacity: 0,
      transition: `all ${localDelay}ms ease-in`,
    },
  },
}));
