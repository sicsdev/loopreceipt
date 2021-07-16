import DesktopModal from "./DesktopModal";
import { isMobile } from "react-device-detect";
import MobileModal from "./MobileModal";
import { useAppDispatch } from "@store/hooks";
import { setType } from "@store/slices/loopReceiptSlice";
import { useRouter } from "next/router";
import DialogItemType from "@interfaces/DialogItemType";
interface InternalExternalModalProps {}
const InternalExternalModal = ({}: InternalExternalModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dialogItems: DialogItemType[] = [
    {
      title: "Internal Loopreceipts",
      description: "Create loops within the members of your organization.",
      src: "/icons/create/internal.svg",
      click: () => {
        dispatch(setType({ type: "internal" }));
        router.push("/create");
      },
    },
    {
      title: "External Looprecipts",
      description: "Create loops with partners outside of your organization.",
      src: "/icons/create/external.svg",
      click: () => {
        dispatch(setType({ type: "external" }));
        router.push("/create");
      },
    },
  ];
  return isMobile ? (
    <MobileModal dialogItems={dialogItems} />
  ) : (
    <DesktopModal dialogItems={dialogItems} />
  );
};
export default InternalExternalModal;
