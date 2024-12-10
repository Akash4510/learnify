"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { z } from "zod";
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { editCourse } from "@/actions/course";

interface ThumbnailFormProps {
  channelId: string;
  courseId: string;
  thumbnail: string | null;
}

const formSchema = z.object({
  thumbnail: z.string().optional(),
});

type formSchema = z.infer<typeof formSchema>;

export const ThumbnailForm = ({
  channelId,
  courseId,
  thumbnail,
}: ThumbnailFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    if (thumbnail === values.thumbnail) {
      toast.info("No modifications!");
      return;
    }

    startTransition(() => {
      editCourse({ channelId, courseId, values })
        .then((data) => {
          const { error, success } = data;
          if (success) {
            toast.success("Course thumbnail updated");
            toggleEditing();
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
    <div className="bg-accent rounded-md p-4">
      <div className="text-base flex items-center justify-between gap-4 px-0.5">
        <p className="text-base">Course thumbnail</p>

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
            ) : thumbnail ? (
              <>
                <Pencil className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">
                  Edit <span className="hidden lg:flex ml-1"> thumbnail</span>
                </span>
              </>
            ) : (
              <>
                <PlusCircle className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">
                  Add <span className="hidden lg:flex ml-1">an image</span>
                </span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-3">
        {isEditing ? (
          <div>
            <FileUpload
              endpoint="courseThumbnail"
              onChange={(url) => {
                if (url) {
                  onSubmit({ thumbnail: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        ) : thumbnail ? (
          <div className="rounded-md bg-background/30 aspect-video flex items-center justify-center relative">
            <Image
              src={thumbnail}
              alt="course-thumbnail"
              fill
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="rounded-md bg-background/30 aspect-video flex flex-col gap-2 items-center justify-center relative">
            <ImageIcon className="size-7" />
            <p className="text-xs md:text-sm text-muted-foreground">
              No thumbnail added
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
