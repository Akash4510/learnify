import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { db } from "@/lib/db";
import { Hero } from "@/components/home/hero";
import { Heading } from "@/components/heading";
import { CoursesCarousel } from "@/components/courses-carousel";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const courses = await db.course.findMany({
    include: {
      channel: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
    },
  });

  return (
    <div className="pb-10">
      <Hero />

      {/* Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-6">
          <Heading
            title="Courses"
            subtitle="Explore courses for your learning"
          />

          <Button variant="accent" size="sm" asChild>
            <Link href="/courses">
              <span className="mr-2">See all</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <CoursesCarousel data={courses} />
      </div>
    </div>
  );
};

export default HomePage;
