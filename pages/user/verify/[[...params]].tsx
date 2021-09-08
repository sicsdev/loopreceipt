import usersApi from "@apiClient/usersApi";
import Layout from "@components/Global/Layout";

import { useFetch } from "@hooks/useFetch";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import { commonUserFormStyles } from "../login";
import Button from "@components/Controls/Button";
import PrimaryLink from "@components/Shared/PrimaryLink";
import { useEffect, useRef, useState } from "react";
import MyLoader from "@components/Shared/MyLoader";
import { raiseAlert } from "@store/slices/genericSlice";
import { ErrorResponse } from "@apiHelpers/types";

interface VerifyProps {}
const Verify = ({}: VerifyProps) => {
  const styles = useStyles();
  const router = useRouter();
  const commonStyles = commonUserFormStyles();
  const { params, email } = router.query;
  const getVerifyUserRequestSentRef = useRef(false);
  const [
    initialVerificationCheckComplete,
    setInitialVerificationCheckComplete,
  ] = useState(false);
  const getVerifyUser = useFetch<{
    error: boolean;
    message?: string | undefined;
  }>(usersApi.verifyUser, {
    deferred: true,
  });

  const postSendVerificationLink = useFetch<
    | string
    | {
        error: boolean;
        message: string;
      }
  >(usersApi.sendVerificationLink, {
    deferred: true,
  });
  const postCheckVerificatonStatus = useFetch<{
    error: boolean;
    isVerified: boolean;
  }>(usersApi.checkVerificationStatus, { deferred: true });

  useEffect(() => {
    if (getVerifyUserRequestSentRef.current === true) return;
    // console.log(params);
    // console.log(email);

    if (params) {
      const payload = {
        userid: params[0],
        token: params[1],
      };
      if (payload.userid && payload.token) {
        (async () => {
          const response = await getVerifyUser.sendRequest(payload);
          console.log(response);
          if (response?.error === false) {
            router.push("/user/login");
          } else {
            const response = await postCheckVerificatonStatus.sendRequest(
              email as string
            );

            if (response?.isVerified) {
              console.log("user is already verified");
              router.push("/user/login");
            } else {
              setInitialVerificationCheckComplete(true);
              raiseAlert("Verification failed please retry", "error");
            }
          }
          getVerifyUserRequestSentRef.current = true;
        })();
      } else {
        raiseAlert("Verification failed please retry", "error");
      }
    }
  }, [params]);

  const resendEmail = async () => {
    const response = await postSendVerificationLink.sendRequest({
      email: email,
    });
    if (response && typeof response != "string") {
      const errorResponse = response as ErrorResponse;
      // this is temporary since error status code was not set
      console.log(errorResponse);
      raiseAlert(errorResponse.message, "error");
      // for Account with the given email doesn't exist
    } else {
      raiseAlert("Email Sent! Successfully", "success");
    }
  };
  useEffect(() => {
    if (postSendVerificationLink.error) {
      if (postSendVerificationLink.error.message === "User already verified") {
        raiseAlert("User already verified", "success", {
          type: "success",
          href: "/users/login",
          text: "Please Login",
        });
      } else {
        raiseAlert(postSendVerificationLink.error.message, "error");
      }
    }
  }, [postSendVerificationLink.error]);
  return (
    <Layout>
      {getVerifyUser.loading || !initialVerificationCheckComplete ? (
        <MyLoader windowCentered />
      ) : (
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
            <h1 className="verify-heading">Resend Verification Link</h1>
            <p>The link has expired or invalid link</p>
            <p>To get a new link please click the below button.</p>

            {postSendVerificationLink.loading ? (
              <Button className="verify-email-btn" labelWeight="bold" color="default" labelColor="gray">
                Loading...
              </Button>
            ) : (
              <Button className="verify-email-btn" labelWeight="bold" onClick={resendEmail}>
                Resend Email
              </Button>
            )}
            <div>
              Need help?&nbsp;
              <PrimaryLink
                href="https://www.loopreceipt.com/contact"
                target="_blank"
              >
                Contact Us
              </PrimaryLink>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Verify;
const useStyles = makeStyles((theme) => ({}));
