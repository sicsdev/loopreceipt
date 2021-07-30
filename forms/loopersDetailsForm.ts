import loopsApi from "@apiClient/loopsApi";
import { EntityLooper } from "apiHelpers/types";
import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";
import { SearchItemType } from "@interfaces/SearchItemType";
import { confirmLooper, setSearchItems } from "@store/slices/searchBarSlice";
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
      store.dispatch(setSearchItems(searchItems));
    }
  },
  searchItemClicked: function ({ entity: looper }: { entity: EntityLooper }) {
    if (looper) {
      store.dispatch(confirmLooper({ looper }));
    }
  },
};
export default loopersDetailsForm;
