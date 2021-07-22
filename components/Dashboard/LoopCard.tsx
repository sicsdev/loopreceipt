import { LoopType } from "@interfaces/LoopTypes";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
interface LoopCardProps {
  type: LoopType;
}
const LoopCard = ({ type }: LoopCardProps) => {
  const styles = useStyles();
  const emails = ["guptahuffman@gmail.com", "codepur@gmail.com"];
  return (
    <div className={styles.LoopCard}>
      <p className={classNames("line", type)}></p>
      <p className="head">
        {type === "received" ? "From" : "To"}: Gari Boetang
      </p>
      <p className="barcode">Barcode:#123456789</p>
      <p className="divider"></p>
      <div className="bottom">
        <p className="loopers">Loopers:</p>
        {emails.map((email, i) => (
          <p key={i} className="email">
            {email}
          </p>
        ))}
      </div>
      <p className="date">3/8/2020</p>
    </div>
  );
};
export default LoopCard;
const useStyles = makeStyles((theme) => ({
  LoopCard: {
    // border: "2px solid blue",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: 8,
    position: "relative",
    width: 300,
    padding: "1rem",
    "& .line": {
      height: 4,

      width: "94%",
      position: "absolute",
      top: 0,
      left: "3%",
      "&.outgoing": {
        backgroundColor: "#4AC6D7",
      },
      "&.received": {
        backgroundColor: "#3ACA60",
      },
      "&.drafts": {
        backgroundColor: "#FFCC00",
      },
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
