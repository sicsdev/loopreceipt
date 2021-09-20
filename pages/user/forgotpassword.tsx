import { useForm } from "@hooks/useForm";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import forgotPasswordForm from "@forms/user/forgotPasswordForm";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import { validateAllFieldsOfForm } from "@forms/formUtils";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import Layout from "@components/Global/Layout";
import { commonUserFormStyles } from "./login";
import MessageCard from "@components/Shared/MessageCard";
import Image from "next/image";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
interface ForgotPasswordProps {}
const ForgotPassword = ({}: ForgotPasswordProps) => {
  const commonStyles = commonUserFormStyles();
  const styles = useStyles();
  const forgotPasswordFormProps = useForm(forgotPasswordForm.initialState);
  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false);
  const { data, loading, sendRequest, requestSent, error } = useFetch<string>(
    usersApi.forgot,
    {
      deferred: true,
    }
  );
  const sendEmailLink = async () => {
    // console.log(resetPasswordFormProps);
    if (validateAllFieldsOfForm(forgotPasswordFormProps)) {
      const response = await sendRequest({
        email: forgotPasswordFormProps.formState.email.value,
      });
      // console.log(response);
      if (response) {
        console.log(response);
        setEmailSentSuccessfully(true);
      }
    }
  };
  useWindowKeyDownListener({
    Enter: sendEmailLink,
  });
  return (
    <Layout>
      <div className={commonStyles.UserForm}>
        <div className="form card forgot-pass">
          <div className="iconContainer">
            <Image
              src="/icons/logo-filled.svg"
              height={49}
              width={49}
              alt="logo"
            />
          </div>
          <h1 className="heading">{forgotPasswordForm.formHeading}</h1>
          {error && (
            <MessageCard type="warning">
              There is no user with that email address.
              <br />
              Do you want to&nbsp;
              <PrimaryLink href="/user/signup">sign up</PrimaryLink>
              &nbsp; instead?
            </MessageCard>
          )}
          {emailSentSuccessfully ? (
            <div className={styles.emailSentMessage}>
              <p className="head">Check your email</p>
              <p className="text1">
                We&apos;ve just sent you an email containing a temporary link
                that will allow you to reset your password. Please check your
                spam folder if the email doesn&apos;t appear within a few
                minutes.
              </p>
              <div className="text2">
                If there are any issues&nbsp;
                <PrimaryLink href="mailto: recovery@loopreceipt.com">
                  email us
                </PrimaryLink>
                , and we&apos;ll help fix it!
              </div>
            </div>
          ) : (
            <Form
              form={forgotPasswordForm}
              formProps={forgotPasswordFormProps}
              padForm={false}
              onSubmit={sendEmailLink}
            >
              {loading ? (
                <Button labelWeight="bold" color="default" labelColor="gray">
                  Loading...
                </Button>
              ) : (
                <Button labelWeight="bold" type="submit">
                  Send Reset Email
                </Button>
              )}
            </Form>
          )}
        </div>
        <div className="bottomLinks">
          <div>
            Already have an account?&nbsp;
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
export default ForgotPassword;
const useStyles = makeStyles((theme) => ({
  emailSentMessage: {
    textAlign: "center",
    "& .head": {
      color: theme.palette.secondary.main,
      fontWeight: 500,
      fontSize: 24,
    },
    "& .text1": {
      marginTop: "1rem",
      fontSize: 18,
    },
    "& .text2": {
      fontSize: 18,
    },
  },
}));
