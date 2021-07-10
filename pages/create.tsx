import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Sidebar";
interface CreateProps {}
const Create = ({}: CreateProps) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Sidebar />
    </div>
  );
};
export default Create;
const useStyles = makeStyles((theme) => ({
  root: {},
}));
