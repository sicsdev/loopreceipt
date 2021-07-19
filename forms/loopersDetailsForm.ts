import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";

const loopersDetailsForm: FormType = {
  formName: "loopersDetailsForm",
  formHeading: "Add Loopers",
  entity: {
    looperName: {
      name: "looperName",
      label: `Looper's Name`,
      placeholder: "Robert",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
      },
    },
    looperEmail: {
      name: "looperEmail",
      label: `Looper's email address`,
      placeholder: "robert@loopreceipt.com",
      value: "",
      type: "email",
      iconType: "email",
      validate: function () {
        return validations.isRequired(this) && validations.email(this);
      },
    },
  },
  initialState: {
    looperName1: {
      name: "looperName1",
      label: `Looper's Name`,
      placeholder: "Robert",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
      },
    },
    looperEmail1: {
      name: "looperEmail1",
      label: `Looper's email address`,
      placeholder: "robert@loopreceipt.com",
      value: "",
      type: "email",
      iconType: "email",
      validate: function () {
        return validations.isRequired(this) && validations.email(this);
      },
    },
  },
};
export default loopersDetailsForm;
