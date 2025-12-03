const express = require("express");
const cors = require("cors");

// Routes
const taskRoutes = require("./routes/task-route");

const app = express();
const PORT = 3001;

app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
