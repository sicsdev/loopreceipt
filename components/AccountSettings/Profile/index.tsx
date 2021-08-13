import { Container, Typography } from "@material-ui/core";
import ProfileForm from "@forms/accountSettings/profileForm";
import UploadImage from "./UploadImage";

export default function Profile() {
  return (
    // <Container maxWidth="lg">
    <>
      <UploadImage />
      <ProfileForm />
    </>
    // {/* </Container> */}
  );
}
