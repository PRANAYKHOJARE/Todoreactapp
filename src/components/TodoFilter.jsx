import { useTodos } from "../context/TodoContext";

export function TodoFilter() {
  const { state, dispatch } = useTodos();

  const allCount = state.todos.length;
  const activeCount = state.todos.filter((todo) => !todo.completed).length;
  const completedCount = state.todos.filter((todo) => todo.completed).length;

  const filters = [
    {
      label: `All (${allCount})`,
      value: "all",
    },
    {
      label: `Active (${activeCount})`,
      value: "active",
    },
    {
      label: `Completed (${completedCount})`,
      value: "completed",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() =>
            dispatch({
              type: "SET_FILTER",
              payload: filter.value,
            })
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            state.filter === filter.value
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
