import { makeStyles } from "@material-ui/core";
import { useState } from "react";
interface LoginProps {}
const Login = ({}: LoginProps) => {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.Login}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => {}}>submit</button>
    </div>
  );
};
export default Login;
const useStyles = makeStyles((theme) => ({
  Login: {},
}));
