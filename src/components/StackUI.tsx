"use client";

import React, { useState, ReactNode } from "react";
import { Box, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Image from "next/image";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type StackUIProps = {
  children: ReactNode[] | ReactNode;
  onOrderChange?: (children: ReactNode[]) => void;
  className?: string;
};

export default function StackUI({ children, onOrderChange, className }: StackUIProps) {
  const childArray = React.Children.toArray(children);
  const [order, setOrder] = useState<number[]>(() => childArray.map((_, i) => i));
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as number);
      const newIndex = order.indexOf(over.id as number);
      const newOrder = arrayMove(order, oldIndex, newIndex);
      setOrder(newOrder);
      if (onOrderChange) {
        const reorderedChildren = newOrder.map((i) => childArray[i]);
        onOrderChange(reorderedChildren);
      }
    }
  }

  return (
    <Box
      className={className}
      width='100vw'
      paddingX='23vw'
      paddingY={4}
    >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(e) => setActiveId(e.active.id as number)}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {order.map((id) => (
                <SortableBlock key={id} id={id}>
                  {childArray[id]}
                </SortableBlock>
              ))}
            </Box>
          </SortableContext>

          {/* Floating preview while dragging */}
          <DragOverlay>
            {activeId !== null ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: "100%",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  bgcolor: "background.paper",
                  p: 2,
                }}
              >
                <IconButton size="small" sx={{ cursor: "grab", color: "text.secondary" }}>
                  <DragIndicatorIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>{childArray[activeId]}</Box>
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>
    </Box>
  );
}

function SortableBlock({ id, children }: { id: number; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        width: "100%",
        position: "relative",
        opacity: isDragging ? 0.4 : 1,
        ":hover .drag-handle": { opacity: 1 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          className="drag-handle"
          aria-label="drag"
          size="small"
          {...attributes}
          {...listeners}
          sx={{
            cursor: "grab",
            color: "text.secondary",
            opacity: 0,
            transition: "opacity 0.2s",
          }}
        >
          <DragIndicatorIcon />
        </IconButton>
      </Box>
      {children}
    </Box>
  );
}
