import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";

interface CoursePageProps {
  params: {
    courseId: string;
  };
  searchParams: {
    ref?: string | null;
  };
}

const CoursePage = async ({ params, searchParams }: CoursePageProps) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const ref = searchParams.ref;

  if (ref) {
    // Store the referral token in a secure, HTTP-only cookie
    cookies().set("referralToken", ref, {
      httpOnly: true, // Prevents access via client-side JavaScript
      secure: true, // Only send over HTTPS
      path: "/", // Cookie is available across the site
      // No maxAge or expires set, making it a session cookie
    });

    // Optionally log the referral token for debugging
    console.log(`Referral token stored: ${ref}`);
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0]?.id}`);
};

export default CoursePage;
