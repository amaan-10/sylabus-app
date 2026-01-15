"use client";

import { Question, truncate } from "@/lib/utility/helper";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

export const SortableQuestionItem = ({
  q,
  index,
  onRemove,
}: {
  q: Question;
  index: number;
  onRemove: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: q.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex gap-3 items-start"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400 hover:text-slate-700 pt-1"
        title="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">
          {index + 1}. {truncate(q.text, 70)}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {q.type} • {q.marks} marks
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(q.id)}
        className="cursor-pointer text-red-600"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export const SortableExamQuestionItem = ({
  q,
  index,
}: {
  q: Question;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: q.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded border bg-slate-50 p-2 flex gap-2 items-start text-xs"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400"
      >
        <GripVertical className="w-3 h-3" />
      </button>

      <div className="flex-1">
        {index + 1}. {truncate(q.text, 70)} ({q.marks})
      </div>
    </div>
  );
};
