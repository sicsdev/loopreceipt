import { InputIconType } from "@interfaces/InputTypes";

const inputIconMap = (inputName: InputIconType) => {
  switch (inputName) {
    case "email":
      return "/icons/form/envelope.svg";
    case "location":
      return "/icons/form/location.svg";
    case "phone":
      return "/icons/form/phone.svg";
  }
};
export default inputIconMap;
