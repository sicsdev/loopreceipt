import { Container, Typography } from "@material-ui/core";
import ProfileForm from "@forms/accountSettings/profileForm";

export default function Profile() {
  return (
    <Container maxWidth="lg">
      <ProfileForm />
    </Container>
  );
}
