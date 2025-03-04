import express from "express";

const router = express.Router();

let tasks = [];
let taskId = 1;

router.get("/", (req, res) => {
    res.render("task", { tasks });
});

// Route to show completed tasks
router.get("/completed", (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.render("completed", { completedTasks });
});

// Route to show unfinished tasks
router.get("/unfinished", (req, res) => {
    const unfinishedTasks = tasks.filter(task => !task.completed);
    res.render("unfinished", { unfinishedTasks });
});

router.post("/add-task", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).send({ message: "Name and description are required" });
    }

    const newTask = { id: taskId++, name, description, completed: false };
    tasks.push(newTask);
    res.redirect("/");
});

router.post("/toggle-task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    task.completed = !task.completed;
    res.redirect("/");
});

router.post("/delete-task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.redirect("/");
});

export default router;
