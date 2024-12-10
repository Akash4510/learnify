import { Heading } from "@/components/heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { AlertMessage } from "@/components/ui/alert-message";
import { ChapterActions } from "./_components/chapter-actions";

interface ChapterPageProps {
  params: {
    channelId: string;
    courseId: string;
    chapterId: string;
  };
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    redirect("/");
  }

  const requiredFeilds = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFeilds = requiredFeilds.length;
  const completedFeilds = requiredFeilds.filter(Boolean).length;

  const completionText = `(${completedFeilds}/${totalFeilds})`;
  const isComplete = requiredFeilds.every(Boolean);

  return (
    <>
      <div className="space-y-6">
        {!chapter.isPublished && (
          <AlertMessage
            variant="warning"
            message="This chapter is unpublished. It will not be visible in the courses"
          />
        )}

        <div>
          <Link
            href={`/dashboard/channels/${params.channelId}/courses/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition my-2 mb-4"
          >
            <ArrowLeft className="size-4 mr-2" /> Back to course setup
          </Link>

          <div className="flex items-center justify-between">
            <Heading
              title="Chapter Creation"
              subtitle={`Complete all fields ${completionText}`}
            />

            <ChapterActions
              disabled={!isComplete}
              channelId={params.channelId}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.isPublished}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>

            <ChapterTitleForm
              title={chapter.title}
              channelId={params.channelId}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />

            <ChapterDescriptionForm
              description={chapter.description}
              channelId={params.channelId}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />

            <div className="space-y-6">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>

              <ChapterAccessForm
                isFree={chapter.isFree}
                channelId={params.channelId}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>

            <ChapterVideoForm
              videoUrl={chapter.videoUrl}
              muxData={chapter.muxData}
              channelId={params.channelId}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterPage;
