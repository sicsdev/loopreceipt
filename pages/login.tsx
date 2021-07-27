import authApi from "@apiClient/authApi";
import usersApi from "@apiClient/usersApi";
import { makeStyles } from "@material-ui/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
interface LoginProps {}
const Login = ({}: LoginProps) => {
  const styles = useStyles();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    const response = await authApi.login({ email, password });
    if (response) {
      Cookies.set("token", response.token);
      Cookies.set("isFirstTime", String(response.isFirstTime));
      router.push("/dashboard");
    }
  };
  const signup = async () => {
    const response = await usersApi.create({
      name,
      email,
      password,
    });
    console.log(response);
  };
  const verify = async () => {
    const response = await usersApi.verify({
      email,
    });
    console.log(response);
  };
  return (
    <div className={styles.Login}>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button onClick={login}>Login</button>

        <div>
          <button onClick={signup}>signup</button>
          <button onClick={verify}>verify</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
const useStyles = makeStyles((theme) => ({
  Login: {},
}));
