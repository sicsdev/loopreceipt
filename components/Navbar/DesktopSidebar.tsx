import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
interface DesktopSideBarProps {
  path: string;
}
const DesktopSideBar = ({ path }: DesktopSideBarProps) => {
  const styles = useStyles();
  return (
    <div className={styles.sideBar}>
      <SidebarItem
        iconSrc="/icons/sidebar/dashboard.png"
        text="Dashboard"
        link="/dashboard"
        active={path == "/dashboard"}
      />
      <SidebarItem
        iconSrc="/icons/sidebar/package.png"
        text="Packages"
        link="/package"
        active={path == "/package"}
      />
      <SidebarItem
        iconSrc="/icons/sidebar/analytics.png"
        text="Analytics"
        link="/analytics"
        active={path == "/analytics"}
      />
      <SidebarItem
        iconSrc="/icons/sidebar/add.png"
        text="Create Loopreceipt"
        link="/create"
        active={path == "/create"}
      />
      <SidebarItem
        iconSrc="/icons/sidebar/recepients.png"
        text="Recipients"
        link="/recipients"
        active={path == "/recipients"}
      />
      <SidebarItem
        iconSrc="/icons/sidebar/integration.png"
        text="Integration"
        link="/integration"
        active={path == "/integration"}
      />
    </div>
  );
};
export default DesktopSideBar;
interface SidebarItemProps {
  iconSrc: string;
  text: string;
  active?: boolean;
  link: string;
}
const SidebarItem = ({ iconSrc, text, active, link }: SidebarItemProps) => {
  const styles = useStyles();
  return (
    <div className={classNames(styles.item, { active: active })}>
      <Link href={link}>
        <a href={link} className={classNames(styles.item) + " sidebar-links"}>
          <Image src={iconSrc} width={18} height={18} />
          <span>{text}</span>
          <span className="dot"></span>
        </a>
      </Link>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  sideBar: {
    background: "white",
    width: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: "2rem",
    // filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    borderRight: "2px solid #E5E5E5",
    position: "fixed",
    height: "100vh",
  },
  item: {
    // border: "1px solid red",

    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 1rem",
    height: 50,
    "& img": {},
    "& .dot": {
      marginLeft: "auto",
      width: 11,
      height: 11,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "50%",
      display: "none",
    },
    "& .sidebar-links": {
      textDecoration: "none",
      color: "inherit",
      width: "100%",
      padding: "0px",
      "&:hover": {
        color: "#000",
      },
    },
    "&.active": {
      background:
        "linear-gradient(90deg, rgba(33, 249, 174, 0.150034) -97.53%, rgba(74, 144, 226, 3e-05) 100%)",
      color: "#234361",
      borderLeft: "4px solid " + theme.palette.primary.main,
      "& .dot": {
        display: "inline",
      },
    },
  },
}));
