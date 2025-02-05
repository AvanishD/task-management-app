import { NextResponse } from "next/server";
import mongoose from "mongoose";
//import Task from "@/models/Task";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskmanager";

// Function to connect to MongoDB
async function connectToDB() {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}

// Define Task Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  completed: Boolean,
}, { collection: "task" });

// Create Task Model
const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

// GET: Fetch all tasks
export async function GET() {
  try {
    await connectToDB();
    const tasks = await Task.find({});
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json([], { status: 500 }); // Always return an array
  }
}
// POST: Add a new task
export async function POST(req) {
  try {
    const { title, description, dueDate, completed } = await req.json();
    const newTask = new Task({ title, description, dueDate, completed });
    await newTask.save();
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
