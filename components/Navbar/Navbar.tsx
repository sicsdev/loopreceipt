import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useRouter } from "next/router";
import LinedNavbar from "./LinedNavbar";
interface NavbarPropTypes {}
const Navbar = ({}: NavbarPropTypes) => {
  const router = useRouter();
  const path = router.asPath;
  const showOnlyLogo = path.includes("/user/");

  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);

  return (
    <div className={styles.Navbar}>
      {path === "/selectindustry" || path === "/oauthcontacts" ? (
        <LinedNavbar />
      ) : win.up("md") || showOnlyLogo ? (
        <DesktopNavbar showOnlyLogo={showOnlyLogo} />
      ) : (
        <MobileNavbar />
      )}
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
