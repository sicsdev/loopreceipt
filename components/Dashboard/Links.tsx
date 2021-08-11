import { makeStyles } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setActiveTabIndex } from "@store/slices/dashboardSlice";
import classNames from "classnames";
import { useState } from "react";
interface LinksProps {
  links: string[];
}
const Links = ({ links }: LinksProps) => {
  const styles = useStyles();
  const activeTabIndex = useAppSelector(
    (state) => state.dashboard.activeTabIndex
  );
  const dispatch = useAppDispatch();
  return (
    <div className={styles.links}>
      {links.map((link, i) => (
        <p
          key={i}
          className={classNames("link", { active: i === activeTabIndex })}
          onClick={() => dispatch(setActiveTabIndex(i))}
        >
          {link}
        </p>
      ))}
    </div>
  );
};
export default Links;
const useStyles = makeStyles((theme) => ({
  links: {
    // border: "2px solid green",
    display: "flex",
    gap: "2rem",
    [theme.breakpoints.down("sm")]: {
      gap: "0",
      boxShadow: "0px 5px 4px -4px rgba(0, 0, 0, 0.25)",
    },

    "& .link": {
      // border: "2px solid green",
      padding: ".5rem 0",

      textAlign: "center",
      textTransform: "capitalize",
      fontSize: "22px",

      cursor: "pointer",
      fontWeight: "normal",
      lineHeight: "28px",
      [theme.breakpoints.down("sm")]: {
        flex: 1,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
      "&.active": {
        color: "black",
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        fontWeight: "500",
      },
    },
  },
}));
