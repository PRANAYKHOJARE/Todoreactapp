import { useTodos } from "../context/TodoContext";
import { TodoItem } from "./TodoItem";
import { TodoFilter } from "./TodoFilter";
import { ClipboardList } from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function TodoList() {
  const { state, dispatch } = useTodos();

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = state.todos.filter((todo) => todo.completed).length;

  const total = state.todos.length;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    dispatch({
      type: "REORDER_TODOS",
      payload: {
        activeId: String(active.id),
        overId: String(over.id),
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {total === 0 ? (
            "No tasks yet"
          ) : (
            <>
              <span className="font-semibold text-black">{total - completedCount}</span> of{" "}
              <span className="font-semibold text-black">{total}</span> remaining
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <TodoFilter />

          {completedCount > 0 && (
            <button
              onClick={() =>
                dispatch({
                  type: "CLEAR_COMPLETED",
                })
              }
              className="rounded-md px-3 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}

      {filteredTodos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
          <ClipboardList size={60} className="mb-3 text-gray-400" />

          <p className="text-sm font-medium text-gray-500">
            {state.filter === "all" ? "Your list is empty" : `No ${state.filter} tasks`}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {state.filter === "all"
              ? "Add a task above to get started"
              : "Switch filters to see more"}
          </p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={filteredTodos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
