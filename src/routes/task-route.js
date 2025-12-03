const express = require("express");
const { tasks } = require("../mock/task-mock");
const router = express.Router();

router.get("/", (_, res) => {
  res.json(tasks);
});

router.delete(":id", (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ message: "Method: delete -> Task not found" });
  }
});

router.post("/", (req, res) => {
  const newTask = {
    id: String(tasks.length + 1),
    title: req.body.title,
    description: req.body.description || "",
    completed: false,
    priority: req.body.priority || "medium",
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.patch(":id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Method: patch -> Task not found" });
  }

  task.completed =
    req.body.completed !== undefined ? req.body.completed : task.completed;
  task.title = req.body.title !== undefined ? req.body.title : task.title;
  task.description =
    req.body.description !== undefined
      ? req.body.description
      : task.description;
  task.priority =
    req.body.priority !== undefined ? req.body.priority : task.priority;
  res.json(task);
});

module.exports = router;
