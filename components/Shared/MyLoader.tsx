import { makeStyles } from "@material-ui/core";
// import Loader, { LoaderProps } from "react-loader";
import Loader from "react-loader";
// add export in index.ts file to not show error
// since LoaderProps is not exported by the module
// to get propTypes use props: LoaderProps
const MyLoader = (props: any) => {
  const styles = useStyles();
  return (
    <div className={styles.MyLoader}>
      <Loader {...props} />
    </div>
  );
};
export default MyLoader;
const useStyles = makeStyles((theme) => ({
  MyLoader: {
    position: "relative",
    // border: "1px solid red",
    height: "4rem",
    "& .loader": {},
  },
}));
