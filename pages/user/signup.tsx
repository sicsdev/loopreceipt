import { useForm } from "@hooks/useForm";
import Button from "@components/Controls/Button";
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
interface SignupProps {}
const Signup = ({}: SignupProps) => {
  const styles = commonUserFormStyles();
  const signupFormProps = useForm(signupForm.initialState);

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
        const verifyUser = await usersApi.verify({
          email: response.user.email,
        });
        console.log(verifyUser);
        if (verifyUser) {
          alert("Please check your inbox for confirmation email.");
          router.push("/user/login");
        }
      }
    }
  };
  useWindowKeyDownListener({
    Enter: signup,
  });
  return (
    <Layout>
      <div className={styles.UserForm}>
        <h1 className="heading">{signupForm.formHeading}</h1>
        <h4 className="subheading">
          Already have a Loopreceipt account?&nbsp;
          <PrimaryLink href="/login">Sign in</PrimaryLink>
        </h4>
        <div className="form">
          <Form form={signupForm} formProps={signupFormProps} padForm={false} />

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
          <div className="bottomText">
            By clicking &ldquo;Sign Up&rdquo; you agree to&nbsp;
            <PrimaryLink href="/">Loopreceipt Terms</PrimaryLink> and&nbsp;
            <PrimaryLink href="/">Privacy Policy</PrimaryLink>.
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Signup;
