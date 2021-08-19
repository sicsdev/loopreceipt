import { useForm } from "@hooks/useForm";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import signupForm from "@forms/user/signupForm";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import { validateAllFieldsOfForm } from "forms/formUtils";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import Layout from "@components/Global/Layout";
import { commonUserFormStyles } from "./login";
import { useState } from "react";
import Image from "next/image";
import produce from "immer";
import { useEffect } from "react";
import { raiseAlert } from "@store/slices/genericSlice";
import { useRouter } from "next/router";
interface SignupProps {}
// Account created! sdf
// Email Sent! Successfully
// User already verified. Login here

const Signup = ({}: SignupProps) => {
  const styles = commonUserFormStyles();
  const router = useRouter();
  const signupFormProps = useForm(signupForm.initialState);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [emailAlreadyVerified, setEmailAlreadyVerified] = useState(false);
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
  const postUserVerify = useFetch<string>(usersApi.sendVerificationLink);
  useEffect(() => {
    // console.log(error);
    if (!error) return;
    if (error.message === "User already registered") {
      signupFormProps.setFormState(
        produce((prev) => {
          prev.email.error = "An account already exits with this email";
        })
      );
    }
  }, [error]);

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
        // on signup verification link is sent automatically
        setUserResponse(response.user);
        await sendVerificationEmail(response.user);
        setVerificationEmailSent(true);
        raiseAlert("Account created! " + response.user.name, "success");
      }
    }
  };
  const sendVerificationEmail = async (
    user: {
      isFirstTime: boolean;
      name: string;
      email: string;
    },
    alert = true
  ) => {
    const message = await postUserVerify.sendRequest({ email: user.email });
    console.log(message);
    // u can change the without checking message too
    if (
      message ===
      "An email has been sent to " + signupFormProps.formState.email.value
    ) {
      if (alert) raiseAlert("Email Sent! Successfully", "success");
    }
  };
  useEffect(() => {
    if (postUserVerify.error?.message === "User already verified") {
      raiseAlert("User already verified.", "success", {
        href: "/user/login",
        text: "Login here",
        type: "success",
      });
      setEmailAlreadyVerified(true);
    }
  }, [postUserVerify.error]);
  useWindowKeyDownListener({
    Enter: signup,
  });
  return (
    <Layout>
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
                onSubmit={signup}
              >
                {loading ? (
                  <Button labelWeight="bold" color="default" labelColor="gray">
                    Loading...
                  </Button>
                ) : (
                  <Button labelWeight="bold" type="submit">
                    Sign Up
                  </Button>
                )}
              </Form>
            </div>
            <div className="bottomLinks">
              <div style={{ margin: "auto" }}>
                By clicking &ldquo;Sign Up&rdquo; you agree to&nbsp;
                <PrimaryLink
                  href="https://www.loopreceipt.com/terms-of-service"
                  isTargetBlankLink
                >
                  Loopreceipt Terms
                </PrimaryLink>
                and&nbsp;
                <PrimaryLink
                  href="https://www.loopreceipt.com/privacy-policy"
                  isTargetBlankLink
                >
                  Privacy Policy
                </PrimaryLink>
                .
              </div>
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
            {!emailAlreadyVerified ? (
              <>
                <h1 className="heading">Please verify your email</h1>
                <p>
                  You’re almost there! We sent an email to&nbsp;
                  <span style={{ fontWeight: 500 }}>{userResponse?.email}</span>
                </p>
                <p>
                  Just click on the link in the email to complete your signup.
                </p>
                {postUserVerify.loading ? (
                  <Button labelWeight="bold" color="default" labelColor="gray">
                    Loading...
                  </Button>
                ) : (
                  <Button
                    labelWeight="bold"
                    onClick={() => {
                      if (userResponse) sendVerificationEmail(userResponse);
                    }}
                  >
                    Resend Email
                  </Button>
                )}
              </>
            ) : (
              <>
                <h1 className="heading">Your Email is verified please login</h1>
                <Button
                  onClick={() => {
                    router.push("/user/login");
                  }}
                >
                  Login
                </Button>
              </>
            )}

            <div>
              Need help? <PrimaryLink href="/">Contact Us</PrimaryLink>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Signup;
