// build your `Project` model here
const db = require("../../data/dbConfig");

const getProjects = async () => {
    const projects = await db("projects")

    const cleanedProjects = projects.map(project => {
        return {
            project_id: project.project_id,
            project_name: project.project_name,
            project_description: project.project_description,
            project_completed: project.project_completed == 0 ? false : true,
        }
    })

    return cleanedProjects
}

const postProject = async (project) => {
    const [project_id] = await db("projects").insert(project)

    const returnedProject = await db("projects").where("project_id", project_id).first();

    return {

        ...returnedProject,
        project_completed: returnedProject.project_completed == 0 ? false : true,

    }
}

module.exports = {
    getProjects,
    postProject
}