import { makeStyles } from "@material-ui/core";
interface LoopCardProps {}
const LoopCard = ({}: LoopCardProps) => {
  const styles = useStyles();
  const emails = ["guptahuffman@gmail.com", "codepur@gmail.com"];
  return (
    <div className={styles.LoopCard}>
      <div className="line"></div>
      <div className="head">To: Gari Boetang</div>
      <p className="barcode">Barcode:#123456789</p>
      <div className="divider"></div>
      <p className="bottom">
        <p className="loopers">Loopers:</p>
        {emails.map((email, i) => (
          <p key={i} className="email">
            {email}
          </p>
        ))}
      </p>
      <div className="date">3/8/2020</div>
    </div>
  );
};
export default LoopCard;
const useStyles = makeStyles((theme) => ({
  LoopCard: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: 8,
    position: "relative",
    width: 323,
    padding: "1rem",
    "& .line": {
      height: 4,
      backgroundColor: "#4AC6D7",
      width: "94%",
      position: "absolute",
      top: 0,
      left: "3%",
    },
    "& .head": {
      color: "#092C4C",
      fontSize: 24,
      fontWeight: "bold",
    },
    "& .barcode": {
      margin: ".5rem 0",
      color: "#BDBDBD",
    },
    "& .divider": {
      borderTop: "1px solid #DBDBDB",
      margin: ".8rem 0",
    },
    "& .bottom": {
      margin: ".8rem 0",
      "& .loopers": {
        marginBottom: ".5rem",
        fontWeight: 500,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      },
      "& .email": {
        fontSize: 14,
        color: "#333333",
      },
    },
    "& .date": {
      fontSize: 13,
      color: "#888888",
      width: "min-content",
      marginLeft: "auto",
    },
  },
}));
