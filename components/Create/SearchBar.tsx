import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Image from "next/image";
import SearchCard from "@components/Create/SearchCard";
interface SearchBarProps {}
const SearchBar = ({}: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");
  const styles = useStyles();
  return (
    <div className={styles.SearchBar}>
      <input
        className={"searchInput"}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter name, email or user group"
      />
      <div className="image">
        <Image src="/icons/search-gray.svg" width={19} height={19} />
      </div>
      {searchInput && <SearchCard searchString={searchInput} />}
    </div>
  );
};
export default SearchBar;
const useStyles = makeStyles((theme) => ({
  SearchBar: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexBasis: "60%",

    marginRight: "auto",
    padding: 8,
    borderRadius: 12,
    boxShadow: "0px 2px 4px rgba(97, 97, 97, 0.18)",
    [theme.breakpoints.down("xs")]: {
      flexBasis: "100%",
    },
    "& .searchInput": {
      backgroundColor: "#e9e9e9",
      outline: "none",
      border: "none",
      height: "100%",
      width: "100%",
      borderRadius: 8,
      padding: 8,
    },
    "& .image": {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      right: 20,
    },
  },
}));