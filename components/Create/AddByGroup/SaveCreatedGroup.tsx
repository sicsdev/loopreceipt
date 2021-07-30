import { EntityGroup, EntityLooper } from "apiHelpers/types";
import groupsApi from "@apiClient/groupsApi";
import Group from "./Group";
import { deferrer, useFetch } from "@hooks/useFetch";
import Button from "@components/Controls/Button";
import { useRouter } from "next/router";
import { makeStyles, StylesProvider } from "@material-ui/core";
interface SaveCreatedGroupProps {
  loopers: EntityLooper[];
}
const SaveCreatedGroup = ({ loopers }: SaveCreatedGroupProps) => {
  const styles = useStyles();
  const router = useRouter();
  const {
    data,
    loading,
    sendRequest: saveCreatedGroup,
    requestSent,
  } = useFetch<{ group: EntityGroup }>(
    deferrer(groupsApi.create, {
      members: loopers,
    }),
    {
      deferred: true,
      numRetriesOnError: 3,
      retryMethodOnError: () => {
        console.log("retry");
      },
      methodOnError: () => {
        console.log("redirect to login page");
        // router.push("/login");
      },
    }
  );
  let child;
  if (!requestSent) {
    child = (
      <div>
        <p>Please save the group </p>
        <Group group={{ members: loopers }} />
        <div style={{ height: "2rem" }}></div>
        <Button
          onClick={() => {
            saveCreatedGroup();
            // if we don't pass data above we can pass it here
            // saveCreatedGroup({
            //   members: loopers,
            // })
          }}
        >
          Save this Group
        </Button>
      </div>
    );
  } else if (loading) {
    child = <div>Saving Group Please wait</div>;
  } else if (!data) {
    child = <div>Failed to save group</div>;
  } else {
    child = <Group group={data.group} />;
  }
  return <div className={styles.SaveCreatedGroup}>{child}</div>;
};
export default SaveCreatedGroup;
const useStyles = makeStyles((theme) => ({
  SaveCreatedGroup: {
    padding: "2rem",
  },
}));
