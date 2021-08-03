import { makeStyles, Typography } from "@material-ui/core";
import OptionCards from "@components/Dashboard/OptionCards";
import UpperBar from "@components/Shared/UpperBar";
import { openModal } from "@store/slices/modalSlice";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import Button from "@components/Controls/Button";
interface NoLoopReceiptProps {}
const NoLoopReceipt = ({}: NoLoopReceiptProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();

  const win = new Win(windowDimensions);
  return (
    <div className={styles.NoLoopReceipt}>
      <UpperBar>
        <div className={styles.bar}>
          <div className="profile">
            <p className="icon">G</p>
            <p>Gari Boetang</p>
          </div>
          <div
            style={{
              display: win.up("md") ? "block" : "none",
            }}
          >
            {ListenClickAtParentElement(
              (e) => {
                openModal(e, {
                  translationsFrom: "element",
                  positionWRTPoint: {
                    bottom: true,
                    left: true,
                  },
                  translations: {
                    y: 30,
                    x: (e.target as any).offsetWidth,
                  },
                });
              },
              (childClick) => (
                <Button onClick={childClick} labelWeight="bold">
                  + New Loopreceipt
                </Button>
              )
            )}
          </div>
        </div>
      </UpperBar>
      <div className={styles.text}>
        <Typography
          variant="body1"
          gutterBottom
          style={{
            fontWeight: "bold",
            color: "#4F5257",
          }}
        >
          You dont have any Loopreceipts yet.
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "#4F5257",
          }}
        >
          You’ll want to add recipients to create Loops with you.
        </Typography>
      </div>
      <OptionCards />
    </div>
  );
};
export default NoLoopReceipt;
const useStyles = makeStyles((theme) => ({
  NoLoopReceipt: {
    padding: "2rem 1rem",
  },
  bar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .profile": {
      display: "flex",
      alignItems: "center",
      gap: 16,
      "& .icon": {
        width: 47,
        height: 47,
        backgroundColor: "#C5C5C5",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: "1.2rem",
      },
    },
  },
  text: {
    paddingTop: 20,
  },
}));
