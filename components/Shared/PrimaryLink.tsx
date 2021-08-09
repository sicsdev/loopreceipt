import { makeStyles } from "@material-ui/core";
import Link from "next/link";
interface PrimaryLinkProps {
  children: JSX.Element | string;
  href: string;
}
const PrimaryLink = ({ children, href }: PrimaryLinkProps) => {
  const styles = useStyles();
  return (
    <Link href={href}>
      <a className={styles.PrimaryLink}>{children}</a>
    </Link>
  );
};
export default PrimaryLink;
const useStyles = makeStyles((theme) => ({
  PrimaryLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "inherit",
    fontWeight: "bold",
  },
}));
