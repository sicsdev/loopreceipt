import { makeStyles } from "@material-ui/core";
interface LoopCardProps {}
const LoopCard = ({}: LoopCardProps) => {
  const styles = useStyles();
  return <div className={styles.LoopCard}>LoopCard</div>;
};
export default LoopCard;
const useStyles = makeStyles((theme) => ({
  LoopCard: {},
}));
