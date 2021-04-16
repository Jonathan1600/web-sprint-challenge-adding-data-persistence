// build your `/api/tasks` router here
const express = require('express');
const Tasks = require("./model");
const mw = require("../middleware");

const router = express.Router();

router.get("/", (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            })
        })
});

router.post("/", mw.checkTaskBody, (req, res) => {
    const newTask = req.body;
    Tasks.postTask(newTask)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            })
        })
});

module.exports = router;