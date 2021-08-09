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
      validate: function () {
        return validations.isRequired(this);
      },
    },
    email: {
      name: "email",
      label: `Work Email`,
      placeholder: "email*",
      value: "",
      type: "email",
      validate: function () {
        return validations.isRequired(this) && validations.email(this);
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
      validate: function () {
        return (
          validations.isRequired(this) &&
          validations.atLeastOneUpperCaseCharacter(this) &&
          validations.atLeastOneLowerCaseCharacter(this) &&
          validations.atLeastOneDigit(this) &&
          validations.atLeastOneSpecialCharacter(this) &&
          validations.minMaxLength({ min: 8 })(this)
        );
      },
    },
  },
};
export default signupForm;
