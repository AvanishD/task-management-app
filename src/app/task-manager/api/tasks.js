import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  completed: Boolean,
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title, description, dueDate, completed } = req.body;
    const newTask = new Task({ title, description, dueDate, completed });
    await newTask.save();
    return res.status(201).json(newTask);
  }

  res.status(405).json({ error: "Method not allowed" });
}
