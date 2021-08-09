import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface OptionCardProps {
  iconSrc: string;
  text: string;
  onClick?: React.MouseEventHandler<any>;
  iconWidth?: number;
  iconHeight?: number;
}
const OptionCard = ({
  iconSrc,
  text,
  onClick,
  iconHeight = 50,
  iconWidth = 50,
}: OptionCardProps) => {
  const styles = useStyles();
  return (
    <div className={styles.optionCard} onClick={onClick}>
      <Image alt="icon" src={iconSrc} width={iconWidth} height={iconHeight} />
      <p className="text">{text}</p>
    </div>
  );
};
export default OptionCard;
const useStyles = makeStyles((theme) => ({
  optionCard: {
    minWidth: 280,
    height: 182,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
    paddingBottom: "1.5rem",
    background: "white",
    border: "0.5px solid #21F9AE",
    boxShadow: "0px 0px 4px rgba(33, 249, 174, 0.28)",
    borderRadius: 20,
    cursor: "pointer",
    userSelect: "none",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
    "& .text": {
      textDecoration: "underline",
      fontWeight: 500,
    },
  },
}));
