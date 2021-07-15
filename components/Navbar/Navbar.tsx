import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
interface NavbarPropTypes {}
const Navbar = ({}: NavbarPropTypes) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  return (
    <div className={styles.Navbar}>
      {windowDimensions.innerWidth < 960 ? <MobileNavbar /> : <DesktopNavbar />}
    </div>
  );
};

export default Navbar;

const useStyles = makeStyles((theme) => ({
  Navbar: {
    zIndex: 100,
    position: "fixed",
    top: 0,
    width: "100%",
  },
}));
