import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CoursePageProps {
  params: {
    channelId: string;
  };
}

const CoursesPage = ({ params }: CoursePageProps) => {
  return (
    <Button variant="accent" asChild>
      <Link href={`/dashboard/channels/${params.channelId}/courses/create`}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add a course
      </Link>
    </Button>
  );
};

export default CoursesPage;
