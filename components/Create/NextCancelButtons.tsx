import { makeStyles } from "@material-ui/core";
import Button from "@components/Controls/Button";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Win from "@helpers/Win";
interface NextCancelButtonsProps {
  handleCancelClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleNextClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const NextCancelButtons = ({
  handleCancelClick,
  handleNextClick,
}: NextCancelButtonsProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);

  return (
    <div className={styles.nextCancelButtons}>
      <Button
        variant={win.down("xs") ? "outlined" : "text"}
        size="large"
        color="default"
        labelColor={win.down("xs") ? "gray" : "black"}
        labelWeight="bold"
        shrink={win.up("sm")}
        onClick={handleCancelClick}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        size="large"
        labelWeight="bold"
        shrink={win.up("sm")}
        onClick={handleNextClick}
      >
        Next
      </Button>
    </div>
  );
};
export default NextCancelButtons;
const useStyles = makeStyles((theme) => ({
  nextCancelButtons: {
    display: "flex",
    gap: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      margin: "auto",
      flexDirection: "column-reverse",
    },
  },
}));
