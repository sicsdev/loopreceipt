import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  largestCommonSubsequence,
  largestCommonSubstring,
} from "@helpers/utils";
interface SearchCardProps {
  searchString?: string;
}
const initialUsers: {
  name: string;
  email: string;
  rank?: number;
  active?: boolean;
}[] = [
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
const SearchCard = ({ searchString }: SearchCardProps) => {
  const styles = useStyles();
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    if (searchString) {
      const usersWithRank = [];
      for (let user of users) {
        usersWithRank.push({
          ...user,
          rank:
            largestCommonSubsequence(searchString, user.name) +
            largestCommonSubstring(searchString, user.name) * 2,
        });
      }
      setUsers(
        usersWithRank.sort((u1, u2) => {
          // we have to check for undefined
          // because otherwise when rank is 0 we skip
          if (u1.rank !== undefined && u2.rank !== undefined) {
            return u2.rank - u1.rank;
          } else {
            return 0;
          }
        })
      );
    }
  }, [searchString]);
  return (
    <div className={styles.searchCard}>
      {users.map((user, i) => (
        <SearchItem
          key={i}
          name={user.name}
          email={user.email}
          active={user.active}
          onClick={() =>
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
            })
          }
        />
      ))}

      <div className={styles.addManuallyButton}>+ Add manually</div>
      <div className={styles.bottomText}>
        <Image src="/icons/exclaimation.svg" width={15} height={15} />
        &nbsp; You are searching contacts with dropisle.com
      </div>
    </div>
  );
};
export default SearchCard;
interface SearchItemProps {
  name: string;
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
    zIndex: 10,
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
