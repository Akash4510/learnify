import { CourseCard } from "@/components/course-card";
import { CourseWithCategoryAndSafeChannel } from "@/types/course";

interface CoursesProps {
  data: CourseWithCategoryAndSafeChannel[];
}

export const Courses = ({ data }: CoursesProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
