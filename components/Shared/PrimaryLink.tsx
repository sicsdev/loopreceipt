import { makeStyles } from "@material-ui/core";
import Link from "next/link";
interface PrimaryLinkProps {
  children: JSX.Element | string;
  href: string;
  isTargetBlankLink?: boolean;
}
const PrimaryLink = ({
  children,
  href,
  isTargetBlankLink = false,
}: PrimaryLinkProps) => {
  const styles = useStyles();
  return (
    <p
      style={{
        display: "inline-block",
      }}
    >
      {!isTargetBlankLink ? (
        <Link href={href}>
          <a className={styles.PrimaryLink}>{children}</a>
        </Link>
      ) : (
        <a
          className={styles.PrimaryLink}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      )}
    </p>
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
