const express = require("express");
const { tasks } = require("../mock/task-mock");
const router = express.Router();

router.get("/", (_, res) => {
  res.json(tasks);
});

module.exports = router;
