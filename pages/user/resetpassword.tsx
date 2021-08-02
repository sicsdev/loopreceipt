import { useForm } from "@hooks/useForm";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import resetPasswordForm from "@forms/auth/resetPasswordForm";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import { validateAllFieldsOfForm } from "forms/formUtils";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import Layout from "@components/Global/Layout";
import Message from "@components/Shared/Message";
import Cookies from "js-cookie";
import commonUserFormStyles from "./commonUserFormStyles";
interface ResetPasswordProps {}
const ResetPassword = ({}: ResetPasswordProps) => {
  const styles = commonUserFormStyles();
  const resetPasswordFormProps = useForm(resetPasswordForm.initialState);

  const { data, loading, sendRequest, requestSent, error } = useFetch<string>(
    usersApi.passwordReset,
    {
      deferred: true,
    }
  );
  const resetPassword = async () => {
    // console.log(resetPasswordFormProps);
    if (validateAllFieldsOfForm(resetPasswordFormProps)) {
      const response = await sendRequest({
        token: Cookies.get("token") ?? "",
        newPassword: resetPasswordFormProps.formState.newPassword.value,
        confirmPassword: resetPasswordFormProps.formState.confirmPassword.value,
        location: "Cupertino, United States",
        browser: "Safari",
        os: "Mac",
      });
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
          <Form
            form={resetPasswordForm}
            formProps={resetPasswordFormProps}
            padForm={false}
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

          <div className="bottomText">
            Already have a loopreceipt account?{" "}
            <PrimaryLink href="/login">Log in</PrimaryLink>
          </div>
          <div className="bottomText">
            Don't have an account?{" "}
            <PrimaryLink href="/signup">Sign up</PrimaryLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ResetPassword;
