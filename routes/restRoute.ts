import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();

const todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  todos.push(newTodo);

  res.status(201).json({ newTodo: newTodo });
});

router.put("/todo/:todoId", (req, res, next) => {
  const todoId = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex > 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    res.status(200).json({ updatedTodo: todos[todoIndex] });
  }

  res.status(404).json({ message: "could not find the index" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const todoId = req.params.todoId;
  const filteredtodos = todos.filter((todo) => todo.id !== todoId);
  res
    .status(200)
    .json({ message: "succesfully deleted", todos: filteredtodos });
});
