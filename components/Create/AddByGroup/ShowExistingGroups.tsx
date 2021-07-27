import groupsApi from "@apiClient/groupsApi";
import { EntityGroup } from "@apiClient/types";
import OptionCard from "@components/Dashboard/OptionCard";
import { useFetch } from "@hooks/useFetch";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Group from "./Group";

interface ShowExistingGroupsProps {}
const ShowExistingGroups = ({}: ShowExistingGroupsProps) => {
  const styles = useStyles();
  const { data, loading } = useFetch<{ groups: EntityGroup[] }>(
    groupsApi.getAll
  );
  if (loading) {
    return <div>Loading...</div>;
  } else if (!data) {
    return <div>Error while fetching</div>;
  }
  return (
    <div className={styles.ShowExistingGroups}>
      {data.groups.length === 0 ? (
        <>
          <p className="normal">You do not have any groups at the moment.</p>
          <p className="bolded">Create a group to send packages</p>
          <OptionCard
            iconSrc="/icons/create/group/create.svg"
            text="Create Group"
            iconWidth={100}
            iconHeight={50}
          />
        </>
      ) : (
        <div className="groups">
          {data.groups.map((group) => (
            <Group key={group.groupid} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ShowExistingGroups;
const useStyles = makeStyles((theme) => ({
  ShowExistingGroups: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .normal": {
      color: "#4F5257",
    },
    "& .bolded": {
      color: "#4F5257",
      fontWeight: 500,
      marginBottom: "2rem",
    },
    "& .groups": {
      margin: "2rem 0",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: 20,
    },
  },
}));
