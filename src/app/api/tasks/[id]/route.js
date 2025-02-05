import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskmanager/tasks";

//Connect to DB
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

// PUT: Update a task by ID
export async function PUT(req, context) {
  try {
    await connectToDB();
    
    const id = context.params.id;
    const updateData = await req.json();

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a task by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}