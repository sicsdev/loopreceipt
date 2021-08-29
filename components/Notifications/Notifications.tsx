import activitiesApi from "@apiClient/activitiesApi";
import { EntityActivity } from "@apiHelpers/types";
import Message from "@components/Shared/Message";
import MyLoader from "@components/Shared/MyLoader";
import Win from "@helpers/Win";
import { useFetch } from "@hooks/useFetch";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  setShowNotificationsBox,
  setUnseenNotificationsExist,
} from "@store/slices/notificationsSlice";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Notification from "./Notification";
import classNames from "classnames";
interface NotificationsProps {}
const Notifications = ({}: NotificationsProps) => {
  const dispatch = useAppDispatch();

  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);
  const [unreadNotificationPosition, setUnreadNotificationPosition] = useState<
    "up" | "down" | ""
  >("");
  const [fetchedNotifications, setFetchedNotifications] = useState<
    EntityActivity[]
  >([]);
  const [scrollObserver, setScrollObserver] = useState(true);
  const showNotificationsBox = useAppSelector(
    (state) => state.notifications.showNotificationsBox
  );

  const getAllActivities = useFetch<{
    error: boolean;
    activities: EntityActivity[];
  }>(activitiesApi.getAll, { deferred: true });
  useEffect(() => {
    getAllActivities.sendRequest();
    setInterval(() => {
      getAllActivities.sendRequest();
    }, 3000);
  }, []);
  useEffect(() => {
    if (getAllActivities.data) {
      setFetchedNotifications(getAllActivities.data.activities);
    }
    // dayjs(activity.createdAt).format("MMM DD, h:mm A"
  }, [getAllActivities.data]);
  useEffect(() => {
    // console.log(fetchedNotifications);
    if (fetchedNotifications.every((v) => v.seen)) {
      dispatch(setUnseenNotificationsExist(false));
    } else {
      dispatch(setUnseenNotificationsExist(true));
    }
  }, [fetchedNotifications]);
  useEffect(() => {
    const cb = (e: Event) => {
      setScrollObserver((prev) => !prev);
    };
    const container = notificationsContainerRef.current;
    setTimeout(() => {
      notificationsContainerRef.current?.addEventListener("scroll", cb);
    }, 1);
    return () => {
      container?.removeEventListener("scroll", cb);
    };
  }, [showNotificationsBox]);

  const dialogContent = () => {
    if (fetchedNotifications.length) {
      return (
        <>
          <div className={styles.top}>
            <div
              className="d"
              onClick={() => {
                // console.log("back clicked");
                // console.log(showNotificationsBox);

                dispatch(
                  setShowNotificationsBox({ showNotificationsBox: false })
                );
              }}
            >
              {win.down("xs") && (
                <Image
                  alt="icon"
                  src="/icons/notifications/backarrow.svg"
                  width={20}
                  height={18}
                />
              )}
              Notifications
            </div>
            <p className="b">Mark all as read</p>
          </div>
          <div>
            {fetchedNotifications.map((notification) => (
              <Notification
                key={notification._id}
                scrollObserver={scrollObserver}
                notification={notification}
                notificationsContainerRef={notificationsContainerRef}
                setUnreadNotificationPosition={setUnreadNotificationPosition}
              />
            ))}
          </div>
          {unreadNotificationPosition && (
            <div
              className={classNames(styles.unread, unreadNotificationPosition)}
            >
              {unreadNotificationPosition === "up" ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
              &nbsp; More unread notifications
            </div>
          )}
        </>
      );
    }

    if (getAllActivities.loading) {
      return (
        <div className={styles.center}>
          <MyLoader />
        </div>
      );
    }
    if (getAllActivities.error) {
      return (
        <div>
          <Message type="warning" message="Some error occurred" />
        </div>
      );
    }
  };

  return (
    <div className={styles.Notifications}>
      {win.up("sm") ? (
        <Dialog
          classes={{
            paper: styles.paper,
          }}
          open={showNotificationsBox}
          onClose={(event, reason) => {
            //   console.log(reason);
            // escape or backdrop click
            dispatch(setShowNotificationsBox({ showNotificationsBox: false }));
          }}
        >
          <DialogContent
            ref={notificationsContainerRef}
            className={styles.dialogContent}
          >
            {dialogContent()}
          </DialogContent>
        </Dialog>
      ) : (
        showNotificationsBox && (
          <div
            ref={notificationsContainerRef}
            className={styles.mobileView}
            style={{ height: windowDimensions.innerHeight + "px" }}
          >
            {dialogContent()}
          </div>
        )
      )}
    </div>
  );
};
export default Notifications;

const useStyles = makeStyles((theme) => ({
  Notifications: {},
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  paper: {
    borderRadius: 8,
  },
  dialogContent: {
    width: 550,
    maxWidth: "100vw",
    padding: 0,
    position: "relative",

    "&:first-child": {
      paddingTop: 0,
    },
  },
  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #E0E0E0",
    height: 90,
    padding: "0 18px",
    "& .d": {
      fontSize: 18,
      fontWeight: 500,
      [theme.breakpoints.down("xs")]: {
        color: "#828282",
        display: "flex",
        alignItems: "center",
        gap: 15,
        cursor: "pointer",
      },
    },
    "& .b": {
      fontWeight: 500,
      color: theme.palette.secondary.main,
    },
  },

  mobileView: {
    zIndex: 100000,
    width: "100vw",
    backgroundColor: "white",
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "auto",
  },
  unread: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    padding: "5px 10px",
    borderRadius: 1000,
    userSelect: "none",
    "&.up": {
      top: 20,
    },
    "&.down": {
      bottom: 20,
    },
  },
}));
