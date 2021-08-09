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
interface ShowExistingGroupsProps {
  groupsIsEmpty: boolean;
  setGroupsIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}
const ShowExistingGroups = ({
  groupsIsEmpty,
  setGroupsIsEmpty,
}: ShowExistingGroupsProps) => {
  const theme = useTheme();
  const styles = useStyles();
  const [showLoader, setShowLoader] = useState(false);
  const [numEntriesFetched, setNumEntriesFetched] = useState(2);
  const [allEntriesFetched, setAllEntriesFetched] = useState(false);
  const { data, loading } = useFetch<{ groups: EntityGroup[] }>(
    groupsApi.getAll
  );
  useEffect(() => {
    if (groupsIsEmpty && data?.groups && data.groups.length > 0) {
      setGroupsIsEmpty(false);
    }
  }, [data]);
  useEffect(() => {
    setAllEntriesFetched(numEntriesFetched >= (data?.groups?.length ?? 0));
  }, [numEntriesFetched, data]);
  useWindowScrolledTillEndListener(async () => {
    // console.log("scrolled till end");

    setShowLoader(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
    setNumEntriesFetched((prev) => {
      // console.log({ prev });
      // console.log({ new: prev + 2 });
      return prev + 2;
    });
    setShowLoader(false);
  }, 300);

  if (loading) {
    return <MyLoader loaded={false} />;
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
        <>
          <div className="groups">
            {data.groups
              .slice(0, Math.min(numEntriesFetched, data.groups.length))
              .map((group, i) => (
                <Group key={group.groupid} group={group} />
              ))}
            <MyLoader loaded={allEntriesFetched || !showLoader} />
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
