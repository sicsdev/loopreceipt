import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";

const companyDetailsForm: FormType = {
  formName: "companyDetailsForm",
  formHeading: "Add Company Details",

  initialState: {
    // note key and object name must be same
    shippingAddress: {
      name: "shippingAddress",
      label: "Shipping Address",
      placeholder: "2 Capistro Street",
      value: "",
      type: "text",

      // validate: function () {
      //   return validations.minMaxLength({ max: 5 })(this);
      //   // default validation message is used
      // },
    },
    country: {
      name: "country",
      label: "Country",
      placeholder: "Country",
      value: "",
      type: "country",

      validate: function () {
        return validations.isRequired(this);
      },
    },
    city: {
      name: "city",
      label: "City",
      placeholder: "Brampton",
      value: "",
      type: "text",
    },
    province: {
      name: "province",
      label: "State / Province",
      placeholder: "Province",
      value: "",
      type: "region",
      dependency: "country",
      validate: function () {
        return validations.isRequired(this);
      },
    },
    zipCode: {
      name: "zipCode",
      label: "Zip Code",
      placeholder: "L7A 3J3",
      value: "",
      type: "number",
    },
  },
};
export default companyDetailsForm;
