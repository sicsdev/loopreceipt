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
      inputProps: {
        required: true,
        pattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-zA-Z]{2,}$",
      },
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
      inputProps: {
        required: true,
      },
      validate: function () {
        return validations.isRequired(this);
      },
    },
  },
};
export default loginForm;
