import OptionCard from "@components/Dashboard/OptionCard";
import { makeStyles, useTheme } from "@material-ui/core";
import { useFetch } from "@hooks/useFetch";
import groupsApi from "@apiClient/groupsApi";
import { EntityGroup } from "apiHelpers/types";
import Group from "./Group";
import { useWindowScrolledTillEndListener } from "@hooks/useWindowScrolledTillEndListener";
import { useState } from "react";
import MyLoader from "@components/Shared/MyLoader";
import { useEffect } from "react";
import { useCallback } from "react";
interface ShowExistingGroupsProps {
  setGroupsIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  createGroupClick: Function;
}
const ShowExistingGroups = ({
  setGroupsIsEmpty,
  createGroupClick,
}: ShowExistingGroupsProps) => {
  const theme = useTheme();
  const styles = useStyles();
  const [numGroupsFetched, setNumGroupsFetched] = useState(2);
  const [totalGroups, setTotalGroups] = useState(0);
  const [fetchedGroups, setFetchedGroups] = useState<EntityGroup[]>([]);
  const [page, setPage] = useState(1);
  const { loading, sendRequest } = useFetch<{
    error: boolean;
    total: number;
    groups: EntityGroup[];
  }>(groupsApi.getAll, {
    deferred: true,
  });
  useEffect(() => {
    (async () => {
      const response = await sendRequest(1);
      if (response && response.total > 0) {
        setGroupsIsEmpty(false);
        setTotalGroups(response.total);
        addGroups(response.groups);
      }
    })();
  }, []);
  const addGroups = (fetchedGroups: EntityGroup[]) => {
    setFetchedGroups((prev) => [...prev, ...fetchedGroups]);
    setNumGroupsFetched((prev) => prev + fetchedGroups.length);
    setPage((prev) => prev + 1);
  };
  useWindowScrolledTillEndListener(
    async () => {
      // console.log("scrolled till end");

      if (numGroupsFetched >= totalGroups) return;

      const newGroups = (await sendRequest(page))?.groups;
      // console.log(newGroups);
      if (newGroups) {
        addGroups(newGroups);
      }
    },
    300,
    [numGroupsFetched, totalGroups, page]
  );

  return (
    <div className={styles.ShowExistingGroups}>
      {!loading && totalGroups === 0 ? (
        <>
          <p className="normal">You do not have any groups at the moment.</p>
          <p className="bolded">Create a group to send packages</p>
          <OptionCard
            iconSrc="/icons/create/group/create.svg"
            text="Create Group"
            iconWidth={100}
            iconHeight={50}
            onClick={() => {
              createGroupClick();
            }}
          />
        </>
      ) : (
        <>
          <div className="groups">
            {fetchedGroups.map((group, i) => (
              <Group key={i} group={group} />
            ))}

            <MyLoader loaded={!loading} />
          </div>
        </>
      )}
    </div>
  );
};
export default ShowExistingGroups;
const useStyles = makeStyles((theme) => ({
  ShowExistingGroups: {
    padding: "2rem",
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
