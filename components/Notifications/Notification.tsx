import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface NotificationProps {
  active?: boolean;
  iconSrc: string;
  text: string;
  timeAgo: string;
}
export default function Notification({
  text,
  iconSrc,
  active = false,
  timeAgo,
}: NotificationProps) {
  const styles = useStyles();
  return (
    <div className={styles.item}>
      <div className="image">
        <Image alt="icon" src={iconSrc} width={25} height={25} />
        {active && <div className="dot"></div>}
      </div>
      <div className="text">&ldquo;{text}&rdquo;</div>
      <div className="time">{timeAgo}</div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  item: {
    width: "calc(100% - 18*2px)",
    margin: "auto",
    paddingTop: 25,
    height: 120,
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
