import { Button as MuiButton, makeStyles } from "@material-ui/core";
import classNames from "classnames";
interface ButtonPropTypes {
  variant?: "text" | "outlined" | "contained";
  size?: "medium" | "large" | "small";
  color?: "inherit" | "default" | "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  other?: object;
  shrink?: boolean;
}
function Button({
  variant = "contained",
  size = "large",
  color = "primary",
  onClick,
  text,
  shrink = false,
}: ButtonPropTypes) {
  const styles = useStyles();
  return (
    <MuiButton
      className={classNames(styles.root, { shrink: "shrink" })}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      classes={{
        label: styles.label,
      }}
    >
      {text}
    </MuiButton>
  );
}

export default Button;
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    "&.shrink": {
      paddingTop: 1,
      paddingBottom: 1,
    },
  },
  label: {
    fontWeight: "bold",
    textTransform: "none",
    color: "black",
  },
}));
