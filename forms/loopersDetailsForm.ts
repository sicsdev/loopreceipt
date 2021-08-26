import loopsApi from "@apiClient/loopsApi";
import { EntityLooper } from "apiHelpers/types";
import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";
import { SearchItemType } from "@interfaces/SearchItemType";
import _ from "lodash";

import {
  confirmLooper,
  setSearchItemName,
  setSearchItems,
  setSearchSpace,
} from "@store/slices/searchBarSlice";
import store from "@store/store";

const loopersDetailsForm: FormType = {
  formName: "loopersDetailsForm",
  formHeading: "Add Loopers",
  initialState: {
    looperName: {
      name: "looperName",
      label: `Looper's Name`,
      placeholder: "Name",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
      },
    },
    looperEmail: {
      name: "looperEmail",
      label: `Looper's email address`,
      placeholder: "Email",
      value: "",
      type: "email",
      iconType: "email",
      validate: function () {
        return validations.isRequired(this) && validations.email(this);
      },
    },
  },
  populateSearchItems: async () => {
    if (store.getState().searchBar.searchItemName !== "looper") {
      // we want to set this just once
      store.dispatch(setSearchItemName("looper"));
      store.dispatch(setSearchSpace(""));
    }
    const response = await loopsApi.getAll();
    if (response) {
      const loops = response.items;
      const searchItems: SearchItemType<EntityLooper>[] = [];
      for (let loop of loops) {
        for (let looper of loop.loopers) {
          // this is done to prevent multiple
          // duplicate loopers in search with same name and email
          if (!searchItems.find((s) => _.isEqual(s.entity, looper))) {
            searchItems.push({
              primary: looper.name,
              secondary: looper.email,
              entity: looper,
            });
          }
        }
      }
      console.log(searchItems);
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
