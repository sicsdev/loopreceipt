import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  makeStyles,
} from "@material-ui/core";
import ProfileForm from "@forms/accountSettings/profileForm";
import UploadImage from "./UploadImage";
import { useForm } from "@hooks/useForm";
// import ProfileFormDetails from "@forms/accountSettings/profileFormDetails";
import usersApi from "@apiClient/usersApi";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { validateAllFieldsOfForm } from "forms/formUtils";
import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";
import { raiseAlert } from "@store/slices/genericSlice";
import { setUser } from "@store/slices/userSlice";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      padding: 30,
      paddingRight: 0,
      width: "80%",
      justifyContent: "space-between",
    },
  },
  buttonContainer1: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      // padding: 30,
    },
  },
  buttons: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    "& span": {
      fontWeight: 500,
    },
    fontSize: 18,
    lineHeight: "21px",
    color: "#7A7A7A",
    borderRadius: 8,
    [theme.breakpoints.down("sm")]: {
      margin: "10px 30px",
    },
    minWidth: 143,
    minHeight: 47,
  },
  saveButton: {
    color: "#000000",
    "& span": {
      fontWeight: "bold !important",
    },
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {
      marginRight: 15,
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  let { user } = useAppSelector((state) => state.user);

  const ProfileFormDetails: FormType = {
    formName: "profileForm",
    formHeading: "Profile",
    initialState: {
      name: {
        name: "name",
        label: "Name",
        placeholder: "Your full name",
        value: user?.name ? user?.name : "",
        type: "text",
        validate: function () {
          return validations.isRequired(this);
          // default validation message is used
        },
      },
      email: {
        name: "email",
        label: "Email",
        placeholder: "Your email address",
        value: user?.email ? user?.email : "",
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
        value: user?.country ? user?.country : "",
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
        value: user?.city ? user?.city : "",
        type: "text",
      },
      province: {
        name: "province",
        label: "State / Province",
        placeholder: "State / Province",
        value: user?.province ? user?.province : "",
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
        value: user?.address ? user?.address : "",
        type: "text",
        validate: function () {
          return validations.isRequired(this);
          // validations.minMaxLength({ max: 20 })(this)
          // default validation message is used
        },
      },
    },
  };

  const formProps = useForm(ProfileFormDetails.initialState);
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async () => {
    if (validateAllFieldsOfForm(formProps)) {
      let u = {
        name: formProps.formState.name.value,
        email: formProps.formState.email.value,
        country: formProps.formState.country.value,
        city: formProps.formState.city.value,
        province: formProps.formState.province.value,
        address: formProps.formState.address.value,
      };
      setIsSaving(true);
      await usersApi.updateUser(u);
      let userData = await usersApi.getMe();
      raiseAlert("Successfully Saved Changes!", "success");
      dispatch(setUser(userData.user));
      setIsSaving(false);
    }
  };

  const deleteAccount = async () => {
    let response = await usersApi.deleteAccount();
  };

  return (
    <Container>
      <UploadImage />
      <ProfileForm
        form={ProfileFormDetails}
        formProps={formProps}
        // onSubmit={onSubmit}
      />
      <Box className={classes.buttonContainer}>
        <Box className={classes.buttonContainer1}>
          <Button
            variant="contained"
            className={`${classes.buttons} ${classes.saveButton}`}
            color="primary"
            size="large"
            onClick={onSubmit}
            disabled={isSaving}
          >
            Save Changes
          </Button>
          <Button variant="outlined" size="large" className={classes.buttons}>
            Cancel
          </Button>
        </Box>
        <Button
          variant="outlined"
          size="large"
          className={classes.buttons}
          onClick={deleteAccount}
        >
          Delete Account
        </Button>
      </Box>
    </Container>
  );
}
