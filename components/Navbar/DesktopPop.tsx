import {
  makeStyles,
  Popover,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { logoutUser } from "@store/slices/userSlice";
import Button from "@components/Controls/Button";
import { useAppSelector } from "@store/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
interface DesktopPopProps {
  anchorEl: Element | null;
  showPop: boolean;
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}
const DesktopPop = ({ anchorEl, showPop, setShowPop }: DesktopPopProps) => {
  const user = useAppSelector((state) => state.user.user);
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
      <PopItem icon={<PersonIcon />} text="Account Settings" href="/accountsettings" />
      <PopItem icon={<CreditCardIcon />} text="Billing" href="/billing" />
      <PopItem icon={<ContactMailIcon />} text="Contact Connections" href="/contactconnections" />
      <PopItem icon={<LockOutlinedIcon />} text="Privacy & Security Settings" href="/privacy-and-security" />
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
    text: string;
    href: string;
  }
  function PopItem({ href, text, icon }: PopItemProps) {
    const router = useRouter();
    return (
      <Link href={href}>
        <ListItem
          button
          component="a"
          selected={href === router.asPath}
          onClick={() => {
            setShowPop(false);
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </Link>
    );
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
}));
