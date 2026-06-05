const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// CREATE
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    category: req.body.category || "Personal",
  });

  res.status(201).json(todo);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  if (req.body.text !== undefined) {
    todo.text = req.body.text;
  }

  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  if (req.body.category !== undefined) {
    todo.category = req.body.category;
  }
  await todo.save();

  res.json(todo);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
  });
});

module.exports = router;
