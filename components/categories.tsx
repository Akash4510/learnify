"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

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
    <ScrollArea className="w-full">
      <div className="w-full space-x-2 flex py-1 mb-2">
        <button
          onClick={() => onClick(undefined)}
          className={cn(
            "text-center text-xs md:text-sm px-2 md:px-4 py-2 rounded-md bg-accent hover:opacity-75 transition flex-shrink-0 text-primary-foreground/80",
            !categoryId && "bg-primary-foreground/20 text-primary-foreground"
          )}
        >
          All
        </button>

        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => onClick(item.id)}
            className={cn(
              "text-center text-xs md:text-sm px-2 md:px-4 py-2 rounded-md bg-accent hover:opacity-75 transition flex-shrink-0 text-primary-foreground/80",
              item.id === categoryId &&
                "bg-primary-foreground/20 text-primary-foreground"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
