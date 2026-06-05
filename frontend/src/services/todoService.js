const API_URL = "http://localhost:5000/api/todos";

export const getTodos = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const createTodo = async (text) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return await res.json();
};

export const updateTodo = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const deleteTodoApi = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
