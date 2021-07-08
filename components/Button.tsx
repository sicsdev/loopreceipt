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
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      {...other}
      classes={{
        label: classes.label,
      }}
    >
      {text}
    </MuiButton>
  );
}

export default Button;
const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
    textTransform: "none",
    color: "black",
  },
}));
