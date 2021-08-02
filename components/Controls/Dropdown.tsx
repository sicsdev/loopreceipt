import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface DropdownProps {
  name: string;
  option: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const Dropdown = ({ name, option, onClick }: DropdownProps) => {
  const styles = useStyles();
  return (
    <div className={styles.Dropdown} onClick={onClick}>
      <span className="name"> {name}</span>
      <span className="option">{option}</span>
      <Image alt="icon" src="/icons/arrow-down.svg" width={16} height={16} />
    </div>
  );
};
export default Dropdown;
const useStyles = makeStyles((theme) => ({
  Dropdown: {
    display: "flex",
    gap: "1rem",
    cursor: "pointer",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      gap: 5,
    },
    "& .name": {
      color: "#4F4F4F",
    },
    "& .option": {
      fontWeight: 500,
    },
  },
}));
