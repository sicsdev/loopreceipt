import { makeStyles, Typography } from "@material-ui/core";
import OptionCards from "@components/Dashboard/OptionCards";
import UpperBar from "@components/Shared/UpperBar";
import { openModal } from "@store/slices/modalSlice";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import Button from "@components/Controls/Button";
import { LoopType } from "@interfaces/LoopTypes";
import Image from "next/image";
import { EntityUser } from "@apiHelpers/types";
interface NoLoopReceiptProps {
  activeTab: LoopType;
  user?: EntityUser;
}
const NoLoopReceipt = ({ activeTab, user }: NoLoopReceiptProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();

  const win = new Win(windowDimensions);
  const newLoopReceiptButton = ListenClickAtParentElement(
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
  );
  const ManWithText = (imgSource: string) => {
    return (
      <div className={styles.manWithText}>
        <Image src={imgSource} width={500} height={500} alt="man icon" />
        <p className="text">
          Oh Boyyy...No, orders yet!! Create new loopreceipt
        </p>
        {newLoopReceiptButton}
      </div>
    );
  };
  return (
    <div className={styles.NoLoopReceipt}>
      {activeTab === "outgoing" ? (
        <div>
          <UpperBar>
            <div className={styles.bar}>
              {user && (
                <div className="profile">
                  <p className="icon">{user.name?.[0]}</p>
                  <p>{user.name}</p>
                </div>
              )}

              {win.up("md") && newLoopReceiptButton}
            </div>
          </UpperBar>
          <div
            style={{
              paddingTop: 20,
            }}
          >
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
      ) : activeTab === "received" ? (
        ManWithText("/icons/dashboard/tabs/received-man.svg")
      ) : (
        ManWithText("/icons/dashboard/tabs/drafts-man.svg")
      )}
    </div>
  );
};
export default NoLoopReceipt;

const useStyles = makeStyles((theme) => ({
  NoLoopReceipt: {},
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
  manWithText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // border: "1px solid red",
    "& .text": {
      fontFamily: '"Waiting for the Sunrise", cursive',

      fontSize: 28,
      marginBottom: "2rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: 20,
      },
    },
  },
}));
