import { formatMs, makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import Form from "@components/Shared/Form";
import Image from "next/image";

import {
  FormStateType,
  FormType,
  useFormReturnType,
} from "@interfaces/FormTypes";
import { getLastChar } from "@helpers/utils";
import { useState, useEffect } from "react";
interface EntityFormProps {
  formProps: useFormReturnType;
  form: FormType;
}
const EntityForm = ({ formProps, form }: EntityFormProps) => {
  const styles = useStyles();
  const [hiddenEntityids, setHiddenEntityIds] = useState<Set<number>>(
    new Set()
  );
  const fieldNamesForEntity = Object.keys(form.entity!);
  useEffect(() => {
    if (Object.keys(formProps.formState).length === 0) {
      // we need to populate the form with at least 1 entity
      formProps.setFormState(() => {
        const entity = form.entity!;
        const createdEntity: FormStateType = {};
        for (let key in entity) {
          createdEntity[key + "1"] = { ...entity[key], name: key + "1" };
        }
        return createdEntity;
      });
    }
  }, []);
  const updateHiddenEntityIds = () => {
    setHiddenEntityIds(() => {
      const set = new Set<number>();
      const keys = Object.keys(formProps.formState);
      const ids = new Set(keys.map((key) => +getLastChar(key)));
      for (let id of Array.from(ids)) {
        let allValid = true;
        for (let field of fieldNamesForEntity) {
          const input = formProps.formState[field + id];
          if (!input.value) {
            allValid = false;
            break;
          }
          if (input.validate) {
            if (!input.validate()) {
              allValid = false;
              break;
            }
          }
        }
        if (allValid) {
          set.add(id);
        }
      }

      return set;
    });
  };
  useEffect(() => {
    updateHiddenEntityIds();
  }, []);
  const addEntity = () => {
    formProps.setFormState((prevFormState: FormStateType) => {
      const keys = Object.keys(prevFormState);
      const ids = new Set(keys.map((key) => +getLastChar(key)));
      let lastKeyId = -1;
      for (let id of Array.from(ids)) {
        if (id > lastKeyId) {
          lastKeyId = id;
        }
      }

      const newLooperEntry: FormStateType = {};
      for (let key of fieldNamesForEntity) {
        const newId = lastKeyId + 1;
        const name = key + newId;
        newLooperEntry[name] = {
          ...prevFormState[key + lastKeyId],
          name,
          value: "",
        };
      }
      const updatedFormState = {
        ...prevFormState,
        ...newLooperEntry,
      };
      return updatedFormState;
    });
    updateHiddenEntityIds();
  };
  // useEffect(() => {
  //   console.log(formProps.formState);
  //   console.log(hiddenEntityids);
  // }, [hiddenEntityids]);
  const confirmedEntities = () => {
    const entities: {
      value: string;
      id: number;
    }[] = [];
    for (let id of Array.from(hiddenEntityids)) {
      let value = "";
      for (let field of fieldNamesForEntity) {
        value += formProps.formState[field + id].value + " - ";
      }
      value = value
        .split("")
        .slice(0, value.length - 3)
        .join("");
      entities.push({ value, id });
    }
    return entities;
  };
  return (
    <div className={styles.AddOrEditFields}>
      {confirmedEntities().map((entity, i) => {
        return (
          <div key={entity.id} className={styles.confirmedField}>
            <div className="details">{entity.value}</div>
            <div className="buttons">
              <div
                onClick={() => {
                  setHiddenEntityIds((prev) => {
                    const updated = new Set(prev);
                    updated.delete(entity.id);
                    return updated;
                  });
                }}
              >
                <Image src="/icons/create/edit.svg" width={20} height={20} />
              </div>
              <div className="divider"></div>
              <div
                onClick={() => {
                  setHiddenEntityIds((prev) => {
                    const updated = new Set(prev);
                    updated.delete(entity.id);
                    return updated;
                  });
                  formProps.setFormState((prevFormState) => {
                    const updatedFormState: typeof prevFormState = {};
                    for (let key in prevFormState) {
                      if (!key.endsWith(String(entity.id))) {
                        updatedFormState[key] = prevFormState[key];
                      }
                    }
                    return updatedFormState;
                  });
                }}
              >
                <Image src="/icons/create/trash.svg" width={20} height={20} />
              </div>
            </div>
          </div>
        );
      })}
      <Form
        {...formProps}
        validateOnBlur={true}
        autoComplete="off"
        hiddenFields={Object.keys(formProps.formState).filter((key) => {
          for (let id of Array.from(hiddenEntityids)) {
            if (key.endsWith(String(id))) return true;
          }
          return false;
        })}
      />
      <div className="button">
        <Button
          color="secondary"
          labelColor="white"
          onClick={() => {
            // console.log("click");
            addEntity();
          }}
        >
          + Add more
        </Button>
      </div>
    </div>
  );
};
export default EntityForm;
const useStyles = makeStyles((theme) => ({
  AddOrEditFields: {
    "& .button": {
      marginTop: "4rem",
    },
  },
  confirmedField: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 0",
    "& .details": {},
    "& .buttons": {
      display: "flex",
      gap: 10,
      "& .divider": {
        width: "2px",
        backgroundColor: "#c4c4c4",
      },
      "& img": {
        cursor: "pointer",
      },
    },
  },
}));
