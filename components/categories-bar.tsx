"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoriesProps {
  data: Category[];
}

export const CategoriesBar = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id?: string) => {
    const query = { categoryId: categoryId !== id ? id : null };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    //! ScrollArea needs a fixed width to work properly, so here I am calculating the fix width of the scrollbar in the following way -
    //! [widthOfTheScreen - sidebarWidth - 1rem padding on each side], as there is no sidebar on the devices less than size md therefore we are neglecting it.
    <ScrollArea className="w-[calc(100vw-2rem)] md:w-[calc(100vw-6rem-2rem)]">
      <div className="space-x-2 flex py-1 md:mb-2">
        <button
          onClick={() => onClick(undefined)}
          className={cn(
            "text-center text-xs md:text-[0.8rem] px-3 md:px-4 py-2 rounded-md bg-accent hover:opacity-75 transition flex-shrink-0",
            !categoryId &&
              "bg-primary-foreground/30 text-primary-foreground font-medium"
          )}
        >
          All
        </button>

        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => onClick(item.id)}
            className={cn(
              "text-center text-xs md:text-sm px-3 md:px-4 py-2 rounded-md bg-accent hover:opacity-75 transition flex-shrink-0",
              item.id === categoryId &&
                "bg-primary-foreground/30 text-primary-foreground font-medium"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <ScrollBar
        orientation="horizontal"
        className="cursor-grab bg-border hidden md:flex"
      />
    </ScrollArea>
  );
};
