import RoundButton from "@components/Controls/RoundButton";
import { makeStyles, useTheme } from "@material-ui/core";
import Image from "next/image";
import ToggleSidebar from "@components/Shared/ToggleSidebar";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";
import Link from "next/link";
import { Avatar } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setShowMobileSideBar } from "@store/slices/genericSlice";
import { logoutUser } from "@store/slices/userSlice";
import DesktopPop from "./DesktopPop";
import { useRef, useState } from "react";
import { setShowNotificationsBox } from "@store/slices/notificationsSlice";
interface MobileNavbarProps {}
const MobileNavbar = ({}: MobileNavbarProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const showMobileSideBar = useAppSelector(
    (state) => state.generic.showMobileSideBar
  );
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const accountArrowDownRef = useRef<HTMLDivElement>(null);
  const [showPop, setShowPop] = useState(false);
  const unseenNotificationsExist = useAppSelector(
    (state) => state.notifications.unseenNotificationsExist
  );
  return (
    <div className={styles.MobileNavbar}>
      <ToggleSidebar
        show={showMobileSideBar}
        close={() => dispatch(setShowMobileSideBar(false))}
        delay={300}
      >
        <div className={styles.mobileSidebar}>
          <div className={styles.profile}>
            <Avatar
              alt="Avatar"
              src={user?.profileImage ? user?.profileImage : "/avatar.png"}
              className={styles.avatarLarge}
            />
            <p className="name">{user?.name}</p>
          </div>
          <div className={styles.links}>
            <MyLink link="/dashboard">Dashboard</MyLink>
            {ListenClickAtParentElement(openModal, (childClick) => (
              <MyLink
                onClick={(e) => {
                  childClick(e);
                }}
              >
                Create Loopreceipt
              </MyLink>
            ))}
            <MyLink link="/packages">Packages</MyLink>
            <MyLink link="/recipients">Recipients</MyLink>
            <MyLink link="/analytics">Analytics</MyLink>
            <MyLink link="/contactconnections">Integration</MyLink>
            <MyLink link="/billing">Pricing</MyLink>
            <MyLink link="/accountsettings">My Account</MyLink>
          </div>

          <div className={styles.button}>
            <RoundButton
              color={theme.palette.secondary.main}
              onClick={() => {
                logoutUser();
                dispatch(setShowMobileSideBar(false));
              }}
            >
              Logout
            </RoundButton>
          </div>
        </div>
      </ToggleSidebar>
      <div
        className="items"
        onClick={() => dispatch(setShowMobileSideBar(true))}
      >
        <Image
          alt="icon"
          src="/icons/sidebar/menu.svg"
          width={20}
          height={20}
        />
        
      </div>
      <div className={styles.makeHomeLink}>
        <MyLink link="/dashboard">Home</MyLink>
      </div>

      <div className="items">
        <div
          onClick={() => {
            dispatch(setShowNotificationsBox({ showNotificationsBox: true }));
          }}
        >
          {unseenNotificationsExist ? (
            <Image
              alt="icon"
              src="/icons/desktopnavbar/activebell.svg"
              width="25"
              height="25"
            />
          ) : (
            <Image
              alt="icon"
              src="/icons/desktopnavbar/bell.svg"
              width="25"
              height="25"
            />
          )}
        </div>

        <Avatar
          alt="Avatar"
          src={user?.profileImage ? user?.profileImage : "/avatar.png"}
          className={styles.avatar}
        />
        <div
          className="arrowDownContainer"
          ref={accountArrowDownRef}
          onClick={() => {
            setShowPop(true);
          }}
        >
          <Image
            alt="icon"
            src="/icons/arrow-down.svg"
            width="17"
            height="13"
          />
        </div>
        <DesktopPop
          anchorEl={accountArrowDownRef.current}
          showPop={showPop}
          setShowPop={setShowPop}
        />
      </div>
    </div>
  );
  function MyLink({ children, onClick, link }: MyLinkProps) {
    const component = (
      <div
        className="link"
        onClick={(e) => {
          if (onClick) onClick(e);
          dispatch(setShowMobileSideBar(false));
        }}
      >
        {children}
      </div>
    );
    return link ? (
      <Link href={link}>
        <a>{component}</a>
        {/* giving anchor is important for seo */}
      </Link>
    ) : (
      component
    );
  }
};
interface MyLinkProps {
  children: JSX.Element | string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  link?: string;
}

export default MobileNavbar;
const useStyles = makeStyles((theme) => ({
  MobileNavbar: {
    height: 68,
    backgroundColor: "#F3F3F3",
    display: "flex",
    justifyContent: "space-between",
    padding: "2.5%",
    "& .items": {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      zIndex: "10",
      cursor: "pointer",
      "& .text": {
        color: "#828282",
        fontWeight: "bold",
        fontSize: 20,
      },
    },
  },
  mobileSidebar: {
    paddingBottom: "2rem",
  },
  profile: {
    padding: "1rem",
    "& .name": {
      fontWeight: "bold",
      marginTop: "5px",
      fontSize: "20px",
    },
  },
  links: {
    "& .link": {
      cursor: "pointer",
      color: "#828282",
      fontWeight: "500",
      padding: "1rem",
      borderBottom: "2px solid #F6F2F2",
    },
  },
  makeHomeLink: {
    position: "absolute",
    top: "8px",
    left: "30px",
    "& .link": {
      cursor: "pointer",
      color: "#828282",
      fontWeight: "500",
      padding: "1rem",
      borderBottom: "2px solid #F6F2F2",
    },
  },
  button: {
    marginTop: 30,
    textAlign: "center",
    padding: "0 24px",
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: "2rem",
    backgroundColor: "#F1F3F6",
  },
  avatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#F1F3F6",
  },
}));
