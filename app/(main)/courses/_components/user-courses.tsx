import { CourseWithCategoryWithSafeChannelWithChaptersWithProgress } from "@/types/course";
import { UserCourseCard } from "@/components/user-course-card";

interface CoursesCarouselProps {
  data: CourseWithCategoryWithSafeChannelWithChaptersWithProgress[];
}

export const UserCourses = ({ data }: CoursesCarouselProps) => {
  const courses = data;

  if (courses.length === 0) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl">No courses found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <UserCourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};
