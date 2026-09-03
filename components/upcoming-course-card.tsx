import React from "react";
import Image from "next/image";

import { Course } from "@prisma/client";

interface CourseCardProps {
  course: Course;
}

export const UpcomingCourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-md cursor-pointer aspect-video bg-accent">
      <Image
        src={course.thumbnail || "/images/hero.png"}
        alt={course.title}
        width={1080}
        height={1350}
        className="rounded-md object-cover group-hover:scale-110 transition-all duration-500 aspect-video"
      />
    </div>
  );
};
