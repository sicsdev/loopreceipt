import { makeStyles } from "@material-ui/core";
interface UpperBarProps {
  children: JSX.Element;
}
const UpperBar = ({ children }: UpperBarProps) => {
  const styles = useStyles();
  return <div className={styles.upperBar}>{children}</div>;
};
export default UpperBar;
const useStyles = makeStyles((theme) => ({
  upperBar: {
    paddingTop: "3rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #ddd",
  },
}));
