import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setShowNotificationsBox } from "@store/slices/notificationsSlice";
import Image from "next/image";
import Notification from "./Notification";
interface NotificationsProps {}
const Notifications = ({}: NotificationsProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const showNotificationsBox = useAppSelector(
    (state) => state.notifications.showNotificationsBox
  );
  const dispatch = useAppDispatch();
  const dialogContent = (
    <>
      <div className={styles.top}>
        <div
          className="d"
          onClick={() => {
            console.log("back clicked");
            // console.log(showNotificationsBox);
            dispatch(setShowNotificationsBox({ showNotificationsBox: false }));
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
      <Notification
        iconSrc="/icons/notifications/delivery.svg"
        text="Delivery notice - New package from Sarah Smith"
        timeAgo="2 min ago"
        active
      />
      <Notification
        iconSrc="/icons/notifications/check.svg"
        text="Account Changed Notice - You’ve upgraded your plan to Pro."
        timeAgo="Jun 12, 12:10 PM"
      />
      <Notification
        iconSrc="/icons/notifications/check.svg"
        text="Account Change Notice - You’ve downgraded your plan to a free plan."
        timeAgo="Jun 12, 12:10 PM"
      />
      <Notification
        iconSrc="/icons/notifications/bell.svg"
        text="Billing Notice - Your credit card ending in 6789 will expire soon. Head over to the billing page to update your info."
        timeAgo="Jun 12, 12:10 PM"
      />
      {/* <Notification
        iconSrc="/icons/notifications/profile.svg"
        text="Delivery Notice - Package comment from Sanya L."
        timeAgo="Jun 12, 12:10 PM"
      />
      <Notification
        iconSrc="/icons/notifications/profile.svg"
        text="Delivery Notice - Package comment from Sanya L."
        timeAgo="Jun 12, 12:10 PM"
      />
      <Notification
        iconSrc="/icons/notifications/profile.svg"
        text="Delivery Notice - Package comment from Sanya L."
        timeAgo="Jun 12, 12:10 PM"
      /> */}
    </>
  );
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
            {dialogContent}
          </DialogContent>
        </Dialog>
      ) : (
        showNotificationsBox && (
          <div
            className={styles.mobileView}
            style={{ height: windowDimensions.innerHeight + "px" }}
          >
            {dialogContent}
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
