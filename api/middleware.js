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

module.exports = {
    checkNameUnique,
}