import { makeStyles, useTheme } from "@material-ui/core";
import ConfirmDialog from "@components/Create/ConfirmDialog";
import ConfirmDialogType from "@interfaces/ConfirmDialogType";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import NextCancelButtons from "./NextCancelButtons";
import SearchBar from "@components/Create/SearchBar";
interface BoxContentProps {
  confirmDialog: ConfirmDialogType;
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialogType>>;
  handleCancelClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleNextClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: JSX.Element;
}
const BoxContent = ({
  confirmDialog,
  setConfirmDialog,
  handleCancelClick,
  handleNextClick,
  children,
}: BoxContentProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();
  return (
    <div className={styles.BoxContent}>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <div className={styles.top}>
        <SearchBar />
        {windowDimensions.innerWidth >= theme.breakpoints.values.sm && (
          <NextCancelButtons
            handleCancelClick={handleCancelClick}
            handleNextClick={handleNextClick}
          />
        )}
      </div>
      <div className={styles.rest}>
        {children}
        {windowDimensions.innerWidth < theme.breakpoints.values.sm && (
          <>
            <div style={{ flex: 2 }}></div>
            <NextCancelButtons
              handleCancelClick={handleCancelClick}
              handleNextClick={handleNextClick}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default BoxContent;
const useStyles = makeStyles((theme) => ({
  BoxContent: {},
  top: {
    padding: "1rem",
    borderBottom: "2px solid #DDDDDD",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      borderBottom: "none",
    },
    gap: 10,
  },
  rest: {
    padding: "2rem",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
}));
