import { Menu, MenuItem, MenuProps, withStyles } from "@material-ui/core";
const StyledMenu = withStyles({
  paper: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    padding: "5px 0",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
export default StyledMenu;
export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "rgba(62, 103, 251, 0.1)",
    },
  },
}))(MenuItem);
