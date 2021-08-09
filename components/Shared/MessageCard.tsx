import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface MessageCardProps {
  type: "warning";
  children: any;
}
const MessageCard = ({ type, children }: MessageCardProps) => {
  const styles = useStyles({ type });
  return (
    <div className={styles.MessageCard}>
      {type == "warning" ? (
        <Image
          src="/icons/user/warning.svg"
          width={40}
          height={40}
          alt="warning"
        />
      ) : null}
      <div className="text">{children}</div>
    </div>
  );
};
export default MessageCard;
const useStyles = makeStyles((theme) => ({
  MessageCard: (props: { type: string }) => ({
    borderRadius: 4,
    padding: "1rem",

    textAlign: "center",
    backgroundColor: messageColors[props.type].backgroundColor,
    border: `1px solid ${messageColors[props.type].textColor}`,
    "& .icon": {
      color: messageColors[props.type].iconColor,
    },
    "& .text": {
      color: messageColors[props.type].textColor,
      fontSize: 18,
    },
  }),
}));
const messageColors: {
  [key: string]: {
    textColor: string;
    iconColor: string;
    backgroundColor: string;
  };
} = {
  warning: {
    textColor: "#F4B346",
    iconColor: "#EDC74B",
    backgroundColor: "#FEFAF3",
  },
};
