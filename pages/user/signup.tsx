import { useForm } from "@hooks/useForm";
import Button from "@components/Controls/Button";
import Alert from "@material-ui/lab/Alert";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import signupForm from "@forms/user/signupForm";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import { validateAllFieldsOfForm } from "forms/formUtils";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import router from "next/router";
import Layout from "@components/Global/Layout";
import Message from "@components/Shared/Message";
import { commonUserFormStyles } from "./login";
import { useState } from "react";
import Image from "next/image";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import { useEffect } from "react";
interface SignupProps {}
// Account created! sdf
// Email Sent! Successfully
// User already verified. Login here

const Signup = ({}: SignupProps) => {
  const styles = commonUserFormStyles();
  const signupFormProps = useForm(signupForm.initialState);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>("");
  const [showAlert, setShowAlert] = useState(false);
  const [userResponse, setUserResponse] = useState<{
    isFirstTime: boolean;
    name: string;
    email: string;
  }>();
  const {
    data,
    loading,
    sendRequest: sendSignupRequest,
    requestSent,
    error,
  } = useFetch<{
    user: {
      isFirstTime: boolean;
      name: string;
      email: string;
    };
  }>(usersApi.create, {
    deferred: true,
  });
  const postUsersVerify = useFetch<string>(usersApi.verify);
  const signup = async () => {
    console.log(signupFormProps);
    if (validateAllFieldsOfForm(signupFormProps)) {
      const response = await sendSignupRequest({
        name: signupFormProps.formState.name.value,
        email: signupFormProps.formState.email.value,
        password: signupFormProps.formState.password.value,
      });
      console.log(response);
      if (response) {
        // after signup user must verify his email in order to login
        // so verification mail is sent immediately on signup
        // user can login only on successful verification of email
        setUserResponse(response.user);
        setAlertMessage("Account created! " + response.user.name);
        setShowAlert(true);
        sendVerificationEmail(response.user.email, false);
      }
    }
  };
  const sendVerificationEmail = async (
    email: string,
    alert: boolean = true
  ) => {
    const message = await postUsersVerify.sendRequest({ email });
    console.log(message);
    // u can change the without checking message too
    if (
      message ===
      "An email has been sent to " + signupFormProps.formState.email.value
    ) {
      setVerificationEmailSent(true);
      if (alert) {
        setAlertMessage("Email Sent! Successfully");
        setShowAlert(true);
      }
    }
  };
  useEffect(() => {
    if (postUsersVerify.error?.message === "User already verified") {
      setAlertMessage(
        <span>
          User already verified.&nbsp;
          <PrimaryLink href="/user/login">Login here</PrimaryLink>
        </span>
      );
      setShowAlert(true);
    }
  }, [postUsersVerify.error]);
  useWindowKeyDownListener({
    Enter: signup,
  });
  return (
    <Layout>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(e, reason) => {
          // reason 'timeout' | 'clickaway';
          setShowAlert(false);
        }}
        // TransitionComponent={Fade}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={() => {
            setShowAlert(false);
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <div className={styles.UserForm}>
        {!verificationEmailSent ? (
          <>
            <div className="form">
              <h1 className="heading">{signupForm.formHeading}</h1>
              <h4 className="subheading">
                Already have a Loopreceipt account?&nbsp;
                <PrimaryLink href="/user/login">Sign in</PrimaryLink>
              </h4>
              <Form
                form={signupForm}
                formProps={signupFormProps}
                padForm={false}
              />

              {error && <Message message={error.message} type="warning" />}
              {loading ? (
                <Button labelWeight="bold" color="default" labelColor="gray">
                  Loading...
                </Button>
              ) : (
                <Button labelWeight="bold" onClick={signup}>
                  Sign Up
                </Button>
              )}
            </div>
            <div className="bottomLinks">
              <p>
                By clicking &ldquo;Sign Up&rdquo; you agree to&nbsp;
                <PrimaryLink href="/">Loopreceipt Terms</PrimaryLink> and&nbsp;
                <PrimaryLink href="/">Privacy Policy</PrimaryLink>.
              </p>
            </div>
          </>
        ) : (
          <div className="form card">
            <div className="iconContainer">
              <Image
                src="/icons/logo-filled.svg"
                height={49}
                width={49}
                alt="logo"
              />
            </div>
            <h1 className="heading">Please verify your email</h1>
            <p>
              You’re almost there! We sent an email to&nbsp;
              <span style={{ fontWeight: 500 }}>{userResponse?.email}</span>
            </p>
            <p>Just click on the link in the email to complete your signup.</p>
            {postUsersVerify.loading ? (
              <Button labelWeight="bold" color="default" labelColor="gray">
                Loading...
              </Button>
            ) : (
              <Button
                labelWeight="bold"
                onClick={() => {
                  if (userResponse) sendVerificationEmail(userResponse.email);
                }}
              >
                Resend Email
              </Button>
            )}

            <p>
              Need help? <PrimaryLink href="/">Contact Us</PrimaryLink>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Signup;
