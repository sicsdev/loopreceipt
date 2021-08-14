import { makeStyles } from "@material-ui/core";
import { useFetch } from "@hooks/useFetch";
import loopsApi from "@apiClient/loopsApi";
import TabsBase, { StdData } from "./TabsBase";
interface ReceivedProps {}
const Received = ({}: ReceivedProps) => {
  const getter = useFetch<StdData>(loopsApi.getAll, { deferred: true });
  const styles = useStyles();
  return <TabsBase getter={getter} />;
};
export default Received;
const useStyles = makeStyles((theme) => ({}));