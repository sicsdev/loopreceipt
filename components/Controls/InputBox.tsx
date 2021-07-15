import { InputType } from "@interfaces/InputTypes";
import { makeStyles } from "@material-ui/core";

interface InputBoxProps {
  input: InputType;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
function InputBox({ input, onChange, onBlur }: InputBoxProps) {
  const styles = useStyles();
  return (
    <div className={styles.inputBox}>
      <label className="label">{input.label}</label>
      <input
        type={input.type}
        name={input.name}
        value={input.value}
        onChange={onChange}
        placeholder={input.placeholder}
        onBlur={onBlur}
      ></input>
      <p className="error">{input.error}</p>
    </div>
  );
}

export default InputBox;
const useStyles = makeStyles((theme) => {
  console.log(theme.breakpoints.values);
  return {
    inputBox: {
      "& .label": {
        display: "block",
        fontWeight: "bold",
        marginBottom: ".5rem",
        fontSize: "1.1rem",
      },
      "& input": {
        width: "80%",

        padding: ".7rem",
        borderRadius: "4px",
        border: "1px solid #DDDDDD",
        outline: "none",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
      },
      "& .error": {
        color: "red",
      },
    },
  };
});
