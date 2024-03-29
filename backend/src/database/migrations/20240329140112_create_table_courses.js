/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable("courses", (table) => {
        table.increments("id")
        table.string("title").notNullable()
        table.text("content").notNullable()
        table.integer("authorId").unsigned().notNullable()
        table.foreign("authorId").references("users.id").onDelete("CASCADE")
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable("courses")
}