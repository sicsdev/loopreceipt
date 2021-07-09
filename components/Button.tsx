import { Button as MuiButton, makeStyles } from "@material-ui/core";
interface ButtonPropTypes {
  variant?: "text" | "outlined" | "contained";
  size?: "medium" | "large" | "small";
  color?: "inherit" | "default" | "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  other?: object;
}
function Button({
  variant = "contained",
  size = "large",
  color = "primary",
  onClick,
  text,
  ...other
}: ButtonPropTypes) {
  const styles = useStyles();
  return (
    <MuiButton
      className={styles.root}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      {...other}
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
    borderRadius: "8px",
  },
  label: {
    fontWeight: "bold",
    textTransform: "none",
    color: "black",
  },
}));
