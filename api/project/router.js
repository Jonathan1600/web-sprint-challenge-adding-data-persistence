// build your `/api/projects` router here
const express = require('express');
const Projects = require("./model")

const router = express.Router();

router.get("/", (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            })
        })
});

router.post("/", (req, res) => {
    const newProject = req.body;
    Projects.postProject(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            })
        })
});

module.exports = router;