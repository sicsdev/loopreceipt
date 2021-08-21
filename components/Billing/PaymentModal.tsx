import { Dialog } from "@material-ui/core";
import Payment from "./payment";

interface PaymentModalProps {
  open: boolean;
  handleClose: any;
  upgradePlan: string;
}

export default function PaymentModal({
  open,
  handleClose,
  upgradePlan,
}: PaymentModalProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Payment
        open={open}
        handleClose={handleClose}
        upgradePlan={upgradePlan}
      />
    </Dialog>
  );
}
