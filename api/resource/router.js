// build your `/api/resources` router here
const express = require('express');
const Resources = require("./model");
const mw = require("../middleware")

const router = express.Router();

router.get("/", (req, res) => {
    Resources.getResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            })
        })
});

router.post("/", mw.checkNameUnique, (req, res) => {
    const newResource = req.body;
    Resources.postResource(newResource)
        .then(resource => {
            res.status(201).json(resource)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            })
        })
});

module.exports = router;