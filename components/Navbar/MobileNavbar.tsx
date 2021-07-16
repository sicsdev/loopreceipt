import RoundButton from "@components/Controls/RoundButton";
import { makeStyles, useTheme } from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";
import ToggleSidebar from "@components/shared/ToggleSidebar";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
interface MobileNavbarProps {}
const MobileNavbar = ({}: MobileNavbarProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.MobileNavbar}>
      <ToggleSidebar
        show={showSidebar}
        close={() => setShowSidebar(false)}
        delay={300}
      >
        <div
          className={styles.mobileSidebar}
          style={{
            height: windowDimensions.innerHeight + "px",
          }}
          onScroll={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.profile}>
            <Image src="/icons/sidebar/profilehq.png" width="74" height="74" />
            <p className="name">Maria Junior</p>
          </div>
          <div className={styles.links}>
            <MyLink>Dashboard</MyLink>
            <MyLink>Create Loopreceipt</MyLink>
            <MyLink>Packages</MyLink>
            <MyLink>Recepients</MyLink>
            <MyLink>Analytics</MyLink>
            <MyLink>Integration</MyLink>
            <MyLink>Pricing</MyLink>
            <MyLink>My Account</MyLink>
          </div>
          <div
            style={{
              padding: "1rem",
              color: "#BDBDBD",
            }}
          >
            Version 1.3.0
          </div>
          <div className={styles.button}>
            <RoundButton color={theme.palette.secondary.main}>
              Logout
            </RoundButton>
          </div>
        </div>
      </ToggleSidebar>
      <div className="items" onClick={() => setShowSidebar(true)}>
        <Image src="/icons/sidebar/menu.svg" width={20} height={20} />
        <span className={"text"}>Home</span>
      </div>
      <div className="items">
        <Image src="/icons/profile.png" width="38" height="38" />
        <Image src="/icons/arrow-down.svg" width="17" height="13" />
      </div>
    </div>
  );
};
interface MyLinkProps {
  children: JSX.Element | string;
}
function MyLink({ children }: MyLinkProps) {
  return <div className="link">{children}</div>;
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
      "& .text": {
        color: "#828282",
        fontWeight: "bold",
        fontSize: 20,
      },
    },
  },
  mobileSidebar: {
    height: "100vh",
    overflow: "auto",
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
      color: "#828282",
      fontWeight: "500",
      padding: "1rem",
      borderBottom: "2px solid #F6F2F2",
    },
  },
  button: {
    textAlign: "center",
    padding: "0 24px",
  },
}));
