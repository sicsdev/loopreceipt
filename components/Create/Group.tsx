import { makeStyles } from "@material-ui/core";
interface GroupProps {}
const Group = ({}: GroupProps) => {
  const styles = useStyles();
  return <div className={styles.Group}>Group</div>;
};
export default Group;
const useStyles = makeStyles((theme) => ({
  Group: {},
}));
