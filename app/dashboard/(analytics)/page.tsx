import { USER_ROLE } from "@prisma/client";

import { AlertMessage } from "@/components/ui/alert-message";
import { Heading } from "@/components/heading";
import { getCurrentUserOrRedirect } from "@/lib/auth";

const AnalyticsPage = async () => {
  const user = await getCurrentUserOrRedirect();

  return (
    <div className="space-y-6">
      {user.role === USER_ROLE.USER && (
        <AlertMessage
          variant="warning"
          message="You are not a creator. If you want to become a creator, please request creator access"
        />
      )}

      <Heading
        title="Analytics Page"
        subtitle="View the analytics of all your channels and courses here"
      />
    </div>
  );
};

export default AnalyticsPage;
