import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  SectionPanel as SectionPanelUI,
  SectionPagePanel as SectionPagePanelUI,
  SidebarPagePanel as SidebarPagePanelUI,
  SidebarPanel as SidebarPanelUI,
  Droppable,
  Draggable,
  EmptySectionPagePanel as EmptySectionPagePanelUI,
  EmptySidebarPagePanel as EmptySidebarPagePanelUI,
  Button,
  SidebarLayout
} from "./components";
import { data } from "./constants";

function Sidebar({ pages }) {
  return (
    <>
      <SidebarPanelUI>
        {pages.map((page) => (
          <React.Fragment key={page.id}>
            <Draggable id={page.id}>
              <SidebarPagePanelUI page={page} />
            </Draggable>
          </React.Fragment>
        ))}
        {pages.length === 0 && <EmptySidebarPagePanelUI />}
      </SidebarPanelUI>
    </>
  );
}

function SectionPagePanel({ id, page }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <SectionPagePanelUI
      id={id}
      page={page}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
}

function SectionPanel({ section, setSection }) {
  const [activeId, setActiveId] = useState(null);
  const pages = section.pages;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  return (
    <>
      <SectionPanelUI section={section}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext
            items={pages.map((page) => `sortable-${page.id}`)}
            strategy={verticalListSortingStrategy}
          >
            {pages.map((page) => (
              <SectionPagePanel
                key={page.id}
                id={`sortable-${page.id}`}
                page={page}
              />
            ))}
            <EmptySectionPagePanelUI />
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <SectionPagePanelUI
                id={activeId}
                page={pages.find((page) => `sortable-${page.id}` === activeId)}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </SectionPanelUI>
    </>
  );

  function handleDragStart(event) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const pagesClone = Object.assign([], section.pages);
      const oldIndex = pagesClone.findIndex(
        (page) => `sortable-${page.id}` === active.id
      );
      const newIndex = pagesClone.findIndex(
        (page) => `sortable-${page.id}` === over.id
      );
      setSection({ ...section, pages: arrayMove(pages, oldIndex, newIndex) });
    }
    setActiveId(null);
  }
}

export default function NewResource() {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [pages, setPages] = useState(data.pages);

  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    setSections((sections) =>
      sections.map((section) => {
        if (section.id === over.id) {
          section.pages.push(pages.find((page) => page.id === active.id));
        }
        return section;
      })
    );
    setPages(pages.filter((page) => page.id !== active.id));
  }

  function setSection(section) {
    setSections((sections) =>
      sections.map((_section) => {
        if (_section.id === section.id) {
          return section;
        }
        return _section;
      })
    );
  }

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SidebarLayout
          sidebar={
            <>
              <Sidebar pages={pages} />
            </>
          }
        >
          <div className="p-20 space-y-4 flex-1">
            <div className="flex justify-between">
              <Button
                onClick={() =>
                  setSections([
                    ...sections,
                    {
                      id: `section-${sections.length + 1}`,
                      title: `Section - ${sections.length + 1}`,
                      pages: []
                    }
                  ])
                }
              >
                Add Empty Section
              </Button>
            </div>
            {sections.map((section) => (
              <Droppable id={section.id} key={section.id}>
                <SectionPanel section={section} setSection={setSection} />
              </Droppable>
            ))}
          </div>
        </SidebarLayout>
        <DragOverlay>
          {activeId ? (
            <SidebarPagePanelUI
              page={pages.find((page) => page.id === activeId)}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
