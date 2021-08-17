import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
// import Loader, { LoaderProps } from "react-loader";
import Loader from "react-loader";
// add export in index.ts file to not show error
// since LoaderProps is not exported by the module
// to get propTypes use props: LoaderProps
const MyLoader = (props: any) => {
  const styles = useStyles();
  return (
    <div
      className={classNames(styles.MyLoader, {
        [styles.windowCentered]: props.windowCentered,
      })}
    >
      <Loader {...props} />
    </div>
  );
};
export default MyLoader;
const useStyles = makeStyles((theme) => ({
  MyLoader: {
    position: "relative",
    zIndex: 99,
    // so that it is below movable modal
    // border: "1px solid red",
    height: "4rem",
    "& .loader": {},
  },
  windowCentered: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
