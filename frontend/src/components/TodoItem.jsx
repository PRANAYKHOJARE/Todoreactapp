import { useState } from "react";
import { motion } from "framer-motion";
import { useTodos } from "../context/TodoContext";
import { Pencil, Trash2, Check, X, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TodoItem({ id, text, completed, category, priority, createdAt, dueDate }) {
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

  const badgeColor =
    category === "Work"
      ? "bg-blue-100 text-blue-700"
      : category === "Study"
        ? "bg-purple-100 text-purple-700"
        : "bg-green-100 text-green-700";

  const priorityColor =
    priority === "High"
      ? "bg-red-100 text-red-700"
      : priority === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";

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

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`group flex items-center gap-3 rounded-2xl border p-4 backdrop-blur-sm transition-all
      ${completed ? "border-green-200 bg-green-50" : "border-white bg-white shadow-md"}
      ${isDragging ? "scale-105 shadow-2xl ring-2 ring-indigo-500" : ""}`}
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
      >
        <GripVertical size={16} />
      </button>

      {/* Animated Checkbox */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => toggleTodo(id)}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition
        ${completed ? "border-green-500 bg-green-500" : "border-gray-300"}`}
      >
        {completed && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check size={14} className="text-white" />
          </motion.div>
        )}
      </motion.button>

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button onClick={handleSave} className="rounded-lg p-2 hover:bg-green-100">
            <Check size={16} className="text-green-600" />
          </button>

          <button onClick={handleCancel} className="rounded-lg p-2 hover:bg-red-100">
            <X size={16} className="text-red-500" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <motion.p
              animate={{
                opacity: completed ? 0.6 : 1,
              }}
              className={`text-sm font-medium
    ${completed ? "text-gray-400 line-through" : "text-gray-800"}`}
            >
              {text}
            </motion.p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>
                {category}
              </span>

              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor}`}>
                {priority === "High" && "🔴 "}
                {priority === "Medium" && "🟡 "}
                {priority === "Low" && "🟢 "}
                {priority}
              </span>

              {dueDate && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  📅 Due: {new Date(dueDate).toLocaleDateString("en-GB")}
                </span>
              )}

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                🕒 Added: {new Date(createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => setIsEditing(true)}
            className="rounded-lg p-2 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-gray-100"
          >
            <Pencil size={16} />
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => deleteTodo(id)}
            className="rounded-lg p-2 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-100"
          >
            <Trash2 size={16} className="text-red-500" />
          </motion.button>
        </>
      )}
    </motion.div>
  );
}
