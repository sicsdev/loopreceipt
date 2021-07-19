import { withStyles, Switch as MuiSwitch } from "@material-ui/core";

const Switch = withStyles((theme) => ({
  root: {
    width: 44,
    height: 24,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: `translateX(${44 - 20 - 4}px)`,
      // 44 container width, 20 thumb width, 2 px padding on both sides
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 200,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(MuiSwitch);
export default Switch;
