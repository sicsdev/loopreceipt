import activitiesApi from "@apiClient/activitiesApi";
import { EntityActivity } from "@apiHelpers/types";
import Message from "@components/Shared/Message";
import MyLoader from "@components/Shared/MyLoader";
import { dmy } from "@helpers/dateFormats";
import Win from "@helpers/Win";
import { useFetch } from "@hooks/useFetch";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setShowNotificationsBox } from "@store/slices/notificationsSlice";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import Notification from "./Notification";
interface NotificationsProps {}
const Notifications = ({}: NotificationsProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [fetchedNotifications, setFetchedNotifications] = useState<
    EntityActivity[]
  >([]);
  const showNotificationsBox = useAppSelector(
    (state) => state.notifications.showNotificationsBox
  );

  const getAllActivities = useFetch<{
    error: boolean;
    activities: EntityActivity[];
  }>(activitiesApi.getAll, { deferred: true });
  useEffect(() => {
    if (showNotificationsBox) {
      getAllActivities.sendRequest();
    }
  }, [showNotificationsBox]);
  useEffect(() => {
    console.log(getAllActivities.data);
    if (getAllActivities.data) {
      setFetchedNotifications(getAllActivities.data.activities);
    }
    // dayjs(activity.createdAt).format("MMM DD, h:mm A"
  }, [getAllActivities.data]);
  const dispatch = useAppDispatch();
  const dialogContent = () => {
    if (getAllActivities.loading) {
      return (
        <div>
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
        {fetchedNotifications.map((notification, i) => (
          <Notification key={i} notification={notification} />
        ))}
      </>
    );
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
          <DialogContent className={styles.dialogContent}>
            {dialogContent()}
          </DialogContent>
        </Dialog>
      ) : (
        showNotificationsBox && (
          <div
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
  paper: {
    borderRadius: 8,
  },
  dialogContent: {
    width: 550,
    maxWidth: "100vw",
    padding: 0,
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
    backgroundColor: "white",
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "auto",
  },
}));
