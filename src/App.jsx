import { useState } from "react";
import { useTodos } from "./context/TodoContext";
import { TodoItem } from "./components/TodoItem";

function App() {
  const { todos, loading, addTodo } = useTodos();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [filter, setFilter] = useState("All");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await addTodo(text, category);

    setText("");
    setCategory("Personal");
  };

  const filteredTodos = filter === "All" ? todos : todos.filter((todo) => todo.category === filter);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur">
          <h1 className="mb-2 text-center text-5xl font-bold">Sweet Tasks 🍭</h1>

          <p className="mb-8 text-center text-gray-500">Organize your day beautifully</p>

          {/* Add Todo Form */}
          <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
            <input
              type="text"
              placeholder="Add a new task..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-gray-200 px-4 py-3"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
            </select>

            <button
              type="submit"
              className="rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Add
            </button>
          </form>

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Tasks ({filteredTodos.length})</h2>

            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
              Productivity Mode
            </span>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["All", "Work", "Personal", "Study"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  filter === cat ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
                ✨ No tasks found.
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  id={todo._id}
                  text={todo.text}
                  completed={todo.completed}
                  category={todo.category}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
