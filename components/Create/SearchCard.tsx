import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { largestCommonSubstring } from "@helpers/utils";
import { useAppSelector } from "@store/hooks";
interface SearchCardProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}
interface UserType {
  name: string;
  email: string;
  matchLength?: number | undefined;
  matchStartIndex?: number | undefined;
  active?: boolean | undefined;
}

const initialUsers: UserType[] = [
  {
    name: "Rahul Gupta",
    email: "guptarahul@gmail.com",
    active: true,
  },
  {
    name: "Neha",
    email: "neha@gmail.com",
  },
  {
    name: "Simran",
    email: "simran@gmail.com",
  },
  {
    name: "Mehak Sharma",
    email: "mehak@gmail.com",
  },
  {
    name: "Aman Aggarwal",
    email: "aman@gmail.com",
  },
];

const SearchCard = ({ searchInput, setSearchInput }: SearchCardProps) => {
  const styles = useStyles();
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const formType = useAppSelector((state) => state.loopReceipt.type);
  useEffect(() => {
    if (searchInput) {
      const userDetails = [];
      for (let user of users) {
        const matchDetails = largestCommonSubstring(user.name, searchInput);
        // user.name must be first argument
        // since we return matchStartIndex of first string
        userDetails.push({
          ...user,
          ...matchDetails,
        });
      }
      setUsers(
        userDetails.sort((u1, u2) => {
          return u2.matchLength - u1.matchLength;
        })
      );
    }
  }, [searchInput]);
  const getName = (user: UserType) => {
    // console.log(user);
    if (user.matchLength && user.matchLength > 0) {
      const start = user.name.slice(0, user.matchStartIndex);
      const matched = user.name.slice(
        user.matchStartIndex!,
        user.matchStartIndex! + user.matchLength
      );
      const end = user.name.slice(
        user.matchStartIndex! + user.matchLength,
        user.name.length
      );
      return (
        <p>
          {start}
          <strong>{matched}</strong>
          {end}
        </p>
      );
    }
    return <p>{user.name}</p>;
  };
  return (
    <div className={styles.searchCard}>
      {users.map((user, i) => (
        <SearchItem
          key={i}
          name={getName(user)}
          email={user.email}
          active={user.active}
          onClick={() => {
            setUsers((prevUsers) => {
              return prevUsers.map((user, idx) => {
                if (idx === i) {
                  return {
                    ...user,
                    active: true,
                  };
                } else {
                  return {
                    ...user,
                    active: false,
                  };
                }
              });
            });
            // now we can close the search bar
            setSearchInput("");
          }}
        />
      ))}

      <div className={styles.addManuallyButton}>+ Add manually</div>
      {formType === "internal" && (
        <div className={styles.bottomText}>
          <Image src="/icons/exclaimation.svg" width={15} height={15} />
          &nbsp; You are searching contacts with dropisle.com
        </div>
      )}
    </div>
  );
};
export default SearchCard;
interface SearchItemProps {
  name: JSX.Element | string;
  email: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function SearchItem({ name, email, active = false, onClick }: SearchItemProps) {
  const styles = useStyles();

  return (
    <div className={classNames(styles.item, { active })} onClick={onClick}>
      <div className="tick">
        {active && <Image src="/icons/check.svg" width="16" height="12" />}
      </div>
      <div>
        <div className={"name"}>{name}</div>
        <div className={"email"}>{email}</div>
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
    "& .tick": {
      width: "2.5rem",
      height: "2.5rem",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .name": {
      fontSize: 17,
      marginBottom: 3,
    },
    "& .email": {
      color: "gray",
    },
    "&.active": {
      backgroundColor: "#E4FFF6",
    },
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
