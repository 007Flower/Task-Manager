import express from "express";

const router = express.Router();

let tasks = [];
let Id = 1;

router.get("/", (req, res) => {
    res.render("task", { tasks });
});

// Show completed tasks
router.get("/completed", (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.render("completed", { completedTasks });
});

// Show unfinished tasks
router.get("/unfinished", (req, res) => {
    const unfinishedTasks = tasks.filter(task => !task.completed);
    res.render("unfinished", { unfinishedTasks });
});

// Show all tasks (both completed and unfinished)
router.get("/all-tasks", (req, res) => {
    res.render("all-tasks", { tasks });
});

// Add a new task
router.post("/add-task", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).send({ message: "Name and description are required" });
    }

    const newTask = { id: Id++, name, description, completed: false };
    tasks.push(newTask);
    res.redirect("/");
});

// Toggle task completion
router.post("/toggle-task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    task.completed = !task.completed;
    res.redirect("/");
});

// Delete a task
router.post("/delete-task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.redirect("/");
});

// Update a task
router.post("/update-task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }

    task.name = name;
    task.description = description;
    res.redirect("/");
});

export default router;
