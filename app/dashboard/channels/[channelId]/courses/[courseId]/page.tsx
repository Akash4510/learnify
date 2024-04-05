import { redirect } from "next/navigation";
import { File, IndianRupee, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Heading } from "@/components/heading";
import { IconBadge } from "@/components/ui/icon-badge";

import { TitleForm } from "@/components/dashboard/courses/title-form";
import { DescriptionForm } from "@/components/dashboard/courses/description-form";
import { ThumbnailForm } from "@/components/dashboard/courses/thumbnail-form";
import { CategoryForm } from "@/components/dashboard/courses/category-form";
import { PriceForm } from "@/components/dashboard/courses/price-form";
import { AttachmentForm } from "@/components/dashboard/courses/attachment-form";
import { ChaptersForm } from "@/components/dashboard/courses/chapters-form";

interface CoursePageProps {
  params: {
    channelId: string;
    courseId: string;
  };
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  if (!channel) {
    return redirect("/dashboard");
  }

  if (channel.creatorId !== user.id) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      channelId: channel.id,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect(`/dashboard/channels/${params.channelId}`);
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFeilds = [
    course.title,
    course.description,
    course.thumbnail,
    course.price,
    course.categoryId,
    // We also need atleast one chapter to be published
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFeilds = requiredFeilds.length;
  const completedFeilds = requiredFeilds.filter(Boolean).length;

  const completionText = `(${completedFeilds}/${totalFeilds})`;

  return (
    <div className="space-y-6">
      <Heading
        title="Course setup"
        subtitle={`Complete all of the feilds to setup ${completionText}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>

          <TitleForm
            channelId={params.channelId}
            courseId={course.id}
            title={course.title}
          />

          <DescriptionForm
            channelId={params.channelId}
            courseId={course.id}
            description={course.description}
          />

          <ThumbnailForm
            channelId={params.channelId}
            courseId={course.id}
            thumbnail={course.thumbnail}
          />

          <CategoryForm
            channelId={params.channelId}
            courseId={course.id}
            categoryId={course.categoryId}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListChecks} />
            <h2 className="text-xl">Course chapters</h2>
          </div>

          <ChaptersForm
            channelId={params.channelId}
            courseId={course.id}
            chapters={course.chapters}
          />

          <div className="flex items-center gap-x-2">
            <IconBadge icon={IndianRupee} />
            <h2 className="text-xl">Sell your course</h2>
          </div>

          <PriceForm
            channelId={params.channelId}
            courseId={course.id}
            price={course.price}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl">Resources & attachments</h2>
          </div>

          <AttachmentForm
            channelId={params.channelId}
            courseId={course.id}
            attchments={course.attachments}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
