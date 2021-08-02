import { makeStyles } from "@material-ui/core";
import { useAppSelector } from "@store/hooks";
import { closeModal } from "@store/slices/modalSlice";
import MovableModal from "@components/Shared/MovableModal";
import Image from "next/image";
import DialogItemType from "@interfaces/DialogItemType";
interface DesktopModalProps {
  dialogItems: DialogItemType[];
}
const DesktopModal = ({ dialogItems }: DesktopModalProps) => {
  const { show, mouseEvent, options } = useAppSelector((state) => state.modal);

  const styles = useStyles();
  return (
    <MovableModal
      mouseEvent={mouseEvent}
      showModal={show}
      closeModal={closeModal}
      translationsFrom={options?.translationsFrom}
      positionWRTPoint={options?.positionWRTPoint}
      translations={options?.translations ?? { x: 0, y: 0 }}
    >
      <div className={styles.DesktopModal}>
        {dialogItems.map((item, i) => (
          <div key={i} className="item" onClick={item.click}>
            <Image alt="icon" src={item.src} width="31" height="31" />
            <div className="content">
              <p className={"title"}>{item.title}</p>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </MovableModal>
  );
};
export default DesktopModal;
const useStyles = makeStyles((theme) => ({
  DesktopModal: {
    backgroundColor: "white",
    width: 350,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
    "& .item": {
      display: "flex",
      gap: "1rem",
      padding: "1rem",
      cursor: "pointer",
      "&:not(:last-child)": {
        borderBottom: "2px solid #F4F3F3",
      },
      "& .content": {
        "& .title": {
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "21px",
        },
        "& .description": {
          fontWeight: "400",
          fontSize: "11px",
          lineHeight: "16.5px",
        },
      },
    },
  },
}));
