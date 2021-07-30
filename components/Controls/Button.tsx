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
  labelWeight?: string; // "normal" | "bold" | "500"
  borderColor?: string;
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
  borderColor,
}: ButtonProps & AdditionalButtonProps) {
  const styles = useStyles({ labelColor, labelWeight, borderColor });
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
  button: (props: AdditionalButtonProps) => ({
    boxShadow: "none",
    borderRadius: 8,
    borderColor: props.borderColor,
    margin: 0,
    "&:hover": {
      boxShadow: "none",
    },
    "&.shrink": {
      paddingTop: 2,
      paddingBottom: 2,
    },
    "&.expand": {
      paddingLeft: "2.5rem",
      paddingRight: "2.5rem",
    },
  }),
  label: (props: AdditionalButtonProps) => ({
    textTransform: "none",
    fontWeight: props.labelWeight as any,
    color: props.labelColor,
    whiteSpace: "nowrap",
  }),
}));
