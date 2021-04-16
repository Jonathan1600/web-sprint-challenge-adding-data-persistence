// build your `Task` model here
const db = require("../../data/dbConfig");

const getTasks = async () => {
    const tasks =
        await db("tasks as t")
            .leftJoin("projects as p", "p.project_id", "t.project_id")

    const cleanedTasks = tasks.map(task => {
        return {
            task_id: task.task_id,
            task_name: task.task_name,
            project_name: task.project_name,
            project_description: task.project_description,
            task_notes: task.task_notes,
            task_completed: task.task_completed == 0 ? false : true,
            task_description: task.task_description,
        }
    })

    return cleanedTasks
}

const postTask = async (task) => {
    const [task_id] = await db("tasks").insert(task)

    const returnedTask = await db("tasks").where("task_id", task_id).first();

    return {
        ...returnedTask,
        task_completed: returnedTask.task_completed == 1 ? true : false
    }

}

module.exports = {
    getTasks,
    postTask
}