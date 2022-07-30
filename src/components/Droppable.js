import { useDroppable } from "@dnd-kit/core";
import React from "react";

export default function Droppable({ children, id }) {
  const { isOver, setNodeRef } = useDroppable({
    id
  });
  const style = {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-md ${
        isOver ? "ring-2 ring-offset-4 ring-indigo-500" : ""
      }`}
    >
      {children}
    </div>
  );
}
