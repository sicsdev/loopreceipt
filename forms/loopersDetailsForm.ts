import { EntityLooper } from "@apiClient/types";
import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";

const loopersDetailsForm: FormType = {
  formName: "loopersDetailsForm",
  formHeading: "Add Loopers",
  methods: {
    getLoopers: ({ formState }) => {
      const loopers: EntityLooper[] = [];
      const loppersStateKeys = Object.keys(formState);
      for (let i = 0; i < loppersStateKeys.length; i += 2) {
        const name = formState[loppersStateKeys[i]].value;
        const email = formState[loppersStateKeys[i + 1]].value;
        if (name && email) {
          loopers.push({
            name,
            email,
          });
        }
      }
      return loopers;
    },
  },
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
