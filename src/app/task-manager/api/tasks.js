const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI

// Database Name
const dbName = 'taskmanager'; // Replace with your database name

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected successfully to server');

        // Select the database
        const db = client.db(dbName);

        // Perform operations on the database
        const collection = db.collection('tasks');

    } finally {
        // Close the connection
        await client.close();
        console.log('Connection closed');
    }
}

// // Run the function
// run().catch(console.dir);
// const taskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   dueDate: String,
//   completed: Boolean,
// });

// const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

// export default async function handler(req, res) {
//   await connectToDatabase();

//   if (req.method === "GET") {
//     const tasks = await Task.find({});
//     return res.status(200).json(tasks);
//   }

//   if (req.method === "POST") {
//     const { title, description, dueDate, completed } = req.body;
//     const newTask = new Task({ title, description, dueDate, completed });
//     await newTask.save();
//     return res.status(201).json(newTask);
//   }

//   res.status(405).json({ error: "Method not allowed" });
// }
