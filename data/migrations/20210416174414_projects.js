
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
                .inTable("projects")
                .onDelete("RESTRICT")
        })
        .createTable("project_resources", table => {
            table.increments("project_resources_id")
            table.integer("project_id")
                .unsigned()
                .notNullable()
                .references("project_id") //FOREIGN KEY CONNECTION!!
                .inTable("projects")
                .onDelete("RESTRICT") //RESTRICT
            table.integer("resource_id")
                .unsigned()
                .notNullable()
                .references("resource_id") //FOREIGN KEY CONNECTION!!
                .inTable("resources")
                .onDelete("RESTRICT") //RESTRICT
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("project_resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects")
};
