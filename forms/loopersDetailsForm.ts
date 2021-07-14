import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";

const loopersDetailsForm: FormType = {
  formName: "loopersDetailsForm",
  formHeading: "Add Loopers",

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
        return validations.isRequired(this);
      },
    },
  },
};
export default loopersDetailsForm;