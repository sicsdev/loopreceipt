import authApi from "@apiClient/authApi";
import usersApi from "@apiClient/usersApi";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import { useFetch, deferrer } from "@hooks/useFetch";
import { useForm } from "@hooks/useForm";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import { makeStyles, useTheme, Radio } from "@material-ui/core";
import { validateAllFieldsOfForm } from "forms/formUtils";
import loginForm from "forms/loginForm";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Layout from "@components/Global/Layout";
interface LoginProps {}
const Login = ({}: LoginProps) => {
  const styles = loginStyles();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const loginFormProps = useForm(loginForm.initialState);
  const {
    data,
    loading,
    sendRequest: sendLoginRequest,
    requestSent,
  } = useFetch<{
    token: string;
    isFirstTime: boolean;
  }>(
    deferrer(authApi.login, {
      email: loginFormProps.formState.email.value,
      password: loginFormProps.formState.password.value,
    }),
    {
      deferred: true,
    }
  );

  const login = async () => {
    // console.log(loginFormProps.formState);
    if (validateAllFieldsOfForm(loginFormProps)) {
      const response = await sendLoginRequest();
      /*
      or u can pass just authApi.login to useFetch
      and call sendLoginRequest({ email: loginFormProps.formState.email.value,  password: loginFormProps.formState.password.value,})
      */
      console.log(response);
      if (response) {
        Cookies.set("token", response.token);
        Cookies.set("isFirstTime", String(response.isFirstTime));
        router.push("/dashboard");
      } else {
        alert("Please verify your email to continue");
      }
    }
  };
  useWindowKeyDownListener(
    {
      Enter: login,
    },
    [loginFormProps]
    // here we can provide dependencies for updation of our useEffect with new loginFormProps
    // our we can leave it, to update it on every state variable change
  );

  return (
    <Layout>
      <div className={styles.Login}>
        <h1 className="heading">{loginForm.formHeading}</h1>
        <div className="form">
          <Form form={loginForm} formProps={loginFormProps} padForm={false} />

          <div className="row">
            <div className="rememberMe">
              <Radio
                color="primary"
                checked={rememberMe}
                onClick={() => {
                  setRememberMe(!rememberMe);
                }}
                name="rememberMe"
                inputProps={{ "aria-label": "Remember Me?" }}
              />
              <div
                style={{
                  paddingTop: 2,
                }}
              >
                Remember Me
              </div>
            </div>
            <PrimaryLink>Forgot Password?</PrimaryLink>
          </div>
          {loading ? (
            <Button labelWeight="bold" color="default" labelColor="gray">
              Loading...
            </Button>
          ) : (
            <Button labelWeight="bold" onClick={login}>
              Log In
            </Button>
          )}

          <div className="noAccount">
            Don't have an account?{" "}
            <Link href="/signup">
              <a>
                <PrimaryLink>Join free today</PrimaryLink>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
export const loginStyles = makeStyles((theme) => ({
  Login: {
    padding: "4rem 0",
    "& .heading": {
      fontWeight: 500,
      fontSize: 36,
      color: theme.palette.secondary.main,
      textAlign: "center",
      marginBottom: "2rem",
    },
    "& .subheading": {
      textAlign: "center",
      fontSize: 18,
    },
    "& .form": {
      marginTop: "4rem",
      maxWidth: 600,
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      "& .row": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .rememberMe": {
          display: "flex",
          alignItems: "center",
          gap: 5,
        },
      },
      "& .noAccount": {
        textAlign: "center",
        color: "#8F8F8F",
      },
    },
  },
}));
