
exports.up = function (knex) {
    return knex.shcema
        .createTable("projects", table => {
            table.increments("project_id")
            table.string("project_name", 128).notNullable()
            table.string("project_description")
            table.boolean("project_completed").defaultTo(0)
        })
        .createTable("resources", table => {
            table.increments("resource_id")
            table.string("resource_name", 128).notNullable().unique()
            table.string("resource_description")
        })
        .createTable("tasks", table => {
            table.increments("task_id")
            table.string("task_description").notNullable()
            table.string("task_notes")
            table.boolean("task_completed").defaultTo(0)
            table.integer("project_id")
                .unsigned()
                .references("project_id") //FOREIGN KEY CONNECTION!!
                .inTable("project")
                .onDelete("RESTRICT")
        })
        .createTable("project_resources", table => {

        })
};

exports.down = function (knex) {

};
