import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import Button from "@components/Controls/Button";
import ListenClickAtParentElement from "@components/shared/ListenClickAtParentElement";

import Image from "next/image";
import { openModal } from "@store/slices/modalSlice";
interface DesktopNavbarPropTypes {}
const DesktopNavbar = ({}: DesktopNavbarPropTypes) => {
  const styles = useStyles();

  return (
    <div className={styles.DesktopNavbar}>
      <Link href="/dashboard">
        <a className="logo">
          <Image src="/icons/logo.png" width="189" height="58" />
        </a>
      </Link>

      <div className="items">
        <div className="item">
          {ListenClickAtParentElement(
            (e) => {
              openModal(e, {
                translationsFrom: "element",
                positionWRTPoint: {
                  bottom: true,
                  right: true,
                },
                translations: {
                  y: 20,
                  x: -100,
                },
              });
            },
            (childClick) => (
              <Button size="medium" onClick={childClick}>
                + New Loopreceipt
              </Button>
            )
          )}
        </div>
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
            <Image src="/icons/profile.png" width="36" height="36" />
          </div>
          <p className="text">Account</p>
          <Image src="/icons/arrow-down.svg" width="20" height="20" />
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;

const useStyles = makeStyles((theme) => ({
  DesktopNavbar: {
    height: "70px",
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
}));
