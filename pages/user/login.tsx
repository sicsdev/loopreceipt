import authApi from "@apiClient/authApi";
import Button from "@components/Controls/Button";
import { makeStyles } from "@material-ui/core";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import { useFetch, deferrer } from "@hooks/useFetch";
import { useForm } from "@hooks/useForm";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import { Radio } from "@material-ui/core";
import { validateAllFieldsOfForm } from "@forms/formUtils";
import loginForm from "@forms/user/loginForm";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@components/Global/Layout";
import Message from "@components/Shared/Message";
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
      email: loginFormProps.formState.email.value.toLowerCase(),
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
        if (response.isFirstTime) {
          router.push("/selectindustry");
        } else {
          router.push("/dashboard");
        }
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
        <div className="form">
          <h1 className="heading">{loginForm.formHeading}</h1>
          <Form
            form={loginForm}
            formProps={loginFormProps}
            padForm={false}
            onSubmit={login}
          >
            {error ? (
              error.message.toLowerCase().includes("invalid") ? (
                <Message
                  message={
                    "Invalid Email or password. If email is correct please use forgot password to get a new password"
                  }
                  type="warning"
                />
              ) : (
                <Message message={error.message} type="warning" />
              )
            ) : null}
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
              <PrimaryLink href="/user/forgotpassword">
                Forgot Password?
              </PrimaryLink>
            </div>
            {loading ? (
              <Button labelWeight="bold" color="default" labelColor="gray">
                Loading...
              </Button>
            ) : (
              <Button labelWeight="bold" type="submit">
                Log In
              </Button>
            )}
          </Form>
        </div>
        <div className="bottomLinks">
          <div style={{ margin: "auto" }}>
            {/* // if there is only one link please do margin: 'auto' to center it */}
            Don&apos;t have an account?&nbsp;
            <PrimaryLink href="/user/signup">Join free today</PrimaryLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
export const commonUserFormStyles = makeStyles((theme) => ({
  UserForm: {
    // border: "1px solid red",
    padding: "3rem 25px",

    "& .form": {
      maxWidth: 600,
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      "&.card": {
        background: "#FFFFFF",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        padding: "2rem",
        [theme.breakpoints.down("sm")]: {
          padding: "2rem",
        },
        "&.forgot-pass": {
          marginTop: "3rem"
        }
      },
      "& .iconContainer": {},
      "& .heading": {
        fontWeight: 500,
        fontSize: 28,
        color: theme.palette.secondary.main,
        marginBottom: "4rem",
        marginTop: "20px",
        [theme.breakpoints.down("xs")]: {
          fontSize: 28,
        },
      },
      "& .verify-heading": {
        fontWeight: 500,
        fontSize: 28,
        color: theme.palette.secondary.main,
        marginBottom: "0rem",
        marginTop: "20px",
        [theme.breakpoints.down("xs")]: {
          fontSize: 28,
        },
      },
      "& .verify-email-btn": {
        marginTop: "2rem",
        marginBottom: "1rem"
      },
      "& .forgot-pass-head": {
        marginBottom: ".5rem",
        fontWeight: 500,
        fontSize: 28,
        color: theme.palette.secondary.main,
        marginTop: "20px",
        [theme.breakpoints.down("xs")]: {
          fontSize: 28,
        },
      },
      "& .subheading": {
        fontSize: 18,
        marginTop: "-4rem",
        marginBottom: "2rem"
      },
      "& .MyInputContainer": {
        width: "100%",
      },
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
    },
    "& .bottomLinks": {
      margin: "auto",
      marginTop: "1rem",
      maxWidth: 600,
      display: "flex",
      justifyContent: "space-between",
      gap: 10,
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      "& > div": {
        textAlign: "center",
      },
    },
  },
}));
