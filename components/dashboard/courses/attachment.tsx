"use client";

import { useTransition } from "react";
import Link from "next/link";
import { File, Loader2, Trash } from "lucide-react";
import { Attachment } from "@prisma/client";
import { toast } from "sonner";

import { ConfirmationDialogTrigger } from "@/components/confirmation-dialog-trigger";
import { deleteAttachment } from "@/actions/course/attachment";

interface CourseAttachmentProps {
  attachment: Attachment;
}

export const CourseAttachment = ({ attachment }: CourseAttachmentProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(() => {
      deleteAttachment(attachment.courseId, attachment.id).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success.message);
        }
      });
    });
  };

  return (
    <div className="bg-background p-3 rounded-md border border-primary/40 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <File className="size-5 flex-shrink-0" />
        <Link
          href={attachment.url}
          target="_blank"
          className="text-xs font-bold hover:underline line-clamp-1"
        >
          {attachment.name}
        </Link>
      </div>

      <ConfirmationDialogTrigger
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete the attachment from our servers."
        onConfirm={handleDelete}
      >
        <button className="flex items-center justify-center bg-destructive rounded-md size-[1.85rem]">
          {isPending ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Trash className="size-4" />
          )}
        </button>
      </ConfirmationDialogTrigger>
    </div>
  );
};
