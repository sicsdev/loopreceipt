import validations from "@helpers/validations";
import FormState from "@interfaces/FormState";

const companyDetailsForm: {
  initialState: FormState;
  submit: (formState: FormState) => void;
} = {
  submit: (formState) => {
    console.log(formState);
  },
  initialState: {
    shippingAddress: {
      name: "shippingAddress",
      label: "Shipping Address",
      placeholder: "2 Capistro Street",
      value: "",
      type: "text",

      validate: function () {
        return validations.minMaxLength({ max: 5 })(this);
        // default validation message is used
      },
    },
    country: {
      name: "country",
      label: "Country",
      placeholder: "Canada",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
        // we pass 'this' so that we can change the errorText according to
        // the validation that is failing
      },
      errorText: "custom error",
      customError: true,
      // now custom error message is given to field
      // this message will override all the validation messages
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
      label: "Province",
      placeholder: "Please",
      value: "",
      type: "text",
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
