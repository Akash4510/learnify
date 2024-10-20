"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { z } from "zod";
import {
  ImageIcon,
  Pencil,
  PlusCircle,
  VideoIcon,
  VideoOffIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";
import MuxPlayer from "@mux/mux-player-react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { editCourse } from "@/actions/course";
import { MuxData } from "@prisma/client";
import { editChapter } from "@/actions/course/chapter";

interface ChapterVideoFormProps {
  channelId: string;
  courseId: string;
  chapterId: string;
  videoUrl: string | null;
  muxData?: MuxData | null;
}

const formSchema = z.object({
  videoUrl: z.string().optional(),
});

type formSchema = z.infer<typeof formSchema>;

export const ChapterVideoForm = ({
  channelId,
  courseId,
  chapterId,
  videoUrl,
  muxData,
}: ChapterVideoFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    // if (thumbnail === values.thumbnail) {
    //   toast.info("No modifications!");
    //   return;
    // }

    startTransition(() => {
      editChapter({ channelId, courseId, chapterId, values })
        .then((data) => {
          const { error, success } = data;
          if (success) {
            toast.success("Course video updated");
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
        <p className="text-base">Chapter Video</p>

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
            ) : videoUrl ? (
              <>
                <Pencil className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">
                  Edit <span className="hidden lg:flex ml-1"> video</span>
                </span>
              </>
            ) : (
              <>
                <PlusCircle className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">
                  Add <span className="hidden lg:flex ml-1">video</span>
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
              endpoint="chapterVideo"
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url });
                }
              }}
            />
            <p className="text-xs text-muted-foreground mt-4">
              Upload this chapter&apos;s video
            </p>
          </div>
        ) : videoUrl ? (
          <div>
            <div className="rounded-md bg-background/30 aspect-video flex items-center justify-center relative overflow-hidden">
              <MuxPlayer playbackId={muxData?.playbackId || undefined} />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Video can take a few minutes to process. Refresh the page if video
              does not appear.
            </p>
          </div>
        ) : (
          <div className="rounded-md bg-background/30 aspect-video flex flex-col gap-2 items-center justify-center relative">
            <VideoOffIcon className="size-7" />
            <p className="text-xs md:text-sm text-muted-foreground">
              No video added
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
