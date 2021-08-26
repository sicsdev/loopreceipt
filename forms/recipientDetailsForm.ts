import loopsApi from "@apiClient/loopsApi";
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

const recipientDetailsForm: FormType = {
  formName: "recipientDetailsForm",
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
  optionalFields: {
    receivingCompanyName: {
      name: "receivingCompanyName",
      label: "Receiving Company Name",
      placeholder: "Receiving Company Name",
      value: "",
      type: "text",

      // validate: function () {
      //   return (
      //     // we can give custom message to validation
      //     validations.isRequired(
      //       this,
      //       "Receiving Company Name can't be empty"
      //     ) && validations.minMaxLength({ min: 5 })(this)
      //     // this way we can chain validations
      //   );
      // },
    },
  },
  initialState: {
    name: {
      name: "name",
      label: "Name",
      placeholder: "Recipient Name",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
      },
    },
    email: {
      name: "email",
      label: "Email",
      placeholder: "Recipient Email",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this) && validations.email(this);
      },
    },
    shippingAddress: {
      name: "shippingAddress",
      label: "Shipping Address",
      placeholder: "Shipping Address",
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
    },
    state: {
      name: "state",
      label: "State / Province",
      placeholder: "State",
      value: "",
      type: "region",
      dependency: "country",
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
    },
  },
  populateSearchItems: async function () {
    const state = store.getState();
    if (state.searchBar.searchItemName !== "recipient") {
      store.dispatch(setSearchItemName("recipient"));
      if (state.loopReceipt.type === "internal") {
        const loggedInUser = state.user.user;
        if (loggedInUser) {
          const email = loggedInUser.email;
          const domainStartIndex = email.indexOf("@") + 1;
          const domain = email.substring(domainStartIndex, email.length);
          if (!domain.includes("gmail")) {
            store.dispatch(
              setSearchSpace("You are searching contacts with " + domain)
            );
          } else {
            store.dispatch(setSearchSpace(""));
          }
        }
      } else {
        // external
        store.dispatch(setSearchSpace(""));
      }
    }
    const response = await loopsApi.getAll();
    if (response) {
      const loops = response.items;
      const newSearchItems: SearchItemType<EntityRecipient>[] = [];
      for (let loop of loops) {
        if (newSearchItems.every((s) => !_.isEqual(s.entity, loop.recipient))) {
          newSearchItems.push({
            primary: loop.recipient.name,
            secondary: loop.recipient.email,
            entity: loop.recipient,
          });
        }
      }
      console.log(newSearchItems);
      store.dispatch(setSearchItems(newSearchItems));
    }
  },
  searchItemClicked: function ({
    setFormState,
    entity: recipient,
  }: {
    setFormState: useFormReturnType["setFormState"];
    entity: EntityRecipient;
  }) {
    if (recipient) {
      const modifiedRecipient: { [key: string]: string } = {
        name: recipient.name,
        email: recipient.email,
        state: recipient.state,
        phone: recipient.phone,
        zipCode: recipient.postalCode,
        shippingAddress: recipient.address,
        city: recipient.city,
        receivingCompanyName: recipient.company,
        country: recipient.country,
      };

      const updatedForm: FormStateType = {};
      for (let key in this.initialState) {
        updatedForm[key] = {
          ...this.initialState[key],
          value: modifiedRecipient[key],
        };
      }
      setFormState(updatedForm);
    }
  },
  addManuallyClicked: function ({
    setFormState,
  }: {
    setFormState: useFormReturnType["setFormState"];
  }) {
    setFormState((prev) => {
      let optionalFieldsAdded = true;
      for (let key in recipientDetailsForm.optionalFields) {
        if (!prev[key]) {
          optionalFieldsAdded = false;
          break;
        }
      }
      if (!optionalFieldsAdded) {
        return {
          ...recipientDetailsForm.optionalFields,
          ...prev,
        };
      }
      return prev;
    });
  },
};
export default recipientDetailsForm;
