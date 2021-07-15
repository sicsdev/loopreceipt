import {
  Button as MuiButton,
  makeStyles,
  ButtonProps,
} from "@material-ui/core";
import classNames from "classnames";
interface AdditionalButtonProps {
  shrink?: boolean;
  expand?: boolean;
  labelColor?: "black" | "white" | "gray";
  labelWeight?: "bold" | "normal";
}

function Button({
  variant = "contained",
  size = "large",
  color = "primary",
  onClick,
  children,
  shrink = false,
  expand = false,
  labelColor = "black",
  labelWeight = "normal",
}: ButtonProps & AdditionalButtonProps) {
  const styles = useStyles({ labelColor, labelWeight });
  return (
    <MuiButton
      className={classNames(styles.button, { shrink, expand })}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      classes={{
        label: classNames(styles.label),
      }}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 8,
    margin: 0,
    "&.shrink": {
      paddingTop: 2,
      paddingBottom: 2,
    },
    "&.expand": {
      paddingLeft: "2.5rem",
      paddingRight: "2.5rem",
    },
  },
  label: (props: AdditionalButtonProps) => ({
    textTransform: "none",
    fontWeight: props.labelWeight,
    color: props.labelColor,
    whiteSpace: "nowrap",
  }),
}));
