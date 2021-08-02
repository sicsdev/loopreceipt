import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";

const loginForm: FormType = {
  formName: "loginForm",
  formHeading: "Login to Your Account",
  initialState: {
    email: {
      name: "email",
      label: `Enter your email address`,
      placeholder: "email*",
      value: "",
      type: "email",
      validate: function () {
        return validations.isRequired(this) && validations.email(this);
      },
    },
    password: {
      name: "password",
      label: `Enter your password`,
      placeholder: "password*",
      value: "",
      type: "password",
      validate: function () {
        return validations.isRequired(this);
      },
    },
  },
};
export default loginForm;
