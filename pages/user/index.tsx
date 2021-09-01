import { makeStyles } from "@material-ui/core";

import React, { useEffect } from "react";
// just testing this
interface UserProps {}
const User = ({}: UserProps) => {
  const styles = useStyles();

  return <div className={styles.User}>User</div>;
};
export default User;
const useStyles = makeStyles((theme) => ({
  User: {},
}));
