import validations from "@helpers/validations";
import {
  FormType
} from "@interfaces/FormTypes";
import store from "@store/store";

const ProfileFormDetails: FormType = {
  formName: "profileForm",
  formHeading: "Profile",

  methods: {
    getCompleteAddress: ({ formState }) => {
      let ans = `${formState.province.value},
       ${formState.city.value},
        ${formState.country.value},
         ${formState.city.value},
          ${formState.zipCode.value}`;
      return ans;
    },
  },
  initialState: {
    name: {
      name: "name",
      label: "Name",
      placeholder: "Your full name",
      value: "",
      type: "text",
      validate: function () {
        return (
          validations.isRequired(this)
        );
        // default validation message is used
      },
    },
    email: {
      name: "email",
      label: "Email",
      placeholder: "Your email address",
      value: "",
      type: "email",

      validate: function () {
        return validations.isRequired(this);
        // we pass 'this' so that we can change the errorText according to
        // the validation that is failing
      },
      // errorText: "custom error",
      // customError: true,
      // now custom error message is given to field
      // this message will override all the validation messages
    },
    country: {
      name: "country",
      label: "Country",
      placeholder: "Country",
      value: "",
      type: "country",

      validate: function () {
        return validations.isRequired(this);
        // we pass 'this' so that we can change the errorText according to
        // the validation that is failing
      },
      // errorText: "custom error",
      // customError: true,
      // now custom error message is given to field
      // this message will override all the validation messages
    },
    city: {
      name: "city",
      label: "City",
      placeholder: "City",
      value: "",
      type: "text",
    },
    province: {
      name: "province",
      label: "State / Province",
      placeholder: "State / Province",
      value: "",
      type: "region",
      dependency: "country",
      validate: function () {
        return validations.isRequired(this);
        // we pass 'this' so that we can change the errorText according to
        // the validation that is failing
      },
    },
    address: {
      name: "address",
      label: "Address",
      placeholder: "Your address",
      value: "",
      type: "text",
      validate: function () {
        return (
          validations.isRequired(this) 
          // validations.minMaxLength({ max: 20 })(this)
        );
        // default validation message is used
      },
    },
  },
};
export default ProfileFormDetails;
