"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  BookOpen,
  EllipsisVertical,
  ImageIcon,
  Tv,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CourseWithCategoryWithSafeChannelWithChaptersWithProgress } from "@/types/course";
import { CourseProgress } from "@/components/course-progress";

interface UserCourseCardProps {
  course: CourseWithCategoryWithSafeChannelWithChaptersWithProgress;
}

export const UserCourseCard = ({ course }: UserCourseCardProps) => {
  return (
    <div className="group border bg-accent/60 rounded-md transition-transform duration-300 pb-1">
      <Link href={`/courses/${course.id}`} tabIndex={-1}>
        <div className="relative h-48 overflow-hidden rounded-t-md cursor-pointer">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="rounded-t-md object-cover group-hover:scale-110 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-background/50">
              <ImageIcon className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No thumbnail!</p>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link href={`/channels/${course.channel.id}`} tabIndex={-1}>
            <Avatar className="size-10">
              <AvatarImage src={course.channel.logo || ""} />
              <AvatarFallback className="bg-muted">
                <Tv className="size-4" />
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1">
            <div className="w-full flex items-center justify-between gap-2">
              <Link href={`/courses/${course.id}`} className="hover:underline">
                <h2 className="font-medium text-lg line-clamp-1">
                  {course.title}
                </h2>
              </Link>

              <button className="hidden group-hover:flex cursor-pointer rounded-full">
                <EllipsisVertical className="size-4 font-bold" />
              </button>
            </div>

            <div className="text-xs flex items-center gap-2">
              <p className="flex items-center gap-1">
                <BadgeCheck className="size-3 rounded-full" />
                <Link
                  href={`/channels/${course.channel.id}`}
                  className="hover:underline"
                >
                  <p className="text-sm">{course.channel.name}</p>
                </Link>
              </p>
              {/* <p className="font-2xl font-extrabold text-muted-foreground">.</p> */}
              {/* <p className="text-muted-foreground">
                {formatDateRelativeToNow(course.createdAt)}
              </p> */}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
            <div className="bg-secondary rounded-full p-1.5">
              <BookOpen className="size-4" />
            </div>
            {course.chapters.length} chapters
          </div>
          <div className="mt-2.5">
            <CourseProgress value={course.progress || 0} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
