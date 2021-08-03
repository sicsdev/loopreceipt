import React from "react";
import { EntityLoop } from "apiHelpers/types";
import { LoopType } from "@interfaces/LoopTypes";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import dayjs from "dayjs";
interface LoopCardProps {
  type: LoopType;
  loop: EntityLoop;
}
const LoopCard = ({ type, loop }: LoopCardProps) => {
  // console.log(loop);
  const styles = useStyles();
  return (
    <div className={styles.LoopCard}>
      <p className={classNames("line", type)}></p>
      <p className="head">
        {type === "received" ? "From" : "To"}: {loop.recipient.company}
      </p>
      <p className="barcode">Barcode:#{loop.barcode}</p>
      <p className="divider"></p>
      <div className="bottom">
        <p className="loopers">Loopers:</p>
        {loop.loopers.map(({ email }, i) => (
          <p key={i} className="email">
            {email}
          </p>
        ))}
      </div>
      <p className="date">{dayjs(loop.timestamp).format("D/M/YYYY")}</p>
    </div>
  );
};
export default React.memo(LoopCard);
const useStyles = makeStyles((theme) => ({
  LoopCard: {
    // border: "2px solid blue",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: 8,
    position: "relative",
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
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
