import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";
interface DesktopSideBarProps {
  path: string;
}
const DesktopSideBar = ({ path }: DesktopSideBarProps) => {
  const styles = useStyles();
  return (
    <div className={styles.sideBar}>
      <SidebarItem
        iconSrc="/icons/sidebar/dashboard.svg"
        text="Dashboard"
        link="/dashboard"
        active={path == "/dashboard"}
      />
      {ListenClickAtParentElement(
        (e) => {
          openModal(e, {
            positionWRTPoint: {
              right: true,
            },
          });
        },
        (childClick) => (
          <SidebarItem
            iconSrc="/icons/sidebar/create_loopreceipt.svg"
            text="Create Loopreceipt"
            onClick={childClick}
          />
        )
      )}
      <SidebarItem
        iconSrc="/icons/sidebar/packages.svg"
        text="Packages"
        link="/packages"
        active={path == "/packages"}
      />
      <SidebarItem
        iconSrc="/icons/sidebar/analytics.svg"
        text="Analytics"
        link="/analytics"
        active={path == "/analytics"}
      />

      <SidebarItem
        iconSrc="/icons/sidebar/recipients.svg"
        text="Recipients"
        link="/recipients"
        active={path == "/recipients"}
      />
      <SidebarItem
        iconSrc="/icons/sidebar/integration.svg"
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
  link?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const SidebarItem = ({
  iconSrc,
  text,
  active,
  link,
  onClick,
}: SidebarItemProps) => {
  const styles = useStyles();
  const component = (
    <div
      className={classNames(styles.item, { active: active })}
      onClick={onClick}
    >
      <Image alt="icon" src={iconSrc} width={18} height={18} />
      <span>{text}</span>
      <span className="dot"></span>
    </div>
  );
  return link ? (
    <Link href={link}>
      <a>{component}</a>
    </Link>
  ) : (
    component
  );
};

const useStyles = makeStyles((theme) => ({
  sideBar: {
    // zIndex: 9,
    background: "white",
    width: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: "2rem",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    position: "fixed",
    height: "100vh",
  },

  item: {
    // border: "1px solid red",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    padding: "0 1rem",
    height: 50,
    color: "gray",
    "&:hover": {
      color: "#222222",
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
    "& img": {},
    "& .dot": {
      marginLeft: "auto",
      width: 11,
      height: 11,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "50%",
      display: "none",
    },
  },
}));
