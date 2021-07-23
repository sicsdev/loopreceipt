import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles, withTheme } from "@material-ui/core";
import { closeGettingStartedGuide } from "@store/slices/genericSlice";
import Image from "next/image";
interface GettingStartedGuideMobileProps {}
const GettingStartedGuideMobile = ({}: GettingStartedGuideMobileProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  return (
    <div
      className={styles.GettingStartedGuideMobile}
      style={{
        height: windowDimensions.innerHeight + "px",
      }}
    >
      <div className="top">
        <div className="first">
          <div className="text">Getting Started Guide</div>
          <div className="cross" onClick={closeGettingStartedGuide}>
            <Image src="/icons/x-mark.svg" width={23} height={23} />
          </div>
        </div>
      </div>
      <div className="rest"></div>
    </div>
  );
};
export default GettingStartedGuideMobile;
const useStyles = makeStyles((theme) => ({
  GettingStartedGuideMobile: {
    zIndex: 1000,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    backgroundColor: "white",
    "& .top": {
      backgroundColor: "#495362",
      color: "white",
      "& .first": {
        display: "flex",
        justifyContent: "space-between",
        padding: 22,
        "& .text": {
          fontSize: 18,
        },
        "& .cross": {
          marginRight: "10px",
        },
      },
    },
  },
}));
