import { makeStyles } from "@material-ui/core";
interface PrimaryLinkProps {
  children: JSX.Element | string;
}
const PrimaryLink = ({ children }: PrimaryLinkProps) => {
  const styles = useStyles();
  return <span className={styles.PrimaryLink}>{children}</span>;
};
export default PrimaryLink;
const useStyles = makeStyles((theme) => ({
  PrimaryLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "inherit",
  },
}));
