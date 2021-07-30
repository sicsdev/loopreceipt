import { range } from "@helpers/utils";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { revertObject } from "@helpers/utils";
let map: {
  [key: string]: string;
} = {
  weak: "1",
  okay: "2",
  good: "3",
  strong: "4",
  "0": "",
};
map = { ...map, ...revertObject(map) };
interface PasswordStrengthBarProps {
  password: string;
}

const PasswordStrengthBar = ({ password }: PasswordStrengthBarProps) => {
  const styles = useStyles();
  const [numConstraintsFullfilled, setNumConstraintsFullfilled] = useState(0);
  useEffect(() => {
    // console.log(password);
    if (password.length < 8) {
      setNumConstraintsFullfilled(0);
      return;
    }
    let num = 0;
    if (/[A-Z]/.test(password)) num++;
    if (/[a-z]/.test(password)) num++;
    if (/[\d]/.test(password)) num++;
    if (/[^A-Za-z0-9 ]/.test(password)) num++;
    setNumConstraintsFullfilled(num);
    // console.log(num);
  }, [password]);

  return (
    <div>
      <div className={styles.PasswordStrengthBar}>
        {range(1, numConstraintsFullfilled).map((v) => (
          <p key={v} className={map[`${numConstraintsFullfilled}`]}></p>
        ))}
        {range(numConstraintsFullfilled + 1, 4).map((v) => (
          <p key={v}></p>
        ))}
      </div>
      <div
        style={{
          textAlign: "right",
          textTransform: "capitalize",
          color: "rgb(137, 135, 146)",
          paddingTop: 5,
        }}
      >
        {map[String(numConstraintsFullfilled)]}
      </div>
    </div>
  );
};
export default PasswordStrengthBar;
const useStyles = makeStyles((theme) => ({
  PasswordStrengthBar: {
    display: "flex",

    gap: 5,
    "& p": {
      height: 3,
      flex: 1,
      backgroundColor: "rgb(221, 221, 221)",
      "&.weak": {
        backgroundColor: "rgb(239, 72, 54)",
      },
      "&.okay": {
        backgroundColor: "rgb(246, 180, 77)",
      },
      "&.good": {
        backgroundColor: "rgb(43, 144, 239)",
      },
      "&.strong": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));
