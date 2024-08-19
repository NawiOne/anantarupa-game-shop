exports.up = async function (knex) {
    await knex.schema.createTable('user_items', (table) => {
        table.increments('id').primary();
        table.integer('user_id')
            .references('user_id')
            .inTable('user_data');
        table.integer('item_id')
            .references('item_id')
            .inTable('items');
        table.integer('qty');
    })
};


exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('user_items');
};
