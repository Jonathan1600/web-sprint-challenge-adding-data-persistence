// build your `Resource` model here
const db = require("../../data/dbConfig");

const getResources = async () => {
    const resources = await db("resources")

    const cleanedResources = resources.map(resource => {
        return {
            resource_id: resource.resource_id,
            resource_name: resource.resource_name,
            resource_description: resource.resource_description,
        }
    })

    return cleanedResources
}

const postResource = async (resource) => {
    const [resource_id] = await db("resources").insert(resource)

    const returnedResource = await db("resources").where("resource_id", resource_id).first();

    return returnedResource
}

module.exports = {
    getResources,
    postResource
}