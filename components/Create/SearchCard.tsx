import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  largestCommonSubstring,
  runSequentiallyAfterDelay,
} from "@helpers/utils";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { MatchDetails, SearchItemType } from "@interfaces/SearchItemType";
import {
  setAddManuallyClickDetector,
  setSearchInput,
  setSearchItemClickDetector,
  setSearchItems,
} from "@store/slices/searchBarSlice";
import _ from "lodash";
interface SearchCardProps {}

const SearchCard = ({}: SearchCardProps) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {
    searchItems,
    searchInput,
    searchWithPrimary,
    searchWithSecondary,
    searchSpace,
    searchItemName,
  } = useAppSelector((state) => state.searchBar);

  const [sortedItems, setSortedItems] = useState<SearchItemType<any>[]>([]);
  const formType = useAppSelector((state) => state.loopReceipt.type);
  useEffect(() => {
    if (searchInput) {
      if (searchWithSecondary) {
        const itemDetails = [];
        for (let item of searchItems) {
          const matchDetails = largestCommonSubstring(
            item.secondary,
            searchInput
          );

          itemDetails.push({
            ...item,
            secondaryMatch: matchDetails,
          });
        }
        setSortedItems(
          itemDetails.sort((u1, u2) => {
            return u2.secondaryMatch.length! - u1.secondaryMatch.length!;
          })
        );
      }
      if (searchWithPrimary) {
        const itemDetails = [];
        for (let item of searchItems) {
          const matchDetails = largestCommonSubstring(
            item.primary,
            searchInput
          );
          // user.name must be first argument
          // since we return matchStartIndex of first string
          itemDetails.push({
            ...item,
            primaryMatch: matchDetails,
          });
        }
        setSortedItems(
          itemDetails.sort((u1, u2) => {
            return u2.primaryMatch.length! - u1.primaryMatch.length!;
          })
        );
      }
    }
  }, [
    dispatch,
    searchInput,
    searchItems,
    searchWithPrimary,
    searchWithSecondary,
  ]);
  // console.log(sortedItems);
  const getBolded = (str: string, match?: MatchDetails) => {
    // console.log(user);
    if (match && match.length && str && str.length) {
      const start = str.slice(0, match.startIndex);
      const matched = str.slice(
        match.startIndex!,
        match.startIndex! + match.length
      );
      const end = str.slice(match.startIndex! + match.length, str.length);
      return (
        <p>
          {start}
          <strong>{matched}</strong>
          {end}
        </p>
      );
    }
    return <p>{str}</p>;
  };
  return (
    <div className={styles.searchCard}>
      {sortedItems.map((item, i) =>
        item.primaryMatch?.length || item.secondaryMatch?.length ? (
          <SearchItem
            key={i}
            primary={getBolded(item.primary, item.primaryMatch)}
            secondary={getBolded(item.secondary, item.secondaryMatch)}
            active={item.active}
            onClick={() => {
              const updatedSearchItems = searchItems.map((it) => {
                if (_.isEqual(it.entity, item.entity)) {
                  return {
                    ...it,
                    active: true,
                  };
                } else {
                  return {
                    ...it,
                    active: false,
                  };
                }
              });
              // console.log(updatedSearchItems);
              runSequentiallyAfterDelay(
                [
                  () => dispatch(setSearchItems(updatedSearchItems)),
                  () => dispatch(setSearchItemClickDetector(true)),
                ],
                1
              );

              // now we can close the search bar
              dispatch(setSearchInput(""));
            }}
          />
        ) : null
      )}
      {sortedItems.every(
        (item) =>
          (searchWithPrimary && !item.primary.length) ||
          (searchWithSecondary && !item.secondary.length)
      ) && (
        <div className={styles.nomatch}>
          <Image
            alt="icon"
            src="/icons/create/exclamation.svg"
            width={15}
            height={15}
          />
          &nbsp; No {searchItemName} found with the name “{searchInput}”
        </div>
      )}
      <div
        className={styles.addManuallyButton}
        onClick={() => {
          dispatch(setAddManuallyClickDetector(true));
          dispatch(setSearchInput(""));
        }}
      >
        + Add manually
      </div>
      {searchSpace && (
        <div className={styles.bottomText}>
          <Image
            alt="icon"
            src="/icons/exclaimation.svg"
            width={15}
            height={15}
          />
          &nbsp; {searchSpace}
        </div>
      )}
    </div>
  );
};
export default SearchCard;
interface SearchItemProps {
  primary: JSX.Element | string;
  secondary: JSX.Element | string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function SearchItem({
  primary,
  secondary,
  active = false,
  onClick,
}: SearchItemProps) {
  const styles = useStyles();

  return (
    <div className={classNames(styles.item, { active })} onClick={onClick}>
      <div className="tick">
        {active && (
          <Image alt="icon" src="/icons/check.svg" width="16" height="12" />
        )}
      </div>
      <div>
        <div className={"primary"}>{primary}</div>
        <div className={"secondary"}>{secondary}</div>
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  searchCard: {
    background: "white",
    borderRadius: 12,
    paddingTop: 12,
    boxShadow: "0px 2px 4px rgba(97, 97, 97, 0.18)",
    width: "100%",
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 50,
    transform: "translateY(1rem)",
  },
  item: {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    padding: "2px 0",
    cursor: "pointer",
    "& .tick": {
      width: "2.5rem",
      height: "2.5rem",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .primary": {
      fontSize: 17,
      marginBottom: 3,
    },
    "& .secondary": {
      color: "gray",
    },
    "&.active": {
      backgroundColor: "#E4FFF6",
    },
  },
  nomatch: {
    padding: "1rem 2rem",
    color: "#828282",
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    gap: 10,
  },
  addManuallyButton: {
    padding: "0 2rem",
    fontSize: 17,
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "1rem",
  },

  bottomText: {
    padding: "0 2rem",
    background: "rgba(242, 242, 242, 0.5)",
    height: 45,
    display: "flex",
    alignItems: "center",
  },
}));
