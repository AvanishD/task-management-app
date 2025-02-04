"use client";

import { useState, useEffect } from "react";

function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Checkbox({ checked, onChange }) {
  return <input type="checkbox" checked={checked} onChange={onChange} />;
}

function Input({ type = "text", value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
}

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", dueDate: "", completed: false });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex gap-2 my-4">
        <Input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <Input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>
                <Checkbox
                  checked={task.completed}
                  onChange={() => {
                    fetch(`/api/tasks/${task._id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ completed: !task.completed }),
                    }).then(() => {
                      setTasks(
                        tasks.map((t) =>
                          t._id === task._id ? { ...t, completed: !t.completed } : t
                        )
                      );
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
