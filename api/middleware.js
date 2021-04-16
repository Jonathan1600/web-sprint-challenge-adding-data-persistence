const Resources = require("./resource/model");

const checkNameUnique = async (req, res, next) => {
    // DO YOUR MAGIC
    const newResource = req.body
    const resources = await Resources.getResources();
    let nameTaken = false;

    resources.forEach(element => {
        if (element.resource_name == newResource.resource_name) {
            nameTaken = true;
        }
    });

    nameTaken ? res.status(400).json({ message: `A resource with the name ${newResource.resource_name} already exists` }) : next()
}

const checkTaskBody = (req, res, next) => {
    // DO YOUR MAGIC
    const newTask = req.body
    if (!newTask) {
        res.status(400).json({ message: "Valid task description and a valid project id are required" })
    } else if (!newTask.task_description || !newTask.project_id) {
        res.status(400).json({ message: "Valid task description and a valid project id are required" })
    } else {
        next()
    }

}

module.exports = {
    checkNameUnique,
    checkTaskBody
}