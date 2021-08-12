import { FormType } from "@interfaces/FormTypes";

const groupDetailsForm: FormType = {
  formName: "groupDetailsForm",
  formHeading: "Add Company Details",
  initialState: {
    groupName: {
      name: "groupName",
      label: "Group Name",
      placeholder: "Dropisle Management team",
      value: "",
      type: "text",
    },
    createdFor: {
      name: "createdFor",
      label: "Created For",
      placeholder: "Dropisle Inc",
      value: "",
      type: "text",
    },
  },
};
export default groupDetailsForm;
