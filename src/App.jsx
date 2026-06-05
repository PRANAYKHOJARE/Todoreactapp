import { motion, AnimatePresence } from "framer-motion";
import { useTodos } from "./context/TodoContext";
import { TodoItem } from "./components/TodoItem";
import { useState } from "react";

function App() {
  const { todos, loading, addTodo } = useTodos();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [filter, setFilter] = useState("All");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);

    await addTodo(text, category, dueDate);

    setText("");
    setCategory("Personal");
    setDueDate("");
    setIsSubmitting(false);
  };

  const filteredTodos = filter === "All" ? todos : todos.filter((todo) => todo.category === filter);

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
        <motion.h1
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-2xl font-semibold"
        >
          Loading...
        </motion.h1>
      </div>
    );
  }

  return (
    /* 🛠️ FIXED: Added grid, items-center, justify-center, and padding to center it on the screen */
    <div className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center p-4 md:p-8">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      
      {/* Animated Blobs */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-400/20 blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-20 h-[450px] w-[450px] rounded-full bg-blue-400/20 blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-[140px] pointer-events-none"
      />

      {/* Main Form Box Container */}
      <div className="relative w-full max-w-3xl my-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/50 bg-white/70 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.04)]"
        >
          {/* Title and Progress Bar Header Header Row */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-semibold tracking-tight text-slate-900"
              >
                TaskPilot
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-slate-600 text-sm"
              >
                Smart task management for focused professionals.
              </motion.p>

              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  ✓ Online
                </span>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                  ⚡ Real-time Sync
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 bg-white/40 p-3 rounded-xl border border-white/60 min-w-[160px]">
              <p className="text-sm font-medium text-slate-600">Progress</p>

              <div className="flex items-center gap-3 w-full justify-between">
                {/* 🛠️ FIXED: Replaced 'w-' with 'w-24' to give the container layout volume */}
                <div className="h-2 w-24 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${todos.length ? (completedCount / todos.length) * 100 : 0}%`,
                    }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.3)]"
                  />
                </div>

                <span className="text-sm font-semibold text-slate-600 tabular-nums">
                  {completedCount}/{todos.length}
                </span>
              </div>

              <span className="text-xs text-slate-400">{pendingCount} remaining</span>
            </div>
          </div>

          {/* Stats Cards Dashboard Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-5 grid grid-cols-3 gap-4"
          >
            {[
              { title: "Total", value: todos.length, bg: "bg-indigo-50/80" },
              { title: "Completed", value: completedCount, bg: "bg-green-50/80" },
              { title: "Pending", value: pendingCount, bg: "bg-orange-50/80" },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                className={`${card.bg} rounded-xl p-3 text-center shadow-sm backdrop-blur-sm border border-white/40`}
              >
                <p className="text-xs md:text-sm font-medium text-slate-600">{card.title}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tabular-nums">{card.value}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Input Submission Fields Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="mb-5 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              placeholder="What needs your attention today?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-medium"
            />

            {/* 🛠️ FIXED: Sanitized newlines inside selectors */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-700 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            >
              <option value="Work">💼 Work</option>
              <option value="Personal">🏠 Personal</option>
              <option value="Study">📚 Study</option>
            </select>

            {/* 🛠️ FIXED: Sanitized string styles here too */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-700 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-sm text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-colors"
            >
              Add
            </motion.button>
          </motion.form>

          {/* List Section Section Division Headers */}
          <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Tasks</h2>
              <p className="text-sm text-slate-500">
                {pendingCount} pending • {completedCount} completed
              </p>
            </div>

            <motion.span
              whileHover={{ scale: 1.05 }}
              className="rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-bold text-indigo-600 shadow-sm"
            >
              🎯 Active Session
            </motion.span>
          </div>

          {/* Category Switch Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { label: "All", icon: "📋" },
              { label: "Work", icon: "💼" },
              { label: "Personal", icon: "🏠" },
              { label: "Study", icon: "📚" },
            ].map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(item.label)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === item.label
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Todo Scrollable View Frame */}
          <div className="max-h-[320px] overflow-y-auto overflow-x-hidden pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent w-full flex flex-col">
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/40 p-6 text-center backdrop-blur-sm shadow-sm select-none"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-3 text-4xl select-none pointer-events-none"
                >
                  📝
                </motion.div>

                <h3 className="text-base font-bold text-slate-800 tracking-tight">
                  Ready to get productive?
                </h3>

                <p className="mt-1 max-w-xs text-xs font-medium text-slate-400 leading-relaxed px-2">
                  {filter === "All"
                    ? "Create your first task and start building momentum."
                    : `No pending tasks found under the ${filter} category! 🎉`}
                </p>

                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-3.5 text-[10px] font-bold tracking-widest uppercase text-indigo-500"
                >
                  Your productivity journey starts here ✨
                </motion.p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredTodos.map((todo) => (
                  <motion.div
                    key={todo._id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.8,
                    }}
                    className="will-change-transform w-full min-w-0 block"
                  >
                    <TodoItem
                      id={todo._id}
                      text={todo.text}
                      completed={todo.completed}
                      category={todo.category}
                      dueDate={todo.dueDate}
                      createdAt={todo.createdAt}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;