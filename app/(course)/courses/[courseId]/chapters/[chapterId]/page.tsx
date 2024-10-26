import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { getChapter } from "@/actions/course/chapter";
import { AlertMessage } from "@/components/ui/alert-message";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";

interface CahpterPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const CahpterPage = async ({ params }: CahpterPageProps) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/");
  }

  const { success, error } = await getChapter({
    userId: user.id,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (error) {
    notFound();
  }

  const {
    data: {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    },
  } = success;

  if (!chapter || !course) {
    redirect("/courses");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <AlertMessage
          variant="success"
          message="You already completed this chapter"
          className="rounded-none"
        />
      )}

      {isLocked && (
        <AlertMessage
          variant="warning"
          message="You need to purchase this course to watch this chapter"
          className="rounded-none"
        />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>

        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

            {purchase ? (
              <div></div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>

          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File className="size-4" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CahpterPage;
