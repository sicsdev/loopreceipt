import { makeStyles } from "@material-ui/core";

import { CSSTransition } from "react-transition-group";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
interface ToggleSidebarProps {
  show: boolean;
  close: React.MouseEventHandler<any>;
  children: JSX.Element | string;
  delay?: number;
}
let localDelay = 0;
const ToggleSidebar = ({
  show,
  close,
  children,
  delay = 500,
}: ToggleSidebarProps) => {
  localDelay = delay;
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  return (
    <div className={styles.bar}>
      <CSSTransition
        in={show}
        timeout={delay}
        classNames={`mobsidebar`}
        unmountOnExit
      >
        <div
          className={styles.nav}
          style={{
            height: windowDimensions.innerHeight,
          }}
        >
          {children}
        </div>
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={delay}
        classNames={`mobsidebarbg`}
        unmountOnExit
      >
        <div className={styles.bg} onClick={close}></div>
      </CSSTransition>
    </div>
  );
};
export default ToggleSidebar;

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
    backgroundColor: "white",
    width: "80vw",
    overflow: "auto",
  },
  bg: {
    zIndex: 99,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.336)",
    width: "100vw",
    height: "100vh",
  },

  "@global": {
    ".mobsidebar-enter": {
      transform: "translateX(-100%)",
    },
    ".mobsidebar-enter-active": {
      transform: "translateX(0%)",
      transition: `all ${localDelay}ms ease`,
    },
    ".mobsidebar-exit-active": {
      transform: "translateX(-100%)",
      transition: `all ${localDelay}ms ease-in`,
    },
    ".mobsidebarbg-enter": {
      opacity: 0,
    },
    ".mobsidebarbg-enter-active": {
      opacity: 1,
      transition: `all ${localDelay}ms ease`,
    },
    ".mobsidebarbg-exit-active": {
      opacity: 0,
      transition: `all ${localDelay}ms ease-in`,
    },
  },
}));
