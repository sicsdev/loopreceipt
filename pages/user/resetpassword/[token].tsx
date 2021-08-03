import { useForm } from "@hooks/useForm";
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
interface ResetPasswordProps {}
const ResetPassword = ({}: ResetPasswordProps) => {
  const router = useRouter();
  const styles = commonUserFormStyles();
  const resetPasswordFormProps = useForm(resetPasswordForm.initialState);
  const { token } = router.query;
  console.log(token);
  const [browser, setBrowser] = useState("");
  const [osName, setOsName] = useState("");
  const [location, setLocation] = useState("");
  const [invalidLink, setInValidLink] = useState(true);
  const fetchDeviceAndLocationDetails = () => {
    let c = deviceDetect();
    if (c.isMobile) {
      setBrowser(`${c.model} ${c.vendor} ${c.ua}`);
      setOsName(c.os);
    } else {
      setBrowser(c.browserName);
      setOsName(c.osName);
    }
    axios
      .get("https://extreme-ip-lookup.com/json/")
      .then((response) => {
        if (response.data) {
          setLocation(
            `${response?.data?.city}, ${response?.data?.region}, ${response?.data?.country}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (token && invalidLink) {
      setInValidLink(false);
      fetchDeviceAndLocationDetails();
    }
  }, [token]);
  const { data, loading, sendRequest, requestSent, error } = useFetch<string>(
    usersApi.passwordReset,
    {
      deferred: true,
    }
  );
  const resetPassword = async () => {
    // console.log(resetPasswordFormProps);
    if (validateAllFieldsOfForm(resetPasswordFormProps)) {
      const payload = {
        token: token,
        newPassword: resetPasswordFormProps.formState.newPassword.value,
        confirmPassword: resetPasswordFormProps.formState.confirmPassword.value,
        location: location,
        browser: browser,
        os: osName,
      };
      console.log(payload);
      const response = await sendRequest(payload);
      console.log(response);
    }
  };
  useWindowKeyDownListener({
    Enter: resetPassword,
  });
  return (
    <Layout>
      <div className={styles.UserForm}>
        <h1 className="heading">{resetPasswordForm.formHeading}</h1>

        <div className="form">
          {invalidLink ? (
            <Message
              type="warning"
              message={
                <span>
                  No password reset token found or your password reset link has
                  now expired. To reset your password, submit the&nbsp;
                  <PrimaryLink href="/user/forgotpassword">
                    forgot password
                  </PrimaryLink>
                  &nbsp;form.
                </span>
              }
            />
          ) : (
            <>
              <Form
                form={resetPasswordForm}
                formProps={resetPasswordFormProps}
                padForm={false}
                validateOnBlur={true}
              />

              {error && <Message message={error.message} type="warning" />}
              {loading ? (
                <Button labelWeight="bold" color="default" labelColor="gray">
                  Loading...
                </Button>
              ) : (
                <Button labelWeight="bold" onClick={resetPassword}>
                  Reset Password
                </Button>
              )}
            </>
          )}
          <div className="bottomText">
            Already have a loopreceipt account?&nbsp;
            <PrimaryLink href="/user/login">Log in</PrimaryLink>
          </div>
          <div className="bottomText">
            Don&apos;t have an account?&nbsp;
            <PrimaryLink href="/user/signup">Sign up</PrimaryLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ResetPassword;
