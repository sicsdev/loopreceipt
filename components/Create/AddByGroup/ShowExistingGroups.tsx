import OptionCard from "@components/Dashboard/OptionCard";
import { makeStyles, useTheme } from "@material-ui/core";
import { useFetch } from "@hooks/useFetch";
import groupsApi from "@apiClient/groupsApi";
import { EntityGroup } from "apiHelpers/types";
import Group from "./Group";
import { useState } from "react";
import MyLoader from "@components/Shared/MyLoader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import groupDetailsForm from "@forms/groupDetailsForm";
import {
  setSearchItemClickDetector,
  setSearchWithSecondary,
} from "@store/slices/searchBarSlice";
import { useRef } from "react";
import { Debounce } from "@helpers/utils";
import Pagination from "@components/Dashboard/Pagination";
interface ShowExistingGroupsProps {
  setGroupsIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  createGroupClick: Function;
  selectedGroup?: EntityGroup;
  setSelectedGroup: React.Dispatch<
    React.SetStateAction<EntityGroup | undefined>
  >;
}
const ShowExistingGroups = ({
  setGroupsIsEmpty,
  createGroupClick,
  selectedGroup,
  setSelectedGroup,
}: ShowExistingGroupsProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const styles = useStyles();
  const [totalGroups, setTotalGroups] = useState(0);
  const [fetchedGroups, setFetchedGroups] = useState<EntityGroup[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { loading, sendRequest } = useFetch<{
    error: boolean;
    total: number;
    groups: EntityGroup[];
  }>(groupsApi.getAll, {
    deferred: true,
  });
  const {
    searchInput,
    searchItems,
    searchItemClickDetector,
    selectedGroupFromSearch,
  } = useAppSelector((state) => state.searchBar);

  const getSelectedGroup = useFetch<{
    error: boolean;
    group: EntityGroup;
  }>(groupsApi.getOne, {
    deferred: true,
  });
  useEffect(() => {
    // console.log(selectedGroupFromSearch);
    (async () => {
      if (selectedGroupFromSearch) {
        const response = await getSelectedGroup.sendRequest(
          selectedGroupFromSearch.groupid
        );
        if (response) setSelectedGroup(response.group);
      }
    })();
  }, [selectedGroupFromSearch]);
  useEffect(() => {
    dispatch(setSearchWithSecondary(true));
    return () => {
      dispatch(setSearchWithSecondary(false));
    };
  }, []);
  useEffect(() => {
    // for entity forms we run itemClickDetector in useEffect defined in Entityform
    if (searchItemClickDetector) {
      groupDetailsForm.searchItemClicked?.({
        entity: searchItems.find((item) => item.active)?.entity,
      });
      dispatch(setSearchItemClickDetector(false));
    }
  }, [searchItemClickDetector]);
  const searchMethodRef = useRef(
    new Debounce((searchInput: string) => {
      // console.log("search api request sent");
      groupDetailsForm.populateSearchItems?.(searchInput);
    }, 300)
  );
  useEffect(() => {
    searchMethodRef.current.callAfterDelay(searchInput);
  }, [searchInput]);

  useEffect(() => {
    (async () => {
      setFetchedGroups([]);
      const response = await sendRequest(page);
      if (response && response.total > 0) {
        setGroupsIsEmpty(false);
        setTotalGroups(response.total);
        setFetchedGroups(response.groups);
      }
    })();
  }, [page]);

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
            {getSelectedGroup.data?.group && (
              <div
                onClick={() => setSelectedGroup(getSelectedGroup.data?.group)}
              >
                <Group
                  group={getSelectedGroup.data.group}
                  selected={getSelectedGroup.data.group == selectedGroup}
                />
              </div>
            )}
            {fetchedGroups.map((group, i) => {
              return group.groupid !== getSelectedGroup.data?.group.groupid ? (
                <div key={i} onClick={() => setSelectedGroup(group)}>
                  <Group group={group} selected={group == selectedGroup} />
                </div>
              ) : null;
            })}

            <MyLoader loaded={!loading} />
            <Pagination
              page={page}
              setPage={setPage}
              totalItems={totalGroups}
              itemsPerPageOptions={[5, 10, 15]}
              itemsPerPage={10}
              setItemsPerPage={setItemsPerPage}
            />
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
