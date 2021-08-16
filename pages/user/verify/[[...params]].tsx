import usersApi from "@apiClient/usersApi";
import Layout from "@components/Global/Layout";
import { useFetch } from "@hooks/useFetch";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import { commonUserFormStyles } from "../login";
import Button from "@components/Controls/Button";
import PrimaryLink from "@components/Shared/PrimaryLink";
import { useEffect, useState } from "react";
interface VerifyProps {}
const Verify = ({}: VerifyProps) => {
  const styles = useStyles();
  const router = useRouter();
  const commonStyles = commonUserFormStyles();

  const { params, email } = router.query;
  console.log(params);

  // console.log(userid);
  // console.log(token);
  // console.log(email);
  const getVerifyUser = useFetch<{
    error: boolean;
    message?: string | undefined;
  }>(() =>
    usersApi.verifyUser({
      userid: params?.[0] ?? "",
      token: params?.[1] ?? "",
    })
  );
  const postSendVerificationLink = useFetch<string>(
    usersApi.sendVerificationLink,
    {
      deferred: true,
    }
  );

  useEffect(() => {
    console.log(getVerifyUser.data);
    console.log(postSendVerificationLink.data);
  }, [getVerifyUser, postSendVerificationLink]);

  return (
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
        <h1 className="heading">Resend Verification Link</h1>
        <p>The link has expired or invalid link</p>
        <p>To get a new link please click the below button.</p>

        <a href="http://localhost:3000/user/verify/611accd2cdcdb00016d4d66b/c855874a14a7065a85c4551d3a5d37637953eab1640109c52f890510facd01be?email=daworeg855%40hax55.com">
          link
        </a>
        <Button
          labelWeight="bold"
          onClick={() => {
            console.log(email);
            // postSendVerificationLink.sendRequest({ email: email });
          }}
        >
          Resend Email
        </Button>
        <div>
          Need help?&nbsp;
          <PrimaryLink href="/">Contact Us</PrimaryLink>
        </div>
      </div>
    </div>
  );
};
export default Verify;
const useStyles = makeStyles((theme) => ({}));
