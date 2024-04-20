"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger className="md:hidden pr-4" onClick={() => setIsOpen(true)}>
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="p-0 pt-10 w-30">
        <Sidebar afterNavItemClick={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
