import { makeStyles } from "@material-ui/core";
import OptionCard from "@components/Dashboard/OptionCard";
import { openModal } from "@store/slices/modalSlice";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
interface OptionCardsProps {}
const OptionCards = ({}: OptionCardsProps) => {
  const styles = useStyles();
  return (
    <div className={styles.OptionCards}>
      {ListenClickAtParentElement(
        (e) => {
          openModal(e, {
            translationsFrom: "element",
            positionWRTPoint: {
              right: true,
            },
          });
        },
        (childClick) => (
          <OptionCard
            iconSrc="/icons/create/delivery-notification.svg"
            text="Create a delivery notification"
            onClick={childClick}
          />
        )
      )}

      <OptionCard
        iconSrc="/icons/create/add-user.svg"
        text="Invite your team"
      />
    </div>
  );
};
export default OptionCards;
const useStyles = makeStyles((theme) => ({
  OptionCards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 30,
    marginTop: "5rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      marginTop: "2rem",
    },
  },
}));
