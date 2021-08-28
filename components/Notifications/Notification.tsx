import activitiesApi from "@apiClient/activitiesApi";
import { EntityActivity } from "@apiHelpers/types";
import { useFetch } from "@hooks/useFetch";
import { makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect } from "react";
interface NotificationProps {
  notification: EntityActivity;
}

// iconSrc="/icons/notifications/bell.svg"
export default function Notification({ notification }: NotificationProps) {
  const styles = useStyles();
  const patchMarkNotificationAsSeen = useFetch<any>(() =>
    activitiesApi.markAsSeen(notification._id)
  );
  useEffect(() => {
    // console.log(patchMarkNotificationAsSeen.data);
    // console.log(patchMarkNotificationAsSeen.error);
  }, [patchMarkNotificationAsSeen]);
  const iconSrc =
    notification.category === "Loop"
      ? "/icons/notifications/delivery.svg"
      : notification.category === "Profile"
      ? "/icons/notifications/profile.svg"
      : notification.category === "Group"
      ? "/icons/notifications/check.svg"
      : "/icons/notifications/check.svg";
  return (
    <div className={styles.item}>
      <div className="image">
        <Image alt="icon" src={iconSrc} width={25} height={25} />
        {!notification.seen && <div className="dot"></div>}
      </div>
      <div className="text">
        &ldquo;
        {notification.title.includes("You have created a loop")
          ? "You have created a new Loopreceipt"
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
