import { makeStyles } from "@material-ui/core";
interface OutgoingProps {}
const Outgoing = ({}: OutgoingProps) => {
  const styles = useStyles();
  return (
    <div>
      <h1>Outgoing</h1>
    </div>
  );
};
export default Outgoing;
const useStyles = makeStyles((theme) => ({}));
