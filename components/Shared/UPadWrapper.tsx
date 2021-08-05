import { makeStyles } from "@material-ui/core";
interface UPadWrapperProps {
  children: any;
}
const UPadWrapper = ({ children }: UPadWrapperProps) => {
  const styles = useStyles();
  return <div className={styles.UPadWrapper}>{children}</div>;
};
export default UPadWrapper;
const useStyles = makeStyles((theme) => ({
  UPadWrapper: {
    padding: "0 16px",
    paddingBottom: "2rem",
  },
}));
