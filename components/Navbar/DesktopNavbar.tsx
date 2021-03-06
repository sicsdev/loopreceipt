import { makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import { Avatar } from "@material-ui/core";

import Image from "next/image";
import { openModal } from "@store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setShowNotificationsBox } from "@store/slices/notificationsSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { useEffect, useRef } from "react";
import { useState } from "react";
import DesktopPop from "./DesktopPop";
import { Theme } from "@material-ui/core/styles";

interface DesktopNavbarPropTypes {
  showOnlyLogo: boolean;
}
const DesktopNavbar = ({ showOnlyLogo }: DesktopNavbarPropTypes) => {
  const router = useRouter();
  const styles = useStyles({ showOnlyLogo });
  const dispatch = useAppDispatch();
  const isLoggedIn = !!Cookies.get("token");
  const accountArrowDownRef = useRef<HTMLDivElement>(null);
  const [showPop, setShowPop] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const unseenNotificationsExist = useAppSelector(
    (state) => state.notifications.unseenNotificationsExist
  );
  return (
    <div className={styles.DesktopNavbar}>
      <Link href="/dashboard">
        <a className="logo">
          <img alt="icon" src="/icons/logo.png" width={189} />
        </a>
      </Link>

      {!showOnlyLogo && (
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
                    <Button
                      size="medium"
                      onClick={childClick}
                      labelWeight="600"
                    >
                      + New Loopreceipt
                    </Button>
                  )
                )}
              </div>
              <div className="item">
                <Image
                  alt="icon"
                  src="/icons/desktopnavbar/search.svg"
                  width="20"
                  height="20"
                />
              </div>
              <div
                className="item"
                onClick={() => {
                  dispatch(
                    setShowNotificationsBox({ showNotificationsBox: true })
                  );
                }}
              >
                {unseenNotificationsExist ? (
                  <Image
                    alt="icon"
                    src="/icons/desktopnavbar/activebell.svg"
                    width="20"
                    height="20"
                  />
                ) : (
                  <Image
                    alt="icon"
                    src="/icons/desktopnavbar/bell.svg"
                    width="20"
                    height="20"
                  />
                )}
              </div>
              <div className="item">
                <Image
                  alt="icon"
                  src="/icons/desktopnavbar/message.svg"
                  width="20"
                  height="20"
                />
              </div>
              <div className="item">
                <div className="image">
                  <Avatar
                    alt="Avatar"
                    src={
                      user?.profileImage ? user?.profileImage : "/avatar.png"
                    }
                    className={styles.avatar}
                  />
                </div>
                <p className="text">{user?.name}</p>
                <div
                  ref={accountArrowDownRef}
                  className="arrowDownContainer"
                  onClick={() => {
                    setShowPop(true);
                  }}
                >
                  <Image
                    alt="icon"
                    src="/icons/arrow-down.svg"
                    width="20"
                    height="20"
                  />
                </div>
                <DesktopPop
                  anchorEl={accountArrowDownRef.current}
                  showPop={showPop}
                  setShowPop={setShowPop}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopNavbar;

const useStyles = makeStyles((theme: Theme) => ({
  DesktopNavbar: ({ showOnlyLogo }: { showOnlyLogo: boolean }) => ({
    height: "70px",
    background: "white",
    filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
    display: "flex",
    justifyContent: "center",
    "& .logo": {
      borderRight: !showOnlyLogo ? "1px solid #979797" : "",
      // borderRight: ,
      flexBasis: "250px",
      display: "flex",
      alignItems: "center",
      paddingLeft: 25,
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
        position: "relative",
        "& a": {
          color: "black",
        },
        "& a:hover": {
          cursor: "pointer",
          fontWeight: 500,
        },
        "& .image": {},
        "& .arrowDownContainer": {
          // border: "1px solid red",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          padding: ".5rem",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#ebebeb",
          },
        },
      },
    },
  }),
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: "2rem",
    backgroundColor: "#F1F3F6",
  },
}));
