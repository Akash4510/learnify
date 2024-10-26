import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm">
      <div className="flex items-center gap-2 justify-end w-full">
        <Button variant="accent" asChild>
          <Link href="/">
            <LogOut size={18} className="md:mr-2" />
            <span className="hidden md:flex">Exit</span>
          </Link>
        </Button>

        <UserButton />
      </div>
    </div>
  );
};
