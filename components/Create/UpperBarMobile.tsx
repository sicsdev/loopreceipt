import { makeStyles } from "@material-ui/core";
interface UpperBarMobileProps {
  upperBarContent?: JSX.Element | string;
  show: boolean;
}
const UpperBarMobile = ({ upperBarContent, show }: UpperBarMobileProps) => {
  const styles = useStyles();
  return show ? <div className={styles.head}>{upperBarContent}</div> : null;
};
export default UpperBarMobile;
const useStyles = makeStyles((theme) => ({
  head: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
}));
