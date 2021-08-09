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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
// change this
interface ResetPasswordProps {}
const ResetPassword = ({}: ResetPasswordProps) => {
  const router = useRouter();
  const commonStyles = commonUserFormStyles();
  const styles = useStyles();
  const resetPasswordFormProps = useForm(resetPasswordForm.initialState);
  let { token } = router.query;
  token = token?.[0];
  console.log(token);
  const [browser, setBrowser] = useState("");
  const [osName, setOsName] = useState("");
  const [location, setLocation] = useState("");
  const [alertMessage, setAlertMessage] = useState<any>("");
  const [showAlert, setShowAlert] = useState(false);
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
      if (response) {
        setAlertMessage(
          <span>
            Reset Password successful.&nbsp;
            <PrimaryLink href="/user/login">Login now</PrimaryLink>
          </span>
        );
        setShowAlert(true);
      }
    }
  };
  useWindowKeyDownListener({
    Enter: resetPassword,
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
          <h1 className="heading">{resetPasswordForm.formHeading}</h1>
          {invalidLink ? (
            <MessageCard type="warning">
              No password reset token found or your password reset link has now
              expired. To reset your password, submit the&nbsp;
              <PrimaryLink href="/user/forgotpassword">
                forgot password
              </PrimaryLink>
              &nbsp;form.
            </MessageCard>
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
        </div>
        <div className="bottomLinks">
          <p>
            Already have a loopreceipt account?&nbsp;
            <PrimaryLink href="/user/login">Log in</PrimaryLink>
          </p>
          <p>
            Don&apos;t have an account?&nbsp;
            <PrimaryLink href="/user/signup">Sign up</PrimaryLink>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default ResetPassword;
const useStyles = makeStyles((theme) => ({}));
