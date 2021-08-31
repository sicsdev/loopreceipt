import { populateCanvasWithBarcode } from "@helpers/utils";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Barcode = ({}) => {
  const router = useRouter();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [scale, setScale] = useState(2);
  let { barcode } = router.query;
  const styles = useStyles();
  useEffect(() => {
    if (windowDimensions.innerWidth < 1200) {
      setScale(1);
    } else {
      setScale(2);
    }
  }, [windowDimensions]);
  useEffect(() => {
    if (barcode) {
      populateCanvasWithBarcode({
        scale: scale,
        textToEncode: barcode as string,
        canvasId: "mycanvas",
      });
    }
  }, [barcode, scale]);
  return (
    <div className={styles.container}>
      <canvas id="mycanvas"></canvas>
    </div>
  );
};
export default Barcode;
const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      transform: "rotate(90deg)",
    },
  },
}));
