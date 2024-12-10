const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

let tasks = [];
let nextId = 1;

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  const newTask = new Task(nextId++, title, description);
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find((t) => t.id === parseInt(id, 10));
  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id, 10));
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send(); // No Content
});

module.exports = router;
