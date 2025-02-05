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
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add Task
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

  // Update Task
  const updateTask = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      setEditingTask(null); // Exit edit mode after update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

    if (res.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  return (
    <div className="task-manager">
      <h1 className="title">Task Manager</h1>
      
      {/* Input Fields for New Task */}
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

      {/* Task Table */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>
                {editingTask?._id === task._id ? (
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingTask?._id === task._id ? (
                  <input
                    type="text"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingTask?._id === task._id ? (
                  <input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                ) : (
                  task.dueDate
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => updateTask(task._id, { completed: !task.completed })}
                />
              </td>
              <td>
                {editingTask?._id === task._id ? (
                  <button className="update-button" onClick={() => updateTask(task._id, editingTask)}>Save</button>
                ) : (
                  <button className="edit-button" onClick={() => setEditingTask(task)}>Edit</button>
                )}
                <button className="delete-button" onClick={() => deleteTask(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
