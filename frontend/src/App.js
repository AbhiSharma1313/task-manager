import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch tasks
  const getTasks = async () => {
    const res = await axios.get("http://127.0.0.1:8000/tasks");
    setTasks(res.data);
  };

  // Add task
  const addTask = async () => {
    await axios.post("http://127.0.0.1:8000/tasks", {
  title: title,
});
    setTitle("");
    getTasks();
  };

  // Update task
  const markDone = async (id) => {
  await axios.put(`http://127.0.0.1:8000/tasks/${id}`);
  getTasks();
};

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/tasks/${id}`);
    getTasks();
  };

  const startEdit = (task) => {
  setEditId(task.id);
  setEditTitle(task.title);
};

// Update task title
const saveEdit = async (id) => {
  if (!editTitle.trim()) return;

  await axios.put(`http://127.0.0.1:8000/tasks/update/${id}`, {
    title: editTitle,
  });

  setEditId(null);
  setEditTitle("");
  getTasks();
};

const cancelEdit = () => {
  setEditId(null);
  setEditTitle("");
};

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <h2>Task Manager</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
  {editId === task.id ? (
    <>
      <input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />

      <div>
        <button onClick={() => saveEdit(task.id)}>Save</button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    </>
  ) : (
    <>
      <span className={task.status === "done" ? "completed" : ""}>
        {task.title}
      </span>

      <div>
        <button onClick={() => startEdit(task)}>Edit</button>
        <button onClick={() => markDone(task.id)}>✔️</button>
        <button onClick={() => deleteTask(task.id)}>❌</button>
      </div>
    </>
  )}
</li>
        ))}
      </ul>
    </div>
  );
}

export default App;