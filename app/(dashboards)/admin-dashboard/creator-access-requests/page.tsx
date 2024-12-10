import { Heading } from "@/components/heading";
import { db } from "@/lib/db";
import { CREATOR_ACCESS_REQUEST_STATUS } from "@prisma/client";

import { PendingRequest } from "./_components/pending-request";

const CreatorAccessRequestsPage = async () => {
  const requests = await db.creatorAccessRequest.findMany({
    include: {
      user: true,
    },
  });

  const approvedRequests = requests.filter(
    (req) => req.status === CREATOR_ACCESS_REQUEST_STATUS.APPROVED
  );
  const pendingRequests = requests.filter(
    (req) => req.status === CREATOR_ACCESS_REQUEST_STATUS.PENDING
  );
  const rejectedRequests = requests.filter(
    (req) => req.status === CREATOR_ACCESS_REQUEST_STATUS.REJECTED
  );

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <Heading
          title="Creator access requests"
          subtitle="Manage all the creator access requests here."
        />

        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <PendingRequest key={request.id} request={request} />
          ))}
        </div>
      </div>

      {/* <div className="space-y-6">
        <Heading
          title="Rejected requests"
          subtitle="See all the rejected creator access requests here."
        />

        <div className="space-y-4">
          {rejectedRequests.map((request) => (
            <PendingRequest key={request.id} request={request} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Heading
          title="Approved requests"
          subtitle="See all the approved creator access requests here."
        />

        <div className="space-y-4">
          {approvedRequests.map((request) => (
            <PendingRequest key={request.id} request={request} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default CreatorAccessRequestsPage;
