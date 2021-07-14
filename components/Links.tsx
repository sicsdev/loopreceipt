import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
interface LinksProps {
  links: string[];
}
const Links = ({ links }: LinksProps) => {
  const styles = useStyles();
  const activeIndex = 0;
  return (
    <div className={styles.links}>
      {links.map((link, i) => (
        <p
          key={i}
          className={classNames("link", { active: i === activeIndex })}
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
    display: "flex",
    gap: "2rem",
    "& .link": {
      textTransform: "capitalize",
      fontSize: "22px",
      cursor: "pointer",
      fontWeight: "normal",
      lineHeight: "28px",
      "&.active": {
        color: "black",
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        fontWeight: "500",
      },
    },
  },
}));
