import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { Pencil, Trash2, Check, X, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TodoItem({ id, text, completed, category }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggle = () => {
    toggleTodo(id);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(id, editText);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const badgeColor =
    category === "Work"
      ? "bg-blue-100 text-blue-700"
      : category === "Study"
        ? "bg-purple-100 text-purple-700"
        : "bg-green-100 text-green-700";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
      ${completed ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}
      ${isDragging ? "scale-105 shadow-2xl ring-2 ring-blue-500" : ""}`}
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
      >
        <GripVertical size={16} />
      </button>

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
        className="h-4 w-4 cursor-pointer"
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            type="text"
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="flex-1 rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={handleSave} className="rounded p-2 hover:bg-green-100">
            <Check size={16} className="text-green-600" />
          </button>

          <button onClick={handleCancel} className="rounded p-2 hover:bg-red-100">
            <X size={16} className="text-red-500" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-1 items-center justify-between">
            <span
              className={`text-sm ${completed ? "line-through text-gray-400" : "text-gray-800"}`}
            >
              {text}
            </span>

            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}>
              {category}
            </span>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="rounded p-2 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDelete}
            className="rounded p-2 opacity-0 transition group-hover:opacity-100 hover:bg-red-100"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </>
      )}
    </div>
  );
}
