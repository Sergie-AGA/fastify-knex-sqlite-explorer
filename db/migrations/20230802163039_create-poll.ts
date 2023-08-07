import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('polls', (table) => {
    table.uuid('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('last_modified').defaultTo(knex.fn.now()).notNullable()
    table.text('title').notNullable()
    table.text('image').nullable()
    table.json('optionsData').notNullable().defaultTo('[]')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('polls')
}
