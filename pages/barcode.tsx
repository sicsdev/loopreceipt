import { populateCanvasWithBarcode } from "@helpers/utils";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Barcode = ({}) => {
  const router = useRouter();
  let { loopid } = router.query;
  const styles = useStyles();
  useEffect(() => {
    if (loopid) {
      populateCanvasWithBarcode({
        scale: 2,
        textToEncode: loopid as string,
        canvasId: "mycanvas",
      });
    }
  }, [loopid]);
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
