import { makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import UpperBar from "@components/Shared/UpperBar";
import React from "react";
import Image from "next/image";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Win from "@helpers/Win";
interface FormUpperBarProps {
  handleBackButtonClick: React.MouseEventHandler<any>;
  upperBarText?: JSX.Element | string;
}
const FormUpperBar = ({
  handleBackButtonClick,
  upperBarText,
}: FormUpperBarProps) => {
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const styles = useStyles();
  const backButton = (
    <div className={styles.backButton} onClick={handleBackButtonClick}>
      <Button expand>Back</Button>
    </div>
  );
  const upperBarContent = (
    <div className={styles.upperBar}>
      {backButton}
      <div className="info">{upperBarText}</div>
      {React.cloneElement(backButton, { style: { visibility: "hidden" } })}
    </div>
  );

  return (
    <UpperBar>
      {win.up("sm") ? (
        upperBarContent
      ) : (
        <div className={styles.newButton} onClick={handleBackButtonClick}>
          <Image
            alt="icon"
            src="/icons/create/back.svg"
            width="20"
            height="20"
          />
          &nbsp; New Loopreceipt
        </div>
      )}
    </UpperBar>
  );
};
export default FormUpperBar;
const useStyles = makeStyles((theme) => ({
  FormUpperBar: {},
  backButton: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
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
      display: "flex",
      gap: 10,
      "& p": {
        fontWeight: "bold",
        fontSize: 18,
      },
    },
  },
  newButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    paddingLeft: "5%",
    "& img": {},
  },
}));
