import { makeStyles, useTheme } from "@material-ui/core";
import Button from "@components/Controls/Button";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
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
  const theme = useTheme();
  return (
    <div className={styles.nextCancelButtons}>
      <Button
        variant={
          windowDimensions.innerWidth < theme.breakpoints.values.sm
            ? "outlined"
            : "text"
        }
        size="large"
        color="default"
        labelColor={
          windowDimensions.innerWidth < theme.breakpoints.values.sm
            ? "gray"
            : "black"
        }
        labelWeight="bold"
        shrink={windowDimensions.innerWidth >= theme.breakpoints.values.sm}
        onClick={handleCancelClick}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        size="large"
        labelWeight="bold"
        shrink={windowDimensions.innerWidth >= theme.breakpoints.values.sm}
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
