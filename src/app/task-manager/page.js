"use client";

import { useState, useEffect } from "react";
import "./TaskManager.css";

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
    <div className="task-manager">
      <h1 className="title">Task Manager</h1>
      <div className="task-inputs">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button className="add-button" onClick={addTask}>Add Task</button>
      </div>
      <table className="task-table">
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
                <input
                  type="checkbox"
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
