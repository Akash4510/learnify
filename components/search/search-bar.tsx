"use client";

import { useEffect, useState, ChangeEventHandler } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import qs from "query-string";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const searchQuery = searchParams.get("q");

  const [value, setValue] = useState(searchQuery || "");
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      q: debouncedValue,
      categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, categoryId]);

  return (
    <div className="relative">
      <SearchIcon className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />

      <Input
        onChange={onChange}
        value={value}
        placeholder="Search learnify..."
        className="bg-accent/80 focus-visible:bg-accent pl-10 border-none outline-[0px] ring-transparent focus-visible:border-none focus-visible:outline-[0px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
    </div>
  );
};
