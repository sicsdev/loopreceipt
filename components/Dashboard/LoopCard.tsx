import React from "react";
import { EntityDraft, EntityLoop } from "apiHelpers/types";
import { LoopType } from "@interfaces/LoopTypes";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import dayjs from "dayjs";
import router from "next/router";
interface LoopCardProps {
  type: LoopType;
  loop: EntityLoop | EntityDraft;
}
const LoopCard = ({ type, loop }: LoopCardProps) => {
  console.log(loop);
  const styles = useStyles();
  const draftId = (loop as EntityDraft).draftId;
  return (
    <div
      className={styles.LoopCard}
      onClick={() => {
        if (draftId) {
          router.push({
            pathname: "/create",
            query: {
              draftId,
            },
          });
        }
      }}
    >
      <p className={classNames("line", type)}></p>
      <p className="head">
        {type === "received" ? "From" : "To"}: {loop.recipient?.name}
      </p>
      <p className="barcode">
        {draftId ? "DraftID" : "LoopreceiptID"}:#
        {(loop as EntityLoop).loopid || draftId}
      </p>
      <p className="divider"></p>
      <div className="bottom">
        <p className="loopers">Loopers:</p>
        {loop.loopers?.map(({ email }, i) => (
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
    cursor: "pointer",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",

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
      wordWrap: "break-word",
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
