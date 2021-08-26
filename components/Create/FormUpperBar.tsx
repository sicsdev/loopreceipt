import { makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import UpperBar from "@components/Shared/UpperBar";
import React from "react";
import Image from "next/image";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Win from "@helpers/Win";
interface FormUpperBarProps {
  showBackButton: boolean;
  handleBackButtonClick: React.MouseEventHandler<any>;
  upperBarText?: JSX.Element | string;
}
const FormUpperBar = ({
  showBackButton,
  handleBackButtonClick,
  upperBarText,
}: FormUpperBarProps) => {
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const styles = useStyles();
  const backButton = showBackButton ? (
    <div className={styles.backButton} onClick={handleBackButtonClick}>
      <Button expand>Back</Button>
    </div>
  ) : null;
  const upperBarContent = (
    <div className={styles.upperBar}>
      {backButton}
      <div className="info">{upperBarText}</div>
      {backButton &&
        React.cloneElement(backButton, { style: { visibility: "hidden" } })}
    </div>
  );

  return <UpperBar>{win.up("sm") ? upperBarContent : backButton}</UpperBar>;
};
export default FormUpperBar;
const useStyles = makeStyles((theme) => ({
  FormUpperBar: {},
  backButton: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "1rem",
    },
  },
  upperBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      width: "100%",
      marginTop: "1.5rem",
    },
    "& .info": {
      // border: "1px solid red",
      margin: "auto",
      display: "flex",
      gap: 10,
      "& p": {
        fontWeight: "bold",
        fontSize: 18,
      },
    },
  },
}));
