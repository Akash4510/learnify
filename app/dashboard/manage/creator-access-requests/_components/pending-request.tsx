"use client";

import { useTransition } from "react";
import { Check, Loader2, UserIcon, X } from "lucide-react";
import { CreatorAccessRequest, User } from "@prisma/client";
import { toast } from "sonner";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { approveCreatorAccess } from "@/actions/admin/creator-access-request/approve-creator-access";
import { rejectCreatorAccess } from "@/actions/admin/creator-access-request";

interface PendingRequestProps {
  request: CreatorAccessRequest & {
    user: User;
  };
}

export const PendingRequest = ({ request }: PendingRequestProps) => {
  const [isPending, startTransition] = useTransition();

  const onApprove = async () => {
    startTransition(() => {
      approveCreatorAccess({ requestId: request.id })
        .then((data) => {
          const { success, error } = data;

          if (success) {
            toast.success(success.message);
          }

          if (error) {
            toast.error(error.message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  const onReject = async () => {
    startTransition(() => {
      rejectCreatorAccess({ requestId: request.id })
        .then((data) => {
          const { success, error } = data;

          if (success) {
            toast.success(success.message);
          }

          if (error) {
            toast.error(error.message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className="border bg-accent p-5 rounded-md space-y-5 overflow-hidden">
      <div className="flex justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-center gap-4">
          {request.user.image ? (
            <UserAvatar url={request.user.image} size={40} />
          ) : (
            <div className="bg-secondary rounded-full p-2">
              <UserIcon className="size-6" />
            </div>
          )}
          <div>
            <p className="font-bold">{request.user.name}</p>
            <p>{request.user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                <X className="size-4 mr-1.5" />
                Reject
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl tracking-wider">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will reject the creator
                  access for {request.user.email}.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  size="sm"
                  className="w-28"
                  disabled={isPending}
                  onClick={onReject}
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Yes, Reject"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                <Check className="size-4 mr-1.5" />
                Approve
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl tracking-wider">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will give the creator
                  access to {request.user.email}. They can create courses after
                  getting the access.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  size="sm"
                  className="w-28"
                  disabled={isPending}
                  onClick={onApprove}
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Yes, Approve"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <h4 className="font-bold text-muted-foreground">
            Want&apos;s to teach:
          </h4>
          <p>{request.topic}</p>
        </div>
        <div>
          <h4 className="font-bold text-muted-foreground">Proposal:</h4>
          <p>{request.proposal}</p>
        </div>
      </div>
    </div>
  );
};
