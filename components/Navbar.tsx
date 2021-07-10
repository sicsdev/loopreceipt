import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface NavbarPropTypes {}
const Navbar = ({}: NavbarPropTypes) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className="logo">
        <Image src="/icons/logo.png" width="189" height="58" />
      </div>
      <div className="items">
        <div className="item">
          <Image src="/icons/search.svg" width="20" height="20" />
        </div>
        <div className="item">
          <Image src="/icons/bell.svg" width="20" height="20" />
        </div>
        <div className="item">
          <Image src="/icons/message.svg" width="20" height="20" />
        </div>
        <div className="item">
          <div className="image">
            {" "}
            <Image src="/icons/profile.png" width="36" height="36" />
          </div>
          <p className="text">Account</p>
          <Image src="/icons/arrow-down.svg" width="20" height="20" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const useStyles = makeStyles({
  root: {
    zIndex: 10,
    position: "fixed",
    top: 0,
    height: "70px",
    width: "100%",
    background: "white",
    filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
    display: "flex",
    "& .logo": {
      flexBasis: "250px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .items": {
      // border: "2px solid red",
      display: "flex",
      flex: 1,
      justifyContent: "flex-end",

      "& .item": {
        border: "1px solid #F5F6F9",

        background: "white",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        "& .image": {},
      },
    },
  },
});
