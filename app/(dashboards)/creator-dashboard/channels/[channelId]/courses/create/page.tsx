import { Heading } from "@/components/heading";

import { CreateCourseForm } from "./_components/create-course-form";

interface CreateNewCoursePageProps {
  params: {
    channelId: string;
  };
}

const CreateNewCoursePage = ({ params }: CreateNewCoursePageProps) => {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <Heading
        title="Create a new course"
        subtitle="Start creating a new course and spread your knowledge through the course"
      />

      <CreateCourseForm channelId={params.channelId} />
    </div>
  );
};

export default CreateNewCoursePage;
