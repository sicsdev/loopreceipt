import { makeStyles } from "@material-ui/core";
interface DraftsProps {}
const Drafts = ({}: DraftsProps) => {
  const styles = useStyles();
  return (
    <div>
      <h1>Drafts</h1>
    </div>
  );
};
export default Drafts;
const useStyles = makeStyles((theme) => ({}));
