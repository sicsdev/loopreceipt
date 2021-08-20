import groupsApi from "@apiClient/groupsApi";
import { EntitySearchedGroup } from "@apiHelpers/types";
import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";
import { SearchItemType } from "@interfaces/SearchItemType";
import {
  searchBarSlice,
  setEntitySearchedGroup,
  setSearchItemName,
  setSearchItems,
  setSearchSpace,
} from "@store/slices/searchBarSlice";
import store from "@store/store";

const groupDetailsForm: FormType = {
  formName: "groupDetailsForm",
  formHeading: "Add Company Details",
  initialState: {
    groupName: {
      name: "groupName",
      label: "Group Name",
      placeholder: "Group Name",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
      },
    },
    createdFor: {
      name: "createdFor",
      label: "Created For",
      placeholder: "Created For",
      value: "",
      type: "text",
      validate: function () {
        return validations.isRequired(this);
      },
    },
  },
  populateSearchItems: async (str: string) => {
    if (store.getState().searchBar.searchItemName !== "group") {
      // we want to set this just once
      store.dispatch(setSearchItemName("group"));
      store.dispatch(setSearchSpace(""));
    }

    if (!str) return;
    const response = await groupsApi.getBySearch(str);
    if (response) {
      const groups = response.results;
      // console.log(groups);
      const searchItems: SearchItemType<EntitySearchedGroup>[] = [];
      for (let group of groups) {
        searchItems.push({
          primary: group.name,
          secondary: group.createdFor,
          entity: group,
        });
      }
      // console.log(searchItems);
      store.dispatch(setSearchItems(searchItems));
    }
  },
  searchItemClicked: function ({ entity }: { entity: EntitySearchedGroup }) {
    if (entity) {
      store.dispatch(setEntitySearchedGroup(entity));
    }
  },
};
export default groupDetailsForm;
