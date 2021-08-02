import authApi from "@apiClient/authApi";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import { useFetch, deferrer } from "@hooks/useFetch";
import { useForm } from "@hooks/useForm";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import { Radio } from "@material-ui/core";
import { validateAllFieldsOfForm } from "@forms/formUtils";
import loginForm from "@forms/auth/loginForm";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "@components/Global/Layout";
import Message from "@components/Shared/Message";
import commonUserFormStyles from "./commonUserFormStyles";
interface LoginProps {}
const Login = ({}: LoginProps) => {
  const styles = commonUserFormStyles();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const loginFormProps = useForm(loginForm.initialState);
  const {
    data,
    loading,
    sendRequest: sendLoginRequest,
    requestSent,
    error,
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
      // console.log(response);
      if (response) {
        Cookies.set("token", response.token);
        Cookies.set("isFirstTime", String(response.isFirstTime));
        router.push("/dashboard");
      } else {
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
      <div className={styles.UserForm}>
        <h1 className="heading">{loginForm.formHeading}</h1>
        <div className="form">
          <Form form={loginForm} formProps={loginFormProps} padForm={false} />
          {error && <Message message={error.message} type="warning" />}
          {/* Invalid Email or Password. If email is correct use forgot password
              to get a new password. */}
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
            <PrimaryLink href="/forgotpassword">Forgot Password?</PrimaryLink>
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

          <div className="bottomText">
            Don't have an account?{" "}
            <PrimaryLink href="/signup">Join free today</PrimaryLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
