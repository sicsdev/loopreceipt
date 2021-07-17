import { makeStyles } from "@material-ui/core";
interface SelectOptionProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;
}
const SelectOption = ({ setOption }: SelectOptionProps) => {
  const styles = useStyles();
  return (
    <div className={styles.SelectOption}>
      <button onClick={() => setOption("onebyone")}>onebyone</button>
      <button onClick={() => setOption("group")}>group</button>
    </div>
  );
};
export default SelectOption;
const useStyles = makeStyles((theme) => ({
  SelectOption: {},
}));
