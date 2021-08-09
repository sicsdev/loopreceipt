import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";
import signupForm from "./signupForm";

const updatePasswordForm: FormType = {
  formName: "updatePasswordForm",
  formHeading: "Reset Your Password",
  initialState: {
    currentPassword: {
      name: "currentPassword",
      label: `Current Password *`,
      placeholder: "Current Password *",
      value: "",
      type: "password",
      validate: function () {
        return validations.isRequired(this);
      },
    },
    newPassword: {
      name: "newPassword",
      label: `New Password *`,
      placeholder: "New Password *",
      value: "",
      type: "password",
      constraints: signupForm.initialState.password.constraints,
      validate: signupForm.initialState.password.validate,
      showPasswordStrengthBar: true,
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
        })(this);
      },
    },
  },
};
export default updatePasswordForm;
