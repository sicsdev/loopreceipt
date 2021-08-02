import { makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";

import Image from "next/image";
import { openModal } from "@store/slices/modalSlice";
import { useAppDispatch } from "@store/hooks";
import { setShowNotificationsBox } from "@store/slices/notificationsSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
interface DesktopNavbarPropTypes {}
const DesktopNavbar = ({}: DesktopNavbarPropTypes) => {
  const router = useRouter();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const isLoggedIn = !!Cookies.get("token");
  return (
    <div className={styles.DesktopNavbar}>
      <Link href="/dashboard">
        <a className="logo">
          <Image src="/icons/logo.png" width="189" height="58" />
        </a>
      </Link>

      <div className="items">
        {!isLoggedIn ? (
          <>
            <div className="item">
              <Link href="/login">
                <a>Solutions</a>
              </Link>
            </div>
            <div className="item">
              <Link href="/login">
                <a>Resources</a>
              </Link>
            </div>
            <div className="item">
              <Link href="/login">
                <a>Company</a>
              </Link>
            </div>

            <div className="item">
              <Link href="/user/login">
                <a>Log In</a>
              </Link>
            </div>

            <div className="item">
              <Button
                labelWeight="500"
                shrink
                onClick={() => {
                  router.push("/user/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          </>
        ) : (
          <>
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
            <div
              className="item"
              onClick={() => {
                dispatch(
                  setShowNotificationsBox({ showNotificationsBox: true })
                );
              }}
            >
              <Image src="/icons/bell.svg" width="20" height="20" />
            </div>
            <div className="item">
              <Image src="/icons/message.svg" width="20" height="20" />
            </div>
            <div className="item">
              <div className="image">
                <Image
                  src="/icons/profile.png"
                  width="36"
                  height="36"
                  onClick={() => {
                    Cookies.remove("token");
                    router.push("/user/login");
                  }}
                />
              </div>
              <p className="text">Account</p>
              <Image src="/icons/arrow-down.svg" width="20" height="20" />
            </div>
          </>
        )}
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
        "& a": {
          color: "black",
        },
        "& a:hover": {
          cursor: "pointer",
          fontWeight: 500,
        },
        "& .image": {},
      },
    },
  },
}));
