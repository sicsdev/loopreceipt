import { populateCanvasWithBarcode } from "@helpers/utils";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { IconButton, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
const Barcode = ({}) => {
  const router = useRouter();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  let { barcode } = router.query;
  const styles = useStyles();

  useEffect(() => {
    if (barcode) {
      populateCanvasWithBarcode({
        scale: 1,
        textToEncode: barcode as string,
        canvasId: "mycanvas",
      });
    }
  }, [barcode]);
  return (
    <div className={styles.barcode}>
      <div
        className={styles.download}
        onClick={() => {
          window.print();
        }}
      >
        <IconButton>
          <GetAppIcon />
        </IconButton>
      </div>

      <p className="colored">Scan Barcode</p>
      <p className="blurred">
        Use this provided barcode to identify your loopreceipt package by
        scanning it.
      </p>
      <div className="container">
        <canvas id="mycanvas"></canvas>
      </div>
    </div>
  );
};
export default Barcode;
const useStyles = makeStyles((theme) => ({
  barcode: {
    textAlign: "center",
    paddingTop: "1rem",
    "& .colored": {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.palette.secondary.main,
    },
    "& .blurred": {
      color: "#828282",
      marginBottom: "1rem",
    },
    "& .container": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        marginTop: 220,
        transform: "rotate(90deg)",
      },
    },
  },
  download: {
    position: "fixed",
    top: 5,
    right: 10,
  },
}));
