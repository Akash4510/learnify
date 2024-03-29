import { Categories } from "@/components/categories";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="pb-3 space-y-2">
      <div className="pb-1.5 sticky top-0 space-y-2 backdrop-blur-xl">
        <Categories data={categories} />
      </div>

      <p>Hello there</p>
    </div>
  );
};

export default CoursesPage;
