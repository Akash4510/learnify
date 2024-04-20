import { Category } from "@prisma/client";

import { Categories } from "@/components/categories";

interface CategoriesBarProps {
  data: Category[];
}

export const CategoriesBar = ({ data: categories }: CategoriesBarProps) => {
  return (
    <div className="w-[calc(100vw-0.5rem)] md:w-[calc(100vw-6.75rem)] h-16 fixed top-16 left-0 md:left-[5.7rem] pl-4 pr-2 md:pr-4 z-10 bg-background flex items-center">
      <Categories data={categories} />
    </div>
  );
};
