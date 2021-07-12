import {
  Button as MuiButton,
  makeStyles,
  ButtonProps,
} from "@material-ui/core";
import classNames from "classnames";

function Button({
  variant = "contained",
  size = "large",
  color = "primary",
  onClick,
  children,
  shrink = false,
  expand = false,
}: ButtonProps & { shrink?: boolean; expand?: boolean }) {
  const styles = useStyles();
  return (
    <MuiButton
      className={classNames(styles.root, { shrink, expand })}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      classes={{
        label: styles.label,
      }}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    "&.shrink": {
      paddingTop: 2,
      paddingBottom: 2,
    },
    "&.expand": {
      paddingLeft: "2.5rem",
      paddingRight: "2.5rem",
    },
  },
  label: {
    fontWeight: "bold",
    textTransform: "none",
    color: "black",
  },
}));
