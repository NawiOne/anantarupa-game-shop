exports.up = async function (knex) {
    await knex.schema.alterTable('items', (table) => {
        table.integer('price');
        table.integer('currency_type')
            .references('currency_id')
            .inTable('currencies');
        table.integer('max_owned_item');
    })
};


exports.down = async function (knex) {
    await knex.schema.alterTable('items', (table) => {
        table.dropColumn('price');
        table.dropColumn('currency_type');
        table.dropColumn('max_owned_item');
    })
};
