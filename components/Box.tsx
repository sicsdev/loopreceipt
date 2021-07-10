import { makeStyles } from "@material-ui/core";
interface BoxProps {
  children: JSX.Element;
}
const Box = ({ children }: BoxProps) => {
  const styles = useStyles();
  return <div className={styles.root}>{children}</div>;
};
export default Box;
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "4px",
    border: "1px solid #A09E9E",
    width: "80%",
    margin: "2rem auto",
    marginTop: "calc(70px + 2rem)",
  },
}));
