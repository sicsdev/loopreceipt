import validations from "@helpers/validations";
import FormState from "@interfaces/FormState";

const recepientDetailsForm: {
  initialState: FormState;
  submit: (formState: FormState) => void;
} = {
  submit: (formState) => {
    console.log(formState);
  },
  initialState: {
    receivingCompanyName: {
      name: "receivingCompanyName",
      label: "Receiving Company Name",
      placeholder: "Your full name",
      value: "",
      type: "text",

      validate: function () {
        return (
          // we can give custom message to validation
          validations.isRequired(
            this,
            "Receiving Company Name can't be empty"
          ) && validations.minMaxLength({ min: 5 })(this)
          // this way we can chain validations
        );
      },
    },

    shippingAddress: {
      name: "shippingAddress",
      label: "Shipping Address",
      placeholder: "Your full name",
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
      placeholder: "Your full name",
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
      placeholder: "Your full name",
      value: "",
      type: "text",
    },
    province: {
      name: "province",
      label: "Province",
      placeholder: "Your full name",
      value: "",
      type: "text",
    },
    zipCode: {
      name: "zipCode",
      label: "Zip Code",
      placeholder: "Your full name",
      value: "",
      type: "number",
    },
  },
};
export default recepientDetailsForm;
