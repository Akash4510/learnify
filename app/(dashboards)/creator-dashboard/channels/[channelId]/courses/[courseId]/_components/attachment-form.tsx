"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { PlusCircle, X } from "lucide-react";
import { toast } from "sonner";
import { Attachment } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { CourseAttachment } from "./attachment";
import { addAttachment } from "@/actions/course/attachment";

interface AttachmentFormProps {
  channelId: string;
  courseId: string;
  attchments: Attachment[];
}

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Attachment url is required",
  }),
});

type formSchema = z.infer<typeof formSchema>;

export const AttachmentForm = ({
  channelId,
  courseId,
  attchments,
}: AttachmentFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    startTransition(() => {
      addAttachment(courseId, values.url).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success.message);
          toggleEditing();
        }
      });
    });
  };

  return (
    <div className="bg-accent rounded-md p-4">
      <div className="text-base flex items-center justify-between gap-4 px-0.5">
        <p className="text-base">Course attachments</p>

        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isPending}
            className="bg-accent hover:bg-muted-foreground/20 h-8 transition-all"
            onClick={() => {
              toggleEditing();
            }}
          >
            {isEditing ? (
              <>
                <X className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">Cancel</span>
              </>
            ) : (
              <>
                <PlusCircle className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">
                  Add <span className="hidden lg:flex ml-1">a file</span>
                </span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-4">
        {isEditing && (
          <div>
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              Add anything your students might need to complete the course
            </div>
          </div>
        )}

        {attchments.length !== 0 ? (
          <div className="space-y-2">
            {attchments.map((attachment) => (
              <CourseAttachment key={attachment.id} attachment={attachment} />
            ))}
          </div>
        ) : (
          <p className="font-light text-sm py-2 bg-background/30 px-4 rounded-md font-mono opacity-75">
            No attachments yet
          </p>
        )}
      </div>
    </div>
  );
};
