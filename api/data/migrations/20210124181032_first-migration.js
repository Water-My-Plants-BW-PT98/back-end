exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments()
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.string('phone_number', 200)
  })
  await knex.schema
    .createTable('plants', (users) => {
      users.increments()
      users.string('nickname', 200).notNullable()
      users.string('species', 200).notNullable()
      users.string('h2o_frequency', 200).notNullable()
  })
  await knex.schema.createTable("users_plants", (table) => {
   table
    .integer("user_id")
    .references("id")
    .inTable("users")
    .onDelete("CASCADE") // DELETES 
    .onUpdate("CASCADE") // UPDATES REFERENCES
    .notNull()
   table
    .integer("plant_id")
    .references("id")
    .inTable("plants")
    .onDelete("CASCADE") // DELETES 
    .onUpdate("CASCADE") // UPDATES REFERENCES
    .notNull()
   table.primary(['user_id', 'plant_id'])
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users_plants')
  await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
}
