import Layout from "@components/Global/Layout";
import UPadWrapper from "@components/Shared/UPadWrapper";
import { makeStyles } from "@material-ui/core";
import Cookies from "js-cookie";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { useState } from "react";
import { BottomBar } from "./selectindustry";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
export type AuthTypes = "google" | "icloud" | "microsoft365";
const authMethods: { [key: string]: string } = {
  google: "Gmail",
  icloud: "iCloud",
  microsoft365: "Microsoft 365",
};
interface OAuthContactsProps {}
const OAuthContacts = ({}: OAuthContactsProps) => {
  const router = useRouter();
  const styles = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<AuthTypes | "">(
    ""
  );

  const handleSubmit = () => {
    if (!selectedAuthMethod) {
      setShowAlert(true);
    }
    if (selectedAuthMethod === "google") {
      window.location.href =
        "https://loop-staging-api.herokuapp.com/api/users/contacts/google?token=" +
        Cookies.get("token");
    } else if (selectedAuthMethod === "microsoft365") {
      window.location.href =
        "https://loop-staging-api.herokuapp.com/api/users/contacts/microsoft?token=" +
        Cookies.get("token");
    }
  };
  return (
    <Layout>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(e, reason) => {
          // reason 'timeout' | 'clickaway';
          if (reason == "timeout") setShowAlert(false);
          // i don't know why clickaway is not working
          // it works with Fade though
        }}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          severity="warning"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          &qout;Please select directory do you want to integrate with&qout;
        </Alert>
      </Snackbar>
      <UPadWrapper>
        <div className={styles.OAuthContacts}>
          <h1 className="heading">
            Which contact directory do you want to integrate with?
          </h1>
          <h4 className="subheading">
            Select a couple of mail platforms to get started. You&apos;ll be
            able to add or change these choices later
          </h4>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="what authMethod do you work on"
              name="authMethod"
              value={selectedAuthMethod}
              onChange={(e, v) => setSelectedAuthMethod(v as AuthTypes)}
              className="authMethods"
            >
              {Object.keys(authMethods).map((method) => (
                <AuthItem key={method} authMethod={method as AuthTypes} />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </UPadWrapper>
      <BottomBar
        skipListener={() => {
          router.push("/dashboard");
        }}
        nextListener={() => {
          handleSubmit();
        }}
      />
    </Layout>
  );
  interface AuthItemProps {
    authMethod: AuthTypes;
  }
  function AuthItem({ authMethod }: AuthItemProps) {
    return (
      <FormControlLabel
        className="authMethodItem"
        value={authMethod}
        control={<Radio color="secondary" />}
        disabled={authMethod === "icloud"}
        label={
          <div className="label">
            <Image
              src={`/icons/oauthcontacts/${authMethod}.svg`}
              width={30}
              height={30}
            />
            <div className="name">{authMethods[authMethod]}</div>
          </div>
        }
        style={{
          backgroundColor: selectedAuthMethod === authMethod ? "#F6F9FD" : "",
        }}
      />
    );
  }
};
export default OAuthContacts;
const useStyles = makeStyles((theme) => ({
  OAuthContacts: {
    paddingTop: "2rem",
    textAlign: "center",
    "& .heading": {
      fontWeight: 500,
      fontSize: 35,
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: 28,
      },
    },
    "& .subheading": {
      margin: "2rem 0",
      fontWeight: 500,
      fontSize: 22,
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        fontWeight: 400,
      },
    },
    "& .authMethods": {
      borderRadius: 8,
      background: "#F6F9FD",
      padding: 65,
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "2rem",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
      "& .authMethodItem": {
        transform: "translateX(1rem)",
        // i don't know about this
        padding: 4,
        height: 118,
        width: 230,
        border: `1px solid ${theme.palette.secondary.main}`,
        background: "#F6F9FD",
        borderRadius: 8,
        " & .label": {
          display: "flex",
          gap: "1rem",
          "& .name": {
            fontSize: 20,
          },
        },
      },
    },
  },
}));
