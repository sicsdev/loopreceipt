import { makeStyles } from "@material-ui/core";
import Link from "next/link";
interface LinedNavbarProps {}
const LinedNavbar = ({}: LinedNavbarProps) => {
  const styles = useStyles();
  return (
    <div className={styles.LinedNavbar}>
      <div className="line"></div>
      <div className="logo">
        <Link href="/dashboard">
          <a>
            <img alt="icon" src="/icons/logo.png" width={189} />
          </a>
        </Link>
      </div>
    </div>
  );
};
export default LinedNavbar;
const useStyles = makeStyles((theme) => ({
  LinedNavbar: {
    background: "#fff",
    "& .line": {
      height: 6,
      backgroundColor: "#21F9AE",
    },
    "& .logo": {
      paddingTop: 14,
      //   border: "1px solid red",
      textAlign: "center",
    },
  },
}));
