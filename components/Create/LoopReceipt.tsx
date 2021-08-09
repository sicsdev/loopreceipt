import Button from "@components/Controls/Button";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface LoopReceiptProps {}
const LoopReceipt = ({}: LoopReceiptProps) => {
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const styles = useStyles();
  return (
    <div className={styles.LoopReceipt}>
      {win.up("md") && (
        <div className="print">
          <Image
            alt="icon"
            src="/icons/create/print.svg"
            width={20}
            height={20}
          />
        </div>
      )}

      <p className="head">Loopreceipt Notification</p>
      <p className="colored">Scan Barcode</p>
      <p className="blurred">
        Use this provided barcode to identify your loopreceipt package by
        scanning it.
      </p>
      <div className="image">
        <Image
          alt="icon"
          src="/icons/create/barcode.svg"
          width={812}
          height={116}
        />
      </div>
      {win.down("sm") && <Button labelWeight="bold">Print Barcode</Button>}
    </div>
  );
};
export default LoopReceipt;
const useStyles = makeStyles((theme) => ({
  LoopReceipt: {
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    position: "relative",
    "& .print": {
      position: "absolute",
      right: 32,
      top: 16,
      backgroundColor: theme.palette.primary.main,
      width: 40,
      height: 40,
      display: "grid",
      placeContent: "center",
      borderRadius: "50%",
      cursor: "pointer",
    },
    "& .head": {
      fontSize: 20,
      fontWeight: "bold",
    },
    "& .colored": {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.palette.secondary.main,
    },
    "& .blurred": {
      color: "#828282",
      padding: "0 2rem",
    },
    "& .image": {
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 2rem)",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",
        padding: "10px 5px",
      },
      "& img": {},
    },
  },
}));
