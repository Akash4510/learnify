"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Course } from "@prisma/client";

import { CourseCard } from "./course-card";

interface CoursesCarouselProps {
  data: (Course & {
    channel: {
      id: string;
      name: string;
      logo: string | null;
    };
  })[];
}

export const CoursesCarousel = ({ data }: CoursesCarouselProps) => {
  const params = useSearchParams();
  const searchCategoryId = params.get("categoryId");

  const [courses, setCourses] = useState<
    (Course & {
      channel: {
        id: string;
        name: string;
        logo: string | null;
      };
    })[]
  >(data);

  useEffect(() => {
    if (searchCategoryId) {
      const filteredData = data.filter(
        (course) => course.categoryId === searchCategoryId
      );

      setCourses(filteredData);
    } else {
      setCourses(data);
    }
  }, [data, searchCategoryId]);

  if (courses.length === 0) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-3xl">
          {searchCategoryId
            ? `No courses found for category - '${searchCategoryId}'`
            : "No courses found"}
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
