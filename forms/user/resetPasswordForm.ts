import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";
import signupForm from "./signupForm";

const resetPasswordForm: FormType = {
  formName: "resetPasswordForm",
  formHeading: "Reset Your Password",
  initialState: {
    newPassword: {
      ...signupForm.initialState.password,
      name: "newPassword",
      label: `New Password *`,
      placeholder: "New Password *",
    },
    confirmPassword: {
      name: "confirmPassword",
      label: `Confirm Password *`,
      placeholder: "Confirm Password *",
      value: "",
      type: "password",
      strictlyMatchDependency: "newPassword",
      validate: function (props) {
        return validations.mustMatch({
          value: props?.dependencyValue ?? "",
        })(this, "Passwords should match");
      },
    },
  },
};
export default resetPasswordForm;
