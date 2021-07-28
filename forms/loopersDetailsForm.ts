import loopsApi from "@apiClient/loopsApi";
import { EntityLooper } from "@apiClient/types";
import { getLastChar } from "@helpers/utils";
import validations from "@helpers/validations";
import {
  FormStateType,
  FormType,
  useFormReturnType,
} from "@interfaces/FormTypes";
import { SearchItemType } from "@interfaces/SearchItemType";
import { setSearchItems } from "@store/slices/searchBarSlice";
import store from "@store/store";

const loopersDetailsForm: FormType = {
  formName: "loopersDetailsForm",
  formHeading: "Add Loopers",

  initialState: {
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
  populateSearchItems: async () => {
    const response = await loopsApi.getAll();
    if (response) {
      const loops = response.loops;
      const searchItems: SearchItemType<EntityLooper>[] = [];
      for (let loop of loops) {
        for (let looper of loop.loopers) {
          searchItems.push({
            primary: looper.name,
            secondary: looper.email,
            entity: looper,
          });
        }
      }
      // console.log(searchItems);
      store.dispatch(setSearchItems({ searchItems }));
    }
  },
  searchItemClicked: function ({
    setFormState,
    entity: looper,
  }: {
    setFormState: useFormReturnType["setFormState"];
    entity: EntityLooper;
  }) {
    if (looper) {
      const modifiedLooper: { [key: string]: string } = {
        looperName: looper.name,
        looperEmail: looper.email,
      };
      const updatedForm: FormStateType = {};
      for (let key in this.initialState) {
        updatedForm[key] = {
          ...this.initialState[key],
          value: modifiedLooper[key],
        };
      }
      setFormState(updatedForm);
    }
  },
};
export default loopersDetailsForm;
