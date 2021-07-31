import { useForm } from "@hooks/useForm";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import signupForm from "forms/signupForm";
import { loginStyles } from "./login";
import PasswordStrengthBar from "@components/Controls/PasswordStrengthBar";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import Link from "next/link";
import { validateAllFieldsOfForm } from "forms/formUtils";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import router from "next/router";
import Layout from "@components/Global/Layout";
interface SignupProps {}
const Signup = ({}: SignupProps) => {
  const styles = loginStyles();
  const signupFormProps = useForm(signupForm.initialState);

  const {
    data,
    loading,
    sendRequest: sendSignupRequest,
    requestSent,
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
          router.push("/login");
        }
      }
    }
  };
  useWindowKeyDownListener({
    Enter: signup,
  });
  return (
    <Layout>
      <div className={styles.Login}>
        <h1 className="heading">{signupForm.formHeading}</h1>
        <h4 className="subheading">
          Already have a Loopreceipt account?{" "}
          <Link href="/login">
            <a>
              <PrimaryLink>Sign in</PrimaryLink>
            </a>
          </Link>
        </h4>
        <div className="form">
          <Form form={signupForm} formProps={signupFormProps} padForm={false} />
          <PasswordStrengthBar
            password={signupFormProps.formState.password.value}
          />
          {loading ? (
            <Button labelWeight="bold" color="default" labelColor="gray">
              Loading...
            </Button>
          ) : (
            <Button labelWeight="bold" onClick={signup}>
              Sign Up
            </Button>
          )}
          <div className="noAccount">
            By clicking “Sign Up” you agree to{" "}
            <PrimaryLink>Loopreceipt Terms</PrimaryLink> and{" "}
            <PrimaryLink>Privacy Policy</PrimaryLink>.
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Signup;
