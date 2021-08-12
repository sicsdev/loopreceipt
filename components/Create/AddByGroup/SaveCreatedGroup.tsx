import { EntityGroup, EntityLooper, EntityRecipient } from "apiHelpers/types";
import groupsApi from "@apiClient/groupsApi";
import Group from "./Group";
import { deferrer, useFetch } from "@hooks/useFetch";
import Button from "@components/Controls/Button";
import { useRouter } from "next/router";
import { makeStyles, StylesProvider } from "@material-ui/core";
import faker from "faker";
import { FormStateType } from "@interfaces/FormTypes";
import { useForm } from "@hooks/useForm";
import groupDetailsForm from "forms/groupDetailsForm";
import { useState, useEffect } from "react";
import Form from "../Form";
import { getEntityRecipientFromRecipientState } from "@forms/formUtils";
interface SaveCreatedGroupProps {
  loopers: EntityLooper[];
  recipientState: FormStateType;
}
const SaveCreatedGroup = ({
  loopers,
  recipientState,
}: SaveCreatedGroupProps) => {
  const styles = useStyles();
  const router = useRouter();
  const [group, setGroup] = useState<EntityGroup>();
  const groupFormProps = useForm(groupDetailsForm.initialState);
  useEffect(() => {
    const recipient = getEntityRecipientFromRecipientState(recipientState);
    setGroup({
      recipient,
      loopers,
      name: groupFormProps.formState.groupName.value,
      createdFor: groupFormProps.formState.createdFor.value,
    });
  }, [recipientState, loopers, groupFormProps.formState]);

  const {
    data,
    loading,
    sendRequest: saveCreatedGroup,
    requestSent,
  } = useFetch<{ group: EntityGroup }>(groupsApi.create, {
    deferred: true,
    numRetriesOnError: 3,
    retryMethodOnError: () => {
      console.log("retry");
    },
    methodOnError: () => {
      console.log("redirect to login page");
      // router.push("/login");
    },
  });

  let child;
  if (!requestSent) {
    child = (
      <div>
        <Form
          form={groupDetailsForm}
          formProps={groupFormProps}
          padForm={false}
        />
        <div style={{ height: "2rem" }}></div>
        <Group group={group} />
        <div style={{ height: "2rem" }}></div>
        <Button
          onClick={async () => {
            for (let i = 0; i < 10; i++) {
              const company = faker.company.companyName();
              await saveCreatedGroup({
                ...group,
                name: company + " Management Team",
                createdFor: company,
              });
            }
            const response = await saveCreatedGroup(group);
            console.log(response);
          }}
        >
          Save this Group
        </Button>
      </div>
    );
  } else if (loading) {
    child = <div>Saving Group Please wait</div>;
  } else if (!data) {
    child = <div>Failed to save group</div>;
  } else {
    child = <Group group={data.group} />;
  }
  return <div className={styles.SaveCreatedGroup}>{child}</div>;
};
export default SaveCreatedGroup;
const useStyles = makeStyles((theme) => ({
  SaveCreatedGroup: {
    padding: "2rem",
  },
}));
