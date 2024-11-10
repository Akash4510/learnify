import { USER_ROLE } from "@prisma/client";

import { AlertMessage } from "@/components/ui/alert-message";
import { Heading } from "@/components/heading";
import { getCurrentUserOrRedirect } from "@/lib/auth";
import { getCreatorAccessRequests } from "@/actions/creator/get-creator-access-request";

import { CreatorAccessRequestForm } from "./_components/creator-access-request-form";

const AnalyticsPage = async () => {
  const user = await getCurrentUserOrRedirect();
  const response = await getCreatorAccessRequests();

  let existingCreatorAccessRequest;
  if (response.success && response.success.pendingRequests.length > 0) {
    existingCreatorAccessRequest = response.success.pendingRequests[0];
  }

  return (
    <div className="space-y-7">
      {user.role === USER_ROLE.USER ? (
        <>
          <div className="space-y-2">
            <AlertMessage
              variant="warning"
              message="You are not a creator. If you want to become a creator, please request creator access"
            />

            {existingCreatorAccessRequest && (
              <AlertMessage
                variant="info"
                message="You have already submitted a creator access request. Please wait for it to be approved. You can edit your proposal till it's not approved by the admin"
              />
            )}
          </div>

          <CreatorAccessRequestForm
            initialData={existingCreatorAccessRequest}
          />
        </>
      ) : (
        <>
          <Heading
            title="Analytics Page"
            subtitle="View the analytics of all your channels and courses here"
          />
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
