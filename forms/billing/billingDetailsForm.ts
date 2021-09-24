import { EntityRecipient } from "apiHelpers/types";
import validations from "@helpers/validations";
import _ from "lodash";
import {
  FormStateType,
  FormType,
  useFormReturnType,
} from "@interfaces/FormTypes";
import { SearchItemType } from "@interfaces/SearchItemType";
import {
  setSearchItemName,
  setSearchItems,
  setSearchSpace,
} from "@store/slices/searchBarSlice";
import store from "@store/store";
import usersApi from "@apiClient/usersApi";

const billingDetailsForm: FormType = {
  formName: "billingDetailsForm",
  formHeading: "Add Recipient Details",

  methods: {
    getCompleteAddress: ({ formState }) => {
      let ans = `${formState.shippingAddress.value}, ${formState.state.value},
       ${formState.city.value},
        ${formState.country.value},
          ${formState.zipCode.value}`;
      return ans;
    },
  },
  initialState: {
    // email: {
    //   name: "email",
    //   label: "Email",
    //   placeholder: "Your Email",
    //   value: "",
    //   type: "text",
    //   validate: function () {
    //     return validations.isRequired(this) && validations.email(this);
    //   },
    // },
    address: {
      name: "address",
      label: "Address",
      placeholder: "Address",
      value: "",
      type: "text",
      iconType: "location",
      validate: function () {
        return validations.isRequired(this);
        // validations.minMaxLength({ max: 20 })(this)
        // default validation message is used
      },
    },
    country: {
      name: "country",
      label: "Country",
      placeholder: "Country",
      value: "",
      type: "country",
      inputProps: {
        valueType: "short"
      },
      validate: function () {
        return validations.isRequired(this);
      },
    },
    city: {
      name: "city",
      label: "City",
      placeholder: "City",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
        // we pass 'this' so that we can change the errorText according to
        // the validation that is failing
      },
    },
    state: {
      name: "state",
      label: "State / Province",
      placeholder: "State",
      value: "",
      type: "region",
      dependency: "country",
      inputProps: {
        countryValueType: "short"
      },
      validate: function () {
        return validations.isRequired(this);
      },
    },
    phone: {
      name: "phone",
      label: "Phone / Mobile",
      placeholder: "Phone",
      value: "",
      type: "phone",
      dependency: "country",
      validate: function () {
        return validations.isRequired(this);
        // we pass 'this' so that we can change the errorText according to
        // the validation that is failing
      },
    },
    zipCode: {
      name: "zipCode",
      label: "Zip / Postal Code",
      placeholder: "Code",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
        // we pass 'this' so that we can change the errorText according to
        // the validation that is failing
      },
    },
  },
  addManuallyClicked: function ({
    setFormState,
  }: {
    setFormState: useFormReturnType["setFormState"];
  }) {
    setFormState((prev) => {
      let optionalFieldsAdded = true;
      for (let key in billingDetailsForm.optionalFields) {
        if (!prev[key]) {
          optionalFieldsAdded = false;
          break;
        }
      }
      if (!optionalFieldsAdded) {
        return {
          ...billingDetailsForm.optionalFields,
          ...prev,
        };
      }
      return prev;
    });
  },
};
export default billingDetailsForm;
