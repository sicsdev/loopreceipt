import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
interface NavbarPropTypes {}
const Navbar = ({}: NavbarPropTypes) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  return (
    <div className={styles.Navbar}>
      {win.down("sm") ? <MobileNavbar /> : <DesktopNavbar />}
    </div>
  );
};

export default Navbar;

const useStyles = makeStyles((theme) => ({
  Navbar: {
    zIndex: 10,
    position: "fixed",
    top: 0,
    width: "100%",
  },
}));
