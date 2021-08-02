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
import Message from "@components/Shared/Message";
import { commonUserFormStyles } from "./login";
interface ForgotPasswordProps {}
const ForgotPassword = ({}: ForgotPasswordProps) => {
  const styles = commonUserFormStyles();
  const forgotPasswordFormProps = useForm(forgotPasswordForm.initialState);

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
      console.log(response);
    }
  };
  useWindowKeyDownListener({
    Enter: sendEmailLink,
  });
  return (
    <Layout>
      <div className={styles.UserForm}>
        <h1 className="heading">{forgotPasswordForm.formHeading}</h1>
        <div className="form">
          <Form
            form={forgotPasswordForm}
            formProps={forgotPasswordFormProps}
            padForm={false}
          />
          {error && <Message message={error.message} type="warning" />}
          {loading ? (
            <Button labelWeight="bold" color="default" labelColor="gray">
              Loading...
            </Button>
          ) : (
            <Button labelWeight="bold" onClick={sendEmailLink}>
              Send Reset Email
            </Button>
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
export default ForgotPassword;
