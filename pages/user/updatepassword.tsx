import { useForm } from "@hooks/useForm";
import Button from "@components/Controls/Button";
import Form from "@components/Create/Form";
import PrimaryLink from "@components/Shared/PrimaryLink";
import updatePasswordForm from "@forms/user/updatePasswordForm";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import { validateAllFieldsOfForm } from "forms/formUtils";
import { useWindowKeyDownListener } from "@hooks/useWindowKeyDownListener";
import Layout from "@components/Global/Layout";
import Message from "@components/Shared/Message";
import { commonUserFormStyles } from "./login";
import router from "next/router";
interface UpdatePasswordProps {}
const UpdatePassword = ({}: UpdatePasswordProps) => {
  const styles = commonUserFormStyles();
  const updatePasswordFormProps = useForm(updatePasswordForm.initialState);

  const { data, loading, sendRequest, requestSent, error } = useFetch<{
    error: boolean;
    message: string;
  }>(usersApi.passwordUpdate, {
    deferred: true,
  });
  const updatePassword = async () => {
    // console.log(updatePasswordFormProps);
    if (validateAllFieldsOfForm(updatePasswordFormProps)) {
      const response = await sendRequest({
        currentPassword:
          updatePasswordFormProps.formState.currentPassword.value,
        newPassword: updatePasswordFormProps.formState.newPassword.value,
        confirmPassword:
          updatePasswordFormProps.formState.confirmPassword.value,
      });
      console.log(response);
      if (response && !response.error) {
        alert(response.message);
      }
    }
  };
  useWindowKeyDownListener({
    Enter: updatePassword,
  });
  return (
    <Layout>
      <div className={styles.UserForm}>
        <div className="form">
          <h1 className="heading">{updatePasswordForm.formHeading}</h1>
          <Form
            form={updatePasswordForm}
            formProps={updatePasswordFormProps}
            padForm={false}
          />

          {error && <Message message={error.message} type="warning" />}
          {loading ? (
            <Button labelWeight="bold" color="default" labelColor="gray">
              Loading...
            </Button>
          ) : (
            <Button labelWeight="bold" onClick={updatePassword}>
              Update Password
            </Button>
          )}
        </div>
        <div className="bottomLinks">
          <p>
            Cancel update go to dashboard?&nbsp;
            <PrimaryLink href="/dashboard">Dashboard</PrimaryLink>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default UpdatePassword;
