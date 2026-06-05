import { useState } from "react";
import { Plus } from "lucide-react";
import { useTodos } from "../context/TodoContext";

const MAX_LENGTH = 100;

export function TodoForm() {
  const [text, setText] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) return;

    await addTodo(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          maxLength={MAX_LENGTH}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-white transition hover:scale-105"
        >
          <Plus size={18} />
          Add
        </button>
      </form>

      <div className="mt-2 flex justify-end">
        <span className="text-xs text-gray-500">
          {text.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
