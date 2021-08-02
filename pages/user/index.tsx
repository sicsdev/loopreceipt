import { makeStyles } from "@material-ui/core";
interface AuthProps {}
const Auth = ({}: AuthProps) => {
  const styles = useStyles();
  return <div className={styles.Auth}>Auth</div>;
};
export default Auth;
const useStyles = makeStyles((theme) => ({
  Auth: {},
}));
