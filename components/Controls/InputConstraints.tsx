import { makeStyles } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";
import { Debounce } from "@helpers/utils";
interface InputConstraintsProps {
  constraints: string[];
}
const InputConstraints = ({ constraints }: InputConstraintsProps) => {
  const styles = useStyles();
  const [showConstraints, setShowConstraints] = useState(false);
  const updateShowConstraints = useRef(
    new Debounce((value: boolean) => {
      setShowConstraints(value);
    }, 200)
  );
  return (
    <div
      className={styles.InputConstraints}
      onMouseEnter={() => {
        updateShowConstraints.current.callImmediately(true);
      }}
      onMouseLeave={() => {
        updateShowConstraints.current.callAfterDelay(false);
      }}
    >
      <div className="helpIcon">
        <HelpIcon fontSize={"small"} />
      </div>
      <CSSTransition
        in={showConstraints}
        timeout={100}
        classNames={`constraints`}
        unmountOnExit
      >
        <div className="constraintsBlock">
          <div className="content">
            {constraints.map((constraint, i) => (
              <p key={i}>
                {constraint}
                {i === constraints.length - 1 ? "." : ","}
              </p>
            ))}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
export default InputConstraints;
const useStyles = makeStyles((theme) => ({
  InputConstraints: {
    position: "relative",
    "& .helpIcon": {},
    "& .constraintsBlock": {
      // border: "1px solid green",
      position: "absolute",
      left: "53px",
      top: "0px",
      width: "max-content",
      transform: "translate(-50%, -100%)",
      zIndex: 10,
      paddingBottom: "1rem",
      "& .content": {
        borderRadius: 8,
        color: "white",
        padding: ".5rem",
        backgroundColor: "#212B36",
      },
    },
  },
  "@global": {
    ".constraints-enter": {
      opacity: 0,
      transform: "translate(-50%, -70%) scale(.7) !important",
    },
    ".constraints-enter-active": {
      opacity: 1,
      transform: "translate(-50%, -100%) scale(1) !important",
      transition: `all 100ms ease`,
    },
    ".constraints-exit-active": {
      opacity: 0,
      transform: "translate(-50%, -70%) scale(.7) !important",
      transition: `all 100ms ease-in`,
    },
  },
}));
