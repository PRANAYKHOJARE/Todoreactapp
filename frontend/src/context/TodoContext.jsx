import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

const API_URL = import.meta.env.VITE_API_URL + "/api/todos";

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async (text, category) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          category,
        }),
      });

      const newTodo = await res.json();

      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle Complete
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      const updatedTodo = await res.json();

      setTodos((prev) => prev.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Edit Todo
  const editTodo = async (id, text) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const updatedTodo = await res.json();

      setTodos((prev) => prev.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        addTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
