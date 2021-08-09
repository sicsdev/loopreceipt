import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import Image from "next/image";
import { useEffect } from "react";
import {
  largestCommonSubstring,
  runSequentiallyAfterDelay,
} from "@helpers/utils";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setAddRecepientManually } from "@store/slices/loopReceiptSlice";
import { SearchItemType } from "@interfaces/SearchItemType";
import {
  setSearchItemClickDetector,
  setSearchItems,
} from "@store/slices/searchBarSlice";
interface SearchCardProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchCard = ({ searchInput, setSearchInput }: SearchCardProps) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const searchItems = useAppSelector((state) => state.searchBar.searchItems);

  const addRecepientManually = useAppSelector(
    (state) => state.loopReceipt.addRecepientManually
  );
  const formType = useAppSelector((state) => state.loopReceipt.type);
  useEffect(() => {
    if (searchInput) {
      const itemDetails = [];
      for (let item of searchItems) {
        const matchDetails = largestCommonSubstring(item.primary, searchInput);
        // user.name must be first argument
        // since we return matchStartIndex of first string
        itemDetails.push({
          ...item,
          ...matchDetails,
        });
      }
      dispatch(
        setSearchItems(
          itemDetails.sort((u1, u2) => {
            return u2.matchLength - u1.matchLength;
          })
        )
      );
    }
  }, [searchInput]);
  const getBolded = (item: SearchItemType<any>) => {
    // console.log(user);
    if (item.matchLength) {
      const start = item.primary.slice(0, item.matchStartIndex);
      const matched = item.primary.slice(
        item.matchStartIndex!,
        item.matchStartIndex! + item.matchLength
      );
      const end = item.primary.slice(
        item.matchStartIndex! + item.matchLength,
        item.primary.length
      );
      return (
        <p>
          {start}
          <strong>{matched}</strong>
          {end}
        </p>
      );
    }
    return <p>{item.primary}</p>;
  };
  return (
    <div className={styles.searchCard}>
      {searchItems.map((item, i) =>
        item.matchLength ? (
          <SearchItem
            key={i}
            primary={getBolded(item)}
            secondary={item.secondary}
            active={item.active}
            onClick={() => {
              const updatedSearchItems = searchItems.map((item, idx) => {
                if (idx === i) {
                  return {
                    ...item,
                    active: true,
                  };
                } else {
                  return {
                    ...item,
                    active: false,
                  };
                }
              });
              runSequentiallyAfterDelay(
                [
                  () => dispatch(setSearchItems(updatedSearchItems)),
                  () => dispatch(setSearchItemClickDetector(true)),
                ],
                1
              );

              // now we can close the search bar
              setSearchInput("");
            }}
          />
        ) : null
      )}
      {searchItems.every((item) => !item.matchLength) && (
        <div className={styles.nomatch}>
          <Image
            alt="icon"
            src="/icons/create/exclamation.svg"
            width={15}
            height={15}
          />
          &nbsp; No recipient found with the name “{searchInput}”
        </div>
      )}
      <div
        className={styles.addManuallyButton}
        onClick={() => {
          dispatch(
            setAddRecepientManually({
              addRecepientManually: !addRecepientManually,
            })
          );
        }}
      >
        + Add manually
      </div>
      {formType === "internal" && (
        <div className={styles.bottomText}>
          <Image
            alt="icon"
            src="/icons/exclaimation.svg"
            width={15}
            height={15}
          />
          &nbsp; You are searching contacts with dropisle.com
        </div>
      )}
    </div>
  );
};
export default SearchCard;
interface SearchItemProps {
  primary: JSX.Element | string;
  secondary: string;
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
