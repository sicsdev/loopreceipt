import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface OptionCardProps {
  iconSrc: string;
  text: string;
}
const OptionCard = ({ iconSrc, text }: OptionCardProps) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Image src={iconSrc} width={50} height={50} />
      <p className="text">{text}</p>
    </div>
  );
};
export default OptionCard;
const useStyles = makeStyles((theme) => ({
  root: {
    width: 280,
    height: 182,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "1.5rem",
    background: "white",
    border: "0.5px solid #21F9AE",
    boxShadow: "0px 0px 4px rgba(33, 249, 174, 0.28)",
    borderRadius: 20,

    "& .text": {
      textDecoration: "underline",
      fontWeight: "bold",
    },
  },
}));
