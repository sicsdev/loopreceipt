import { InputType } from "@interfaces/InputTypes";
import { makeStyles, Theme } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { useEffect, useRef } from "react";
import { usePreviousValue } from "@hooks/usePreviousValue";
import InputConstraints from "@components/Controls/InputConstraints";
import { useState } from "react";
import PasswordStrengthBar from "@components/Controls/PasswordStrengthBar";
import Message from "@components/Shared/Message";
import classNames from "classnames";
// console.log(CountryRegionData);
interface InputBoxProps {
  input: InputType;
  onChange: React.ChangeEventHandler<Element>;
  onBlur: React.FocusEventHandler<Element>;
  dependency?: string;
  resetValue?: () => void;
}
function InputBox({
  input,
  onChange,
  onBlur,
  dependency,
  resetValue,
}: InputBoxProps) {
  const styles = useStyles();
  const previousDependency = usePreviousValue(dependency);
  const [passwordVisible, setPasswordVisible] = useState(false);
  useEffect(() => {
    if (input.type === "phone" && previousDependency) {
      resetValue?.();
    }
  }, [dependency]);
  return (
    <div className={styles.inputBox}>
      <label className="label">
        <p className="text">{input.label}</p>
        {/* input constraints are not needed for now */}
        {/* {input.constraints && (
          <InputConstraints constraints={input.constraints} />
        )} */}
      </label>
      {input.type === "country" ? (
        <div className={styles.inputContainer + " MyInputContainer"}>
          <CountryDropdown
            classes={styles.input}
            name={input.name}
            value={input.value}
            onChange={(val, e) => {
              onChange(e as any);
            }}
            onBlur={(val, e) => {
              onBlur(e as any);
            }}
          />
        </div>
      ) : input.type === "region" ? (
        <div className={styles.inputContainer + " MyInputContainer"}>
          <RegionDropdown
            classes={styles.input}
            country={dependency!}
            name={input.name}
            value={input.value}
            onChange={(val, e) => {
              onChange(e as any);
            }}
            onBlur={(val, e) => {
              onBlur(e as any);
            }}
          />
        </div>
      ) : input.type === "phone" ? (
        <div className={styles.phoneInput}>
          <div className={styles.inputContainer + " MyInputContainer"}>
            <PhoneInput
              international
              defaultCountry={
                CountryRegionData.find((data) => data[0] === dependency)?.[1]
              }
              value={input.value}
              onChange={(value) => {
                const e = {
                  target: {
                    name: input.name,
                    value,
                  },
                };
                onChange(e as any);
              }}
              onBlur={(e) => {
                onBlur(e as any);
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.inputContainer + " MyInputContainer"}>
          <input
            className={classNames(styles.input, {
              [styles.inputWithError]: input.error,
            })}
            {...input.inputProps}
            type={
              input.type !== "password"
                ? input.type
                : passwordVisible
                ? "text"
                : "password"
            }
            name={input.name}
            value={input.value}
            onChange={onChange}
            placeholder={input.placeholder}
            onBlur={onBlur}
            autoComplete="on"
          ></input>
          {input.type === "password" && (
            <div
              className="passwordToogler"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          )}
        </div>
      )}

      {input.showPasswordStrengthBar && (
        <div
          style={{
            marginTop: 10,
          }}
        >
          <PasswordStrengthBar password={input.value} />
        </div>
      )}
      {input.error && (
        <div className={styles.inputError}>
          <Message type="warning" message={input.error}></Message>
        </div>
      )}
    </div>
  );
}

export default InputBox;
const inputCommon = (theme: Theme) => ({
  width: "100%",
  padding: 12,
  borderRadius: "4px",
  border: "1px solid #DDDDDD",
  backgroundColor: "white",
  outline: "none",
});
const useStyles = makeStyles((theme) => {
  // console.log(theme.breakpoints.values);
  return {
    inputBox: {
      "& .label": {
        display: "flex",
        marginBottom: ".5rem",
        gap: 10,
        "& .text": {
          fontWeight: "bold",
          fontSize: "1.1rem",
        },
      },
    },

    input: inputCommon(theme),
    phoneInput: {
      "& input": inputCommon(theme),
    },
    inputWithError: {
      borderColor: "#FFC107",
    },
    inputContainer: {
      width: "80%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      position: "relative",
      "& .passwordToogler": {
        cursor: "pointer",
        position: "absolute",
        right: 10,
        top: 10,
      },
    },
    inputError: {
      margin: "1rem 0",
    },
  };
});
