import { makeStyles } from "@material-ui/core";
interface ReceivedProps {}
const Received = ({}: ReceivedProps) => {
  const styles = useStyles();
  return (
    <div>
      <h1>Received</h1>
    </div>
  );
};
export default Received;
const useStyles = makeStyles((theme) => ({}));
