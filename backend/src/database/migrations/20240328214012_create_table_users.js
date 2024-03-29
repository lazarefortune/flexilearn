/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.string("name").notNullable()
        table.string("email").notNullable().unique()
        table.text("password").notNullable()
        table.text("preference")
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable("users")
}