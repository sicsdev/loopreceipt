import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";

const signupForm: FormType = {
  formName: "signupForm",
  formHeading: "Create Your Free Account",
  initialState: {
    name: {
      name: "name",
      label: `Name`,
      placeholder: "name*",
      value: "",
      type: "text",
      inputProps: {
        required: true,
      },
    },
    email: {
      name: "email",
      label: `Work Email`,
      placeholder: "email*",
      value: "",
      type: "email",
      inputProps: {
        required: true,
      },
    },
    password: {
      name: "password",
      label: `Password`,
      placeholder: "password*",
      value: "",
      type: "password",
      constraints: [
        "At least one upper case English letter",
        "At least one lower case English letter",
        "At least one digit",
        "At least one special character",
        "Minimum eight in length",
      ],
      showPasswordStrengthBar: true,
      inputProps: {
        minLength: 8,
        pattern:
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      },
    },
  },
};
export default signupForm;
