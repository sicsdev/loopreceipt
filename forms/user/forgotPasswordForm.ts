import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";

const forgotPasswordForm: FormType = {
  formName: "forgotPasswordForm",
  formHeading: "Reset Your Password",
  initialState: {
    email: {
      name: "email",
      label: `Email Address`,
      placeholder: "email*",
      value: "",
      type: "email",
      inputProps: {
        required: true,
      },
    },
  },
};
export default forgotPasswordForm;
