import { makeStyles } from "@material-ui/core";

interface InputBoxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
function InputBox({
  label,
  name,
  placeholder,
  value,
  onChange,
}: InputBoxProps) {
  const classes = useStyles();
  return (
    <div className={classes.inputBox}>
      <label className="label">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
}

export default InputBox;
const useStyles = makeStyles((theme) => ({
  inputBox: {
    padding: "1rem",
    "& .label": {
      display: "inline-block",
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
    },
  },
}));
