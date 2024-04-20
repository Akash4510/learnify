"use client";

import { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  data: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

export const ChaptersList = ({ data, onEdit, onReorder }: ChapterListProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [chapters, setChapters] = useState<Chapter[]>(data);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reoderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reoderedItems);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id) + 1,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-background/50 text-muted-foreground rounded-md mb-2 text-sm",
                      chapter.isPublished &&
                        "bg-background/80 text-primary-foreground font-medium"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r hover:bg-background rounded-l-md transition",
                        chapter.isPublished && "border-r-accent"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="size-5" />
                    </div>

                    {chapter.title}

                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && (
                        <Badge className="bg-primary/80">Free</Badge>
                      )}
                      <Badge
                        className={cn(
                          "bg-slate-700 hover:bg-slate-700",
                          chapter.isPublished &&
                            "bg-primary/50 hover:bg-primary/50"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="size-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
