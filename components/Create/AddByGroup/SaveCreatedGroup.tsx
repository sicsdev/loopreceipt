import { useState, useEffect } from "react";
import { EntityGroup, EntityLooper } from "@apiClient/types";
import groupsApi from "@apiClient/groupsApi";
import Group from "./Group";
interface SaveCreatedGroupProps {
  loopers: EntityLooper[];
}
const SaveCreatedGroup = ({ loopers }: SaveCreatedGroupProps) => {
  const [savedGroup, setSavedGroup] = useState<EntityGroup | null>(null);
  useEffect(() => {
    // console.log("group mounted");
    // lets save the group to database here
    (async () => {
      const createdGroup = await groupsApi.create({
        members: loopers,
      });
      // console.log(createdGroup);

      setSavedGroup(createdGroup);
    })();
    return () => {
      //   console.log("group unmounted");
    };
  }, []);
  return <Group group={savedGroup} />;
};
export default SaveCreatedGroup;
