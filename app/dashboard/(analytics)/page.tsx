import { USER_ROLE } from "@prisma/client";

import { AlertMessage } from "@/components/alret-message";
import { getSelf } from "@/lib/user";

const AnalyticsPage = async () => {
  const user = await getSelf();

  return (
    <div>
      {user.role === USER_ROLE.USER && (
        <AlertMessage
          type="warning"
          message="YOU ARE NOT A CREATOR. IF YOU WANT TO BECOME A CREATOR PLEASE REQUEST CREATOR ACCESS"
        />
      )}
    </div>
  );
};

export default AnalyticsPage;
