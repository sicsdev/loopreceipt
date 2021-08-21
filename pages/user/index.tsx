import { makeStyles } from "@material-ui/core";
import { deviceDetect } from "react-device-detect";
import axios from "axios";
import React, { useEffect } from "react";
// just testing this
interface UserProps {}
const User = ({}: UserProps) => {
  const styles = useStyles();
  const fetchDeviceAndLocationDetails = () => {
    let c = deviceDetect();
    if (c.isMobile) {
      console.log(`${c.model} ${c.vendor} ${c.ua}`);
      console.log(c.os);
    } else {
      console.log(c.browserName);
      console.log(c.osName);
    }
    axios
      .get("https://extreme-ip-lookup.com/json/")
      .then((response) => {
        if (response.data) {
          console.log(
            `${response?.data?.city}, ${response?.data?.region}, ${response?.data?.country}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDeviceAndLocationDetails();
  }, []);
  return <div className={styles.User}>User</div>;
};
export default User;
const useStyles = makeStyles((theme) => ({
  User: {},
}));
