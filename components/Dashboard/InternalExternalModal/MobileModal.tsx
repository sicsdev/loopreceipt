import { makeStyles } from "@material-ui/core";
import DialogItemType from "@interfaces/DialogItemType";
import { useAppSelector } from "@store/hooks";
import Image from "next/image";

import ToggleBottombar from "@components/Shared/ToggleBottombar";
import { closeModal } from "@store/slices/modalSlice";
import Button from "@components/Controls/Button";
interface MobileModalProps {
  dialogItems: DialogItemType[];
}
const MobileModal = ({ dialogItems }: MobileModalProps) => {
  const styles = useStyles();
  const show = useAppSelector((state) => state.modal.show);
  return (
    <ToggleBottombar show={show} close={closeModal} delay={300}>
      <div className={styles.MobileModal}>
        {dialogItems.map((item, i) => (
          <div key={i} className="item" onClick={item.click}>
            <Image alt="icon" src={item.src} width="35" height="35" />
            <div className="content">
              <p className={"title"}>{item.title}</p>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="button">
          <Button
            variant="outlined"
            color="default"
            labelColor="gray"
            labelWeight="bold"
            borderColor="#999999"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </div>
    </ToggleBottombar>
  );
};
export default MobileModal;
const useStyles = makeStyles((theme) => ({
  MobileModal: {
    // border: "1px solid red",
    display: "flex",
    flexDirection: "column",
    "& .item": {
      display: "flex",
      gap: "1rem",
      padding: "1rem",
      cursor: "pointer",
      borderBottom: "2px solid #F4F3F3",
      "& .content": {
        color: "#4F5257",
        "& .title": {
          fontWeight: "500",
          fontSize: "16px",
        },
        "& .description": {
          fontWeight: "400",
          fontSize: "14px",
        },
      },
    },
    "& .button": {
      width: "70%",
      maxWidth: 273,
      margin: "1.5rem auto",
      display: "flex",
      flexDirection: "column",
    },
  },
}));
