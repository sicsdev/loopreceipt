import { useForm } from "@hooks/useForm";
import { makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import resetPasswordForm from "@forms/user/resetPasswordForm";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import { validateAllFieldsOfForm } from "forms/formUtils";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import Layout from "@components/Global/Layout";
import Message from "@components/Shared/Message";
import { commonUserFormStyles } from "../login";
import { deviceDetect } from "react-device-detect";
import axios from "apiHelpers/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MessageCard from "@components/Shared/MessageCard";
import Image from "next/image";
import { useRef } from "react";
import MyLoader from "@components/Shared/MyLoader";
import dayjs from "dayjs";
// change this
interface ResetPasswordProps {}
const ResetPassword = ({}: ResetPasswordProps) => {
  const router = useRouter();
  const commonStyles = commonUserFormStyles();
  const styles = useStyles();
  const resetPasswordFormProps = useForm(resetPasswordForm.initialState);
  let { token } = router.query;
  token = token?.[0];

  const [invalidLink, setInValidLink] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [waitingForParams, setWaitingForParams] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      // we will wait for param for 3 seconds
      // if param is still not set we are going to declare this link as invalid
      setWaitingForParams(false);
    }, 3000);
  }, []);
  useEffect(() => {
    if (token) {
      setWaitingForParams(false);
    }
  }, [token]);
  useEffect(() => {
    (async () => {
      if (!waitingForParams) {
        if (!token) {
          console.log("exiting due to no token provided");
          setInValidLink(true);
        } else {
          const response = await usersApi.validateResetPasswordToken(
            token as string
          );
          console.log(response);
        }
      }
    })();
  }, [waitingForParams]);
  const { data, loading, sendRequest, requestSent, error } = useFetch<string>(
    usersApi.passwordReset,
    {
      deferred: true,
    }
  );
  const resetPassword = async () => {
    // console.log(resetPasswordFormProps);

    if (validateAllFieldsOfForm(resetPasswordFormProps)) {
      let c = deviceDetect();

      let browser = "";
      let os = "";
      if (c.isMobile) {
        browser = `${c.model} ${c.vendor} ${c.ua}`;
        os = c.os;
      } else {
        browser = c.browserName;
        os = c.osName;
      }
      let location = "";
      try {
        const response = await axios.get("https://extreme-ip-lookup.com/json/");

        location = `${response?.data?.city}, ${response?.data?.region}, ${response?.data?.country}`;
      } catch (err) {
        console.log(err);
      }

      const payload = {
        token: token,
        newPassword: resetPasswordFormProps.formState.newPassword.value,
        confirmPassword: resetPasswordFormProps.formState.confirmPassword.value,
        location: location,
        browser: browser,
        os: os,
        date: dayjs(new Date()).format("MMMM D, YYYY, h:m:s A"),
      };
      console.log(payload);
      const response = await sendRequest(payload);
      console.log(response);
      if (response) {
        setResetPasswordSuccess(true);
      } else {
        // no token case is covered initially
        // this check is for expired link ie. 10 minutes
        // so if the response is not received we declare it as invalid link
        setInValidLink(true);
      }
    }
  };
  useWindowKeyDownListener({
    Enter: resetPassword,
  });
  return waitingForParams ? (
    <MyLoader windowCentered />
  ) : (
    <Layout>
      <div className={commonStyles.UserForm}>
        <div className="form card">
          <div className="iconContainer">
            <Image
              src="/icons/logo-filled.svg"
              height={49}
              width={49}
              alt="logo"
            />
          </div>
          {resetPasswordSuccess ? (
            <>
              <h1 className="heading">Reset Password was successful</h1>

              <Button
                labelWeight="bold"
                onClick={() => {
                  router.push("/user/login");
                }}
              >
                Please Login
              </Button>
            </>
          ) : (
            <>
              <h1 className="heading">{resetPasswordForm.formHeading}</h1>
              {invalidLink ? (
                <MessageCard type="warning">
                  No password reset token found or your password reset link has
                  now expired. To reset your password, submit the&nbsp;
                  <PrimaryLink href="/user/forgotpassword">
                    forgot password
                  </PrimaryLink>
                  &nbsp;form.
                </MessageCard>
              ) : (
                <Form
                  form={resetPasswordForm}
                  formProps={resetPasswordFormProps}
                  padForm={false}
                  validateOnBlur={true}
                  onSubmit={resetPassword}
                >
                  {error && (
                    <Message
                      message={error.message.replace(/[^a-zA-Z0-9 ]/g, "")}
                      type="warning"
                    />
                  )}
                  {loading ? (
                    <Button
                      labelWeight="bold"
                      color="default"
                      labelColor="gray"
                    >
                      Loading...
                    </Button>
                  ) : (
                    <Button labelWeight="bold" type="submit">
                      Reset Password
                    </Button>
                  )}
                </Form>
              )}
            </>
          )}
        </div>
        <div className="bottomLinks">
          <div>
            Already have a loopreceipt account?&nbsp;
            <PrimaryLink href="/user/login">Log in</PrimaryLink>
          </div>
          <div>
            Don&apos;t have an account?&nbsp;
            <PrimaryLink href="/user/signup">Sign up</PrimaryLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ResetPassword;
const useStyles = makeStyles((theme) => ({}));
