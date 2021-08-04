import UPadWrapper from "@components/Shared/UPadWrapper";
import { makeStyles } from "@material-ui/core";
interface BoxProps {
  children: JSX.Element;
}
const Box = ({ children }: BoxProps) => {
  const styles = useStyles();
  return (
    <UPadWrapper>
      <div className={styles.box}>{children}</div>
    </UPadWrapper>
  );
};
export default Box;
const useStyles = makeStyles((theme) => ({
  box: {
    borderRadius: "4px",
    border: "1px solid #A09E9E",
    width: "80%",
    minHeight: "70vh",
    margin: "0 auto",
    marginTop: "2rem",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
