import draftsApi from "@apiClient/draftsApi";
import { useFetch } from "@hooks/useFetch";
import { makeStyles } from "@material-ui/core";
import TabsBase, { StdData } from "./TabsBase";
interface DraftsProps {}
const Drafts = ({}: DraftsProps) => {
  const styles = useStyles();
  const getter = useFetch<StdData>(draftsApi.getAll, { deferred: true });
  return <TabsBase getter={getter} />;
};
export default Drafts;
const useStyles = makeStyles((theme) => ({}));
