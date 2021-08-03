import { makeStyles, Box } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import classNames from "classnames";
interface MessageProps {
  type: "warning";
  message: string | JSX.Element;
}
const Message = ({ type, message }: MessageProps) => {
  const styles = useStyles();
  return (
    <Box display="flex" className={styles.Message}>
      {type == "warning" ? (
        <InfoIcon className={classNames("icon", type)} />
      ) : null}

      <p className={classNames("text", type)}>{message}</p>
    </Box>
  );
};
export default Message;
const useStyles = makeStyles((theme) => ({
  Message: {
    "& .warning": {
      color: "#FFC107",
    },
    "& .icon": {
      marginRight: 10,
    },
    "& .text": {},
  },
}));
