import { makeStyles } from "@material-ui/core";
import { useSwipeable } from "react-swipeable";
interface DetectSwipeProps {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
  trackMouse?: boolean;
  children: JSX.Element;
}
const DetectSwipe = ({
  onSwipedLeft,
  onSwipedRight,
  children,
  trackMouse = false,
}: DetectSwipeProps) => {
  const styles = useStyles();
  const handlers = useSwipeable({
    onSwipedLeft: (e) => {
      onSwipedLeft();
    },
    onSwipedRight: (e) => {
      onSwipedRight();
    },
    trackMouse: trackMouse,
  });
  return (
    <div className={styles.DetectSwipe} {...handlers}>
      {children}
    </div>
  );
};
export default DetectSwipe;
const useStyles = makeStyles((theme) => ({
  DetectSwipe: {},
}));
