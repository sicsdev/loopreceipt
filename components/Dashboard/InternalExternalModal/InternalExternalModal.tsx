import DesktopModal from "./DesktopModal";
import { isMobile } from "react-device-detect";
import MobileModal from "./MobileModal";
import { useAppDispatch } from "@store/hooks";
import { setLoopReceiptType } from "@store/slices/loopReceiptSlice";
import { useRouter } from "next/router";
import DialogItemType from "@interfaces/DialogItemType";
import { closeModal } from "@store/slices/modalSlice";
import { useEffect, useState } from "react";
interface InternalExternalModalProps {}
const InternalExternalModal = ({}: InternalExternalModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mobileDevice, setMobileDevice] = useState(false);
  useEffect(() => {
    setMobileDevice(isMobile);
  }, []);
  const dialogItems: DialogItemType[] = [
    {
      title: "Internal Loopreceipts",
      description: "Create loops within the members of your organization.",
      src: "/icons/create/internal.svg",
      click: () => {
        dispatch(setLoopReceiptType({ type: "internal" }));
        closeModal();

        router.push("/create");
      },
    },
    {
      title: "External Looprecipts",
      description: "Create loops with partners outside of your organization.",
      src: "/icons/create/external.svg",
      click: () => {
        dispatch(setLoopReceiptType({ type: "external" }));
        closeModal();
        router.push("/create");
      },
    },
  ];
  return mobileDevice ? (
    <MobileModal dialogItems={dialogItems} />
  ) : (
    <DesktopModal dialogItems={dialogItems} />
  );
};
export default InternalExternalModal;
