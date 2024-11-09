import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { Heading } from "@/components/heading";
import { getCourses } from "@/actions/course/get-courses";

import { UserCourses } from "./_components/user-courses";

const CoursesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const courses = await getCourses({ userId: user.id });

  const coursesInProgress = courses.filter((course) => course.progress !== 100);
  const completedCourses = courses.filter((course) => course.progress === 100);

  return (
    <div className="p-4 py-6">
      <div className="space-y-6">
        <Heading
          title="Enrolled Courses"
          subtitle="Access all of your enrolled courses here"
        />

        <div className="pb-10">
          <UserCourses data={coursesInProgress} />
        </div>
      </div>

      <div className="space-y-6">
        <Heading
          title="Completed Courses"
          subtitle="Access all of your completed courses here"
        />

        <div className="pb-10">
          <UserCourses data={completedCourses} />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
