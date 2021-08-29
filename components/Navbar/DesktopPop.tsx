import {
  makeStyles,
  Popover,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import PersonIcon from "@material-ui/icons/Person";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { logoutUser } from "@store/slices/userSlice";
import Button from "@components/Controls/Button";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { setShowNotificationsBox } from "@store/slices/notificationsSlice";
interface DesktopPopProps {
  anchorEl: Element | null;
  showPop: boolean;
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}
const DesktopPop = ({ anchorEl, showPop, setShowPop }: DesktopPopProps) => {
  const user = useAppSelector((state) => state.user.user);
  const unseenNotificationsExist = useAppSelector(
    (state) => state.notifications.unseenNotificationsExist
  );
  const dispatch = useAppDispatch();

  const styles = useStyles();
  return (
    <Popover
      open={showPop}
      onClose={() => {
        setShowPop(false);
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className={styles.popContent}
    >
      <div className="email">{user?.email}</div>
      <PopItem icon={<HomeIcon />} text="Home" href="/dashboard" />
      <PopItem
        icon={
          unseenNotificationsExist ? (
            <NotificationsActiveIcon />
          ) : (
            <NotificationsIcon />
          )
        }
        text={
          <p>
            Notifications&nbsp;
            {unseenNotificationsExist && (
              <span className={styles.new}>new</span>
            )}
          </p>
        }
        onClick={() => {
          dispatch(setShowNotificationsBox({ showNotificationsBox: true }));
        }}
      />
      <PopItem
        icon={<PersonIcon />}
        text="Account Settings"
        href="/accountsettings"
      />
      <PopItem icon={<CreditCardIcon />} text="Billing" href="/billing" />
      <PopItem
        icon={<ContactMailIcon />}
        text="Contact Connections"
        href="/contactconnections"
      />
      <PopItem
        icon={<LockOutlinedIcon />}
        text="Privacy & Security Settings"
        href="/privacy-and-security"
      />
      <PopItem icon={<DashboardOutlinedIcon />} text="Apps" href="/apps" />

      <div className="buttonContainer">
        <Button
          variant="outlined"
          color="inherit"
          labelWeight="bold"
          startIcon={<ExitToAppOutlinedIcon />}
          onClick={() => {
            // it is raising error rendered fewer hooks
            // so we need a delay
            setTimeout(() => {
              logoutUser();
            }, 0);
          }}
        >
          Logout
        </Button>
      </div>
    </Popover>
  );
  interface PopItemProps {
    icon: JSX.Element;
    text: any;
    href?: string;
    onClick?: Function;
  }
  function PopItem({ href, text, icon, onClick }: PopItemProps) {
    const router = useRouter();
    const child = (
      <ListItem
        button
        component="a"
        selected={href === router.asPath}
        onClick={() => {
          onClick?.();
          setShowPop(false);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
    return href ? <Link href={href}>{child}</Link> : child;
  }
};

export default DesktopPop;
const useStyles = makeStyles((theme) => ({
  popContent: {
    "& .MuiPaper-root": {
      borderRadius: 8,
    },
    "& .email": {
      padding: "1rem",
      marginBottom: ".5rem",
      color: "#575757",
      borderBottom: "1px solid #dfdfdf",
    },
    "& .MuiListItemIcon-root": {
      marginRight: -15,
      color: "black",
    },
    "& .buttonContainer": {
      padding: "1rem",
      paddingTop: ".5rem",
      display: "flex",
      flexDirection: "column",
      "& .MuiButtonBase-root": {
        borderColor: "#c4c4c4",
      },
    },
  },
  new: {
    background: "red",
    padding: "0 5px",
    paddingBottom: 1,
    color: "white",
    borderRadius: 100,
    fontSize: 14,
    position: "relative",
    bottom: 5,
  },
}));
