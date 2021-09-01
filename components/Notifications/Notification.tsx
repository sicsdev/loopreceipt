import activitiesApi from "@apiClient/activitiesApi";
import { EntityActivity } from "@apiHelpers/types";
import { useFetch } from "@hooks/useFetch";
import { makeStyles } from "@material-ui/core";
import { useAppSelector } from "@store/hooks";
import dayjs from "dayjs";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
interface NotificationProps {
  notification: EntityActivity;
  notificationsContainerRef: RefObject<HTMLDivElement>;
  setUnreadNotificationPosition: React.Dispatch<
    React.SetStateAction<"" | "up" | "down">
  >;
  scrollObserver: boolean;
}

// iconSrc="/icons/notifications/bell.svg"

export default function Notification({
  notification,
  notificationsContainerRef,
  setUnreadNotificationPosition,
  scrollObserver,
}: NotificationProps) {
  const [seenStatus, setSeenStatus] = useState(() => notification.seen);

  const showNotificationsBox = useAppSelector(
    (state) => state.notifications.showNotificationsBox
  );
  const notificationRef = useRef<HTMLDivElement>(null);
  const styles = useStyles();
  const patchMarkNotificationAsSeen = useFetch<any>(
    () => activitiesApi.markAsSeen(notification._id),
    { deferred: true }
  );
  useEffect(() => {
    setSeenStatus(notification.seen);
    // we change seen status of notification in the ui only when
    // we show or unshow the notifications
  }, []);
  useEffect(() => {
    if (!notification.seen && !patchMarkNotificationAsSeen.requestSent) {
      const { withinViewPort, position } = checkWithinViewport();
      if (withinViewPort) {
        patchMarkNotificationAsSeen.sendRequest();
      } else if (position) {
        setUnreadNotificationPosition(position);
        setTimeout(() => {
          setUnreadNotificationPosition("");
        }, 1000);
      }
    }
  }, [showNotificationsBox]);
  useEffect(() => {
    if (!notification.seen && !patchMarkNotificationAsSeen.requestSent) {
      const { withinViewPort, position } = checkWithinViewport();
      if (withinViewPort) {
        patchMarkNotificationAsSeen.sendRequest();
      }
    }
  }, [scrollObserver]);
  const checkWithinViewport: () => {
    withinViewPort: boolean;
    position: "up" | "down" | undefined;
  } = () => {
    if (notificationsContainerRef.current && notificationRef.current) {
      const containerBox =
        notificationsContainerRef.current.getBoundingClientRect();
      const notificationBox = notificationRef.current.getBoundingClientRect();
      const belowTop = notificationBox.top + 20 >= containerBox.top;
      const aboveBottom = notificationBox.bottom <= containerBox.bottom + 20;
      if (belowTop && aboveBottom) {
        return {
          withinViewPort: true,
          position: undefined,
        };
      }
      if (belowTop) {
        return {
          withinViewPort: false,
          position: "down",
        };
      }
      if (aboveBottom) {
        return {
          withinViewPort: false,
          position: "up",
        };
      }
    }
    return {
      withinViewPort: false,
      position: undefined,
    };
  };
  const iconSrc =
    notification.category === "Loop"
      ? "/icons/notifications/delivery.svg"
      : notification.category === "Profile"
      ? "/icons/notifications/profile.svg"
      : notification.category === "Group"
      ? "/icons/notifications/group.svg"
      : "/icons/notifications/check.svg";
  return (
    <div
      className={styles.item}
      ref={notificationRef}
      onClick={() => {
        checkWithinViewport();
      }}
    >
      <div className="image">
        <Image alt="icon" src={iconSrc} width={25} height={25} />
        {!seenStatus && <div className="dot"></div>}
      </div>
      <div className="text">
        &ldquo;
        {notification.title.includes("You have created a loop")
          ? notification.title.replace("a loop", "a Loopreceipt")
          : notification.title}
        &rdquo;
      </div>
      <div className="time">
        {dayjs(notification.createdAt).format("MMM DD, h:mm A")}
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  item: {
    width: "calc(100% - 18*2px)",
    margin: "auto",
    height: 90,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #E0E0E0",
    // border: "1px solid red",
    gap: "1rem",
    position: "relative",
    "&:last-child": {
      marginBottom: 40,
      borderBottom: "none",
    },
    "& .image": {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "50%",
      minHeight: 50,
      minWidth: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      "& .dot": {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 15,
        height: 15,
        borderRadius: "50%",
        backgroundColor: "#6DD400",
        border: "2px solid white",
      },
    },
    "& .text": {
      fontWeight: 500,
      color: "#4F4F4F",
    },
    "& .time": {
      position: "absolute",
      color: "#BDBDBD",
      fontSize: 14,
      top: 8,
      right: 18,
    },
  },
}));
