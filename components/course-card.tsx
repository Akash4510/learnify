"use client";

import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, EllipsisVertical, ImageIcon, Tv } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateRelativeToNow } from "@/lib/utils";
import { CourseWithCategoryAndSafeChannel } from "@/types/course";

interface CourseCardProps {
  course: CourseWithCategoryAndSafeChannel;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="group border bg-accent/60 rounded-md hover:scale-[1.02] transition-transform duration-300 pb-1">
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

      <div className="p-4 space-y-3">
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
            <div className="text-muted-foreground text-sm line-clamp-1">
              <p>{course.description}</p>
            </div>
          </div>
        </div>

        <div className="ml-12">
          <div className="flex items-center gap-1.5">
            <Link
              href={`/channels/${course.channel.id}`}
              className="hover:underline"
            >
              <p className="text-sm">{course.channel.name}</p>
            </Link>

            <BadgeCheck className="size-3" />
          </div>
          <div className="text-xs flex items-center gap-2">
            <p>2M Views</p>
            <p className="font-2xl font-extrabold">.</p>
            <p>{formatDateRelativeToNow(course.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
