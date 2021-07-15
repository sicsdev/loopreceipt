import { makeStyles } from "@material-ui/core";
import { useDelayed } from "@hooks/useDelayed";

import { CSSTransition } from "react-transition-group";
interface ToggleSidebarProps {
  show: boolean;
  close: React.MouseEventHandler<any>;
  children: JSX.Element | string;
}
const ToggleSidebar = ({ show, close, children }: ToggleSidebarProps) => {
  const showDelayedCopy = useDelayed(show, 500);
  const styles = useStyles();
  return (
    <div
      className={styles.bar}
      style={{
        display: show || showDelayedCopy ? "block" : "none",
      }}
    >
      <CSSTransition
        in={show}
        timeout={500}
        classNames={`mobsidebar`}
        unmountOnExit
      >
        <div className={styles.nav}>{children}</div>
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={500}
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
    zIndex: 20,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  nav: {
    zIndex: 20,
    position: "absolute",
    backgroundColor: "white",
    height: "100vh",
    width: "80vw",
  },
  bg: {
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
      transition: `all 500ms ease`,
    },
    ".mobsidebar-exit-active": {
      transform: "translateX(-100%)",
      transition: `all 500ms ease-in`,
    },
    ".mobsidebarbg-enter": {
      opacity: 0,
    },
    ".mobsidebarbg-enter-active": {
      opacity: 1,
      transition: `all 500ms ease`,
    },
    ".mobsidebarbg-exit-active": {
      opacity: 0,
      transition: `all 500ms ease-in`,
    },
  },
}));
