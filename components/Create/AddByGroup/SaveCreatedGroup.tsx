import { EntityGroup, EntityLooper } from "@apiClient/types";
import groupsApi from "@apiClient/groupsApi";
import Group from "./Group";
import { deferrer, useFetch } from "@hooks/useFetch";
import Button from "@components/Controls/Button";
interface SaveCreatedGroupProps {
  loopers: EntityLooper[];
}
const SaveCreatedGroup = ({ loopers }: SaveCreatedGroupProps) => {
  const {
    data,
    loading,
    sendRequest: saveCreatedGroup,
    requestSent,
  } = useFetch<{ group: EntityGroup }>(
    deferrer(groupsApi.create, {
      members: loopers,
    }),
    { deferred: true }
  );
  if (!requestSent) {
    return (
      <div>
        <p>Please save the group </p>
        <Group group={{ members: loopers }} />
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
    return <div>Saving Group Please wait</div>;
  } else if (!data) {
    return <div>Failed to save group</div>;
  }
  return (
    <div>
      <Group group={data.group} />
    </div>
  );
};
export default SaveCreatedGroup;
