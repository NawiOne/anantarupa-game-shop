exports.up = async function (knex) {
    await knex.schema.createTable('purchase_items', (table) => {
        table.increments('id').primary();
        table.integer('user_id')
            .references('user_id')
            .inTable('user_data');
        table.integer('item_id')
            .references('item_id')
            .inTable('items');
        table.integer('qty');
        table.integer('total_price');
        table.integer('currency_type_id')
            .references('currency_id')
            .inTable('currencies');
        table.timestamp('created_at', { useTz: true })
            .defaultTo(knex.fn.now());
    })
};


exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('purchase_items');
};
