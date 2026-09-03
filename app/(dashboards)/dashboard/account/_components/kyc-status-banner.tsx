import { AlertMessage } from "@/components/ui/alert-message";
import { KYC_STATUS } from "@prisma/client";

export const KYCStatusBanner = ({ status }: { status: KYC_STATUS }) => {
  let variant: "default" | "info" | "success" | "error" | "warning";
  let message;

  switch (status) {
    case KYC_STATUS.PENDING:
      variant = "warning";
      message = "Your KYC is pending approval.";
      break;
    case KYC_STATUS.APPROVED:
      variant = "success";
      message = "Your KYC has been approved.";
      break;
    case KYC_STATUS.REJECTED:
      variant = "error";
      message = "Your KYC has been rejected.";
      break;
    default:
      variant = "warning";
      message = "Your KYC is pending approval.";
  }

  return <AlertMessage variant={variant} message={message} className="mb-4" />;
};
