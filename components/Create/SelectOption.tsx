import Button from "@components/Controls/Button";
import UpperBar from "@components/Shared/UpperBar";
import { makeStyles } from "@material-ui/core";
import Image from "next/image";
interface SelectOptionProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;
}
const SelectOption = ({ setOption }: SelectOptionProps) => {
  const styles = useStyles();
  return (
    <div className={styles.SelectOption}>
      <UpperBar>
        <div className="head">Create Loopreceipt</div>
      </UpperBar>
      <div className={styles.options}>
        <Option
          src="/icons/create/onebyone.svg"
          head="One by One"
          text="Create loop by adding members one by one"
          onClick={() => setOption("onebyone")}
        />
        <Option
          src="/icons/create/group.svg"
          head="Group"
          text="Create loop by adding multiple members"
          onClick={() => setOption("group")}
        />
      </div>
    </div>
  );
};
interface OptionProps {
  src: string;
  head: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function Option({ src, head, text, onClick }: OptionProps) {
  return (
    <div className="option" onClick={onClick}>
      <div className={"icon"}>
        <Image alt="icon" src={src} width={28} height={28} />
      </div>
      <div className="content">
        <p className="h">{head}</p>
        <p className="text">{text}</p>
      </div>
      <div className="spacer"></div>
      <Button labelWeight="bold" size="medium" expand>
        Create
      </Button>
    </div>
  );
}

export default SelectOption;
const useStyles = makeStyles((theme) => ({
  SelectOption: {
    "& .head": {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
  },
  options: {
    width: "80%",
    margin: "4rem auto",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    "& .option": {
      display: "flex",
      alignItems: "center",

      gap: 30,
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        gap: 10,
      },
      "& .icon": {
        border: "1px solid #C5C5C5",
        padding: "1rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      "& .content": {
        color: "#4F5257",
        [theme.breakpoints.down("xs")]: {
          textAlign: "center",
        },
        "& .h": {
          fontWeight: "500",
        },
        "& .text": {
          fontSize: "14px",
        },
      },
      "& .spacer": {
        flex: 1,
      },
    },
  },
}));
