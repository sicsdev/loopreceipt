import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import classNames from "classnames";
interface SideBarProps {}
const SideBar = ({}: SideBarProps) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <SidebarItem iconSrc="/icons/search.svg" text="Dashboard" />
      <SidebarItem iconSrc="/icons/search.svg" text="Packages" />
      <SidebarItem iconSrc="/icons/search.svg" text="Analytics" />
      <SidebarItem
        iconSrc="/icons/search.svg"
        text="Create Loopreceipt"
        active
      />
      <SidebarItem iconSrc="/icons/search.svg" text="Recepients" />
      <SidebarItem iconSrc="/icons/search.svg" text="Integration" />
    </div>
  );
};
export default SideBar;
interface SidebarItemProps {
  iconSrc: string;
  text: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const SidebarItem = ({ iconSrc, text, active, onClick }: SidebarItemProps) => {
  const styles = useStyles();
  return (
    <div
      className={classNames(styles.item, { active: active })}
      onClick={onClick}
    >
      <Image src={iconSrc} width={18} height={18} />
      <span>{text}</span>
      <span className="dot"></span>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: "2rem",
    // filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    borderRight: "2px solid #E5E5E5",
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
    "&.active": {
      background:
        "linear-gradient(90deg, rgba(33, 249, 174, 0.150034) -97.53%, rgba(74, 144, 226, 3e-05) 100%)",
      borderLeft: "4px solid " + theme.palette.primary.main,
      "& .dot": {
        display: "inline",
      },
    },
  },
}));
